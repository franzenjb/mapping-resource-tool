'use client'

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { MappingLayer, MapViewRef } from '@/lib/types'
import { extractArcGISItemId, isFeatureService } from '@/lib/search'
import { getPopupTemplate } from '@/lib/popup-templates'
import { loadSettings } from '@/lib/settings'

interface MapViewProps {
  selectedLayers: MappingLayer[]
}

const MapView = forwardRef<MapViewRef, MapViewProps>(({ selectedLayers }, ref) => {
  const mapDiv = useRef<HTMLDivElement>(null)
  const viewRef = useRef<any>(null)
  const layerRefs = useRef<Map<string, any>>(new Map())

  useImperativeHandle(ref, () => ({
    view: viewRef.current,
    changeBasemap: (basemapId: string) => {
      if (viewRef.current && viewRef.current.map) {
        viewRef.current.map.basemap = basemapId
      }
    },
    addLayer: async (layer: MappingLayer) => {
      if (!viewRef.current) return
      
      try {
        const [FeatureLayer, Layer, PortalItem] = await Promise.all([
          import('@arcgis/core/layers/FeatureLayer'),
          import('@arcgis/core/layers/Layer'),
          import('@arcgis/core/portal/PortalItem')
        ])
        
        let newLayer: any = null
        
        // Try to load as FeatureServer/MapServer first
        if (layer.link.includes('FeatureServer') || layer.link.includes('MapServer')) {
          const urlMatch = layer.link.match(/(.*(?:Feature|Map)Server(?:\/\d+)?)/i)
          if (urlMatch) {
            try {
              newLayer = new FeatureLayer.default({
                url: urlMatch[1],
                title: layer.item,
                popupEnabled: true,
                outFields: ['*'],
                popupTemplate: getPopupTemplate(layer.item)
              })
              await newLayer.load()
            } catch (err) {
              console.warn(`Could not load as service layer: ${layer.item}`)
              newLayer = null
            }
          }
        }
        
        // If that didn't work and we have an item ID, try portal item
        if (!newLayer && layer.link.includes('item.html?id=')) {
          const itemId = extractArcGISItemId(layer.link)
          if (itemId) {
            try {
              // Try to load the portal item first to check if it's accessible
              const portalItem = new PortalItem.default({
                id: itemId,
                portal: {
                  url: 'https://www.arcgis.com'
                }
              })
              
              await portalItem.load()
              
              // If it loads, create the layer
              newLayer = await Layer.default.fromPortalItem({
                portalItem: portalItem
              })
              newLayer.title = layer.item
              // Set popup template after layer is created
              if (newLayer.popupEnabled !== undefined) {
                newLayer.popupEnabled = true
                newLayer.popupTemplate = getPopupTemplate(layer.item)
                newLayer.outFields = ['*']
              }
            } catch (err) {
              // If portal item fails, try as a feature layer with the item URL
              try {
                const serviceUrl = `https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/${itemId}/FeatureServer/0`
                newLayer = new FeatureLayer.default({
                  url: serviceUrl,
                  title: layer.item,
                  popupEnabled: true,
                  outFields: ['*'],
                  popupTemplate: getPopupTemplate(layer.item)
                })
                await newLayer.load()
              } catch (err2) {
                console.warn(`Could not load layer ${layer.item}: Not publicly accessible or requires authentication`)
                return
              }
            }
          }
        }
        
        if (newLayer) {
          viewRef.current.map.add(newLayer)
          layerRefs.current.set(layer.item, newLayer)
          console.log(`Successfully added layer: ${layer.item}`)
        } else {
          console.warn(`Could not create layer for: ${layer.item}`)
        }
      } catch (error) {
        console.error(`Error adding layer ${layer.item}:`, error)
      }
    },
    removeLayer: (layerName: string) => {
      const layer = layerRefs.current.get(layerName)
      if (layer && viewRef.current) {
        viewRef.current.map.remove(layer)
        layerRefs.current.delete(layerName)
      }
    },
    clearAllLayers: () => {
      if (viewRef.current) {
        layerRefs.current.forEach(layer => {
          viewRef.current.map.remove(layer)
        })
        layerRefs.current.clear()
      }
    },
    exportWebMap: () => {
      if (!viewRef.current) return null
      
      const webmap = {
        operationalLayers: Array.from(layerRefs.current.values()).map(layer => ({
          id: layer.id,
          title: layer.title,
          url: layer.url,
          layerType: 'ArcGISFeatureLayer'
        })),
        baseMap: {
          baseMapLayers: [{
            id: 'defaultBasemap',
            layerType: 'ArcGISTiledMapServiceLayer',
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer'
          }],
          title: 'Topographic'
        },
        version: '2.26'
      }
      
      return webmap
    },
    applySettings: (settings: any) => {
      if (!viewRef.current) return
      
      // Change basemap
      if (settings.defaultBasemap) {
        viewRef.current.map.basemap = settings.defaultBasemap
      }
      
      // Toggle legend
      const widgets = viewRef.current.ui.find(widget => 
        widget.content && widget.content.declaredClass === 'esri.widgets.Legend'
      )
      if (widgets && widgets.expanded !== undefined) {
        widgets.expanded = settings.showLegend
      }
    }
  }))

  useEffect(() => {
    if (!mapDiv.current) return

    const initMap = async () => {
      try {
        const [Map, MapView, Basemap, BasemapGallery, Expand, Legend, Search, Home] = await Promise.all([
          import('@arcgis/core/Map'),
          import('@arcgis/core/views/MapView'),
          import('@arcgis/core/Basemap'),
          import('@arcgis/core/widgets/BasemapGallery'),
          import('@arcgis/core/widgets/Expand'),
          import('@arcgis/core/widgets/Legend'),
          import('@arcgis/core/widgets/Search'),
          import('@arcgis/core/widgets/Home')
        ])

        const settings = loadSettings()
        
        const map = new Map.default({
          basemap: settings.defaultBasemap || 'topo-vector'
        })

        const view = new MapView.default({
          container: mapDiv.current!,
          map: map,
          center: [-98.5795, 39.8283],
          zoom: 4
        })

        const basemapGallery = new BasemapGallery.default({
          view: view
        })

        const bgExpand = new Expand.default({
          view: view,
          content: basemapGallery,
          expandIcon: 'basemap',
          group: 'top-left'
        })

        const legend = new Legend.default({
          view: view
        })

        const legendExpand = new Expand.default({
          view: view,
          content: legend,
          expandIcon: 'legend',
          expanded: settings.showLegend || false,
          group: 'bottom-right'
        })

        const search = new Search.default({
          view: view
        })

        const home = new Home.default({
          view: view
        })

        view.ui.add(bgExpand, 'top-left')
        view.ui.add(home, 'top-left')
        view.ui.add(search, 'top-right')
        view.ui.add(legendExpand, 'bottom-right')

        viewRef.current = view
      } catch (error) {
        console.error('Error initializing map:', error)
      }
    }

    initMap()

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy()
        viewRef.current = null
      }
    }
  }, [])

  return (
    <div ref={mapDiv} className="w-full h-full" />
  )
})

MapView.displayName = 'MapView'

export default MapView