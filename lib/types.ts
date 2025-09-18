export interface MappingLayer {
  item: string
  link: string
  description: string
  type: 'Feature' | 'App' | 'Reference'
  category?: string
  source?: string
  lastUpdated?: string
}

export interface MapViewRef {
  view: any
  addLayer: (layer: MappingLayer) => Promise<void>
  removeLayer: (layerName: string) => void
  clearAllLayers: () => void
  exportWebMap: () => any
}