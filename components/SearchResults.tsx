'use client'

import { MappingLayer } from '@/lib/types'

interface SearchResultsProps {
  results: MappingLayer[]
  isLoading: boolean
  selectedLayers: MappingLayer[]
  onAddLayer: (layer: MappingLayer) => void
  onPreview: (url: string) => void
}

export default function SearchResults({ 
  results, 
  isLoading, 
  selectedLayers,
  onAddLayer,
  onPreview 
}: SearchResultsProps) {
  const isLayerSelected = (layer: MappingLayer) => {
    return selectedLayers.some(l => l.item === layer.item)
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-20 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No results found. Try a different search term.</p>
      </div>
    )
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Feature': return 'bg-blue-100 text-blue-800'
      case 'App': return 'bg-green-100 text-green-800'
      case 'Reference': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-4 space-y-3">
      <div className="text-sm text-gray-600 mb-2">
        Found {results.length} resources
      </div>
      
      {results.map((layer, index) => (
        <div 
          key={`${layer.item}-${index}`}
          className={`border rounded-lg p-3 hover:shadow-md transition-shadow ${
            isLayerSelected(layer) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-sm text-gray-900 flex-1 pr-2">
              {layer.item}
            </h3>
            <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(layer.type)}`}>
              {layer.type}
            </span>
          </div>
          
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {layer.description}
          </p>
          
          <div className="flex gap-2">
            {layer.type === 'Feature' && (
              <button
                onClick={() => onAddLayer(layer)}
                disabled={isLayerSelected(layer)}
                className={`px-3 py-1 text-xs rounded ${
                  isLayerSelected(layer)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isLayerSelected(layer) ? 'Added' : 'Add to Map'}
              </button>
            )}
            
            <a
              href={layer.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              View Source
            </a>
            
            {layer.type === 'App' && (
              <button
                onClick={() => onPreview(layer.link)}
                className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
              >
                Open App
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}