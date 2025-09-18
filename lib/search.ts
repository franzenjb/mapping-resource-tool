import Papa from 'papaparse'
import { MappingLayer } from './types'

let cachedLayers: MappingLayer[] | null = null

export async function loadLayers(): Promise<MappingLayer[]> {
  if (cachedLayers) return cachedLayers
  
  try {
    const response = await fetch('/data/mapping_resources.csv')
    const csvText = await response.text()
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const layers = results.data
            .filter((row: any) => row.Item && row.Link)
            .map((row: any) => ({
              item: row.Item || row['﻿Item'] || '',
              link: row.Link || '',
              description: row.Description || '',
              type: row['Feature, App or Reference'] || 'Feature',
              category: row.Category || '',
              source: row.Source || '',
              lastUpdated: row['Last Updated'] || ''
            }))
            .filter((layer: MappingLayer) => layer.item && layer.link)
          
          cachedLayers = layers
          resolve(layers)
        },
        error: reject
      })
    })
  } catch (error) {
    console.error('Error loading layers:', error)
    return []
  }
}

export async function searchLayers(query: string, type?: string): Promise<MappingLayer[]> {
  const layers = await loadLayers()
  
  if (!query && !type) return layers.slice(0, 50)
  
  const lowerQuery = query.toLowerCase()
  
  return layers.filter(layer => {
    const matchesQuery = !query || 
      layer.item.toLowerCase().includes(lowerQuery) ||
      layer.description.toLowerCase().includes(lowerQuery) ||
      (layer.category && layer.category.toLowerCase().includes(lowerQuery))
    
    const matchesType = !type || layer.type === type
    
    return matchesQuery && matchesType
  }).slice(0, 100)
}

export function extractArcGISItemId(url: string): string | null {
  const match = url.match(/id=([a-f0-9]{32})/i)
  return match ? match[1] : null
}

export function isFeatureService(url: string): boolean {
  return url.includes('FeatureServer') || 
         url.includes('MapServer') || 
         url.includes('ImageServer') ||
         url.includes('item.html?id=') ||
         url.includes('/rest/services/')
}

export function canAddToMap(layer: MappingLayer): boolean {
  // Only feature layers can be added to map
  if (layer.type !== 'Feature') return false
  
  // Check if it's a service URL we can handle
  return isFeatureService(layer.link)
}