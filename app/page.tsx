'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import HelpModal from '@/components/HelpModal'
import { searchLayers, canAddToMap } from '@/lib/search'
import { MappingLayer, MapViewRef } from '@/lib/types'
import { getLayerStatus } from '@/lib/working-layers'

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading map...</p>
      </div>
    </div>
  )
})

export default function Home() {
  const [searchResults, setSearchResults] = useState<MappingLayer[]>([])
  const [selectedLayers, setSelectedLayers] = useState<MappingLayer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showHelp, setShowHelp] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showOnlyWorking, setShowOnlyWorking] = useState(true)
  const mapRef = useRef<MapViewRef>(null)

  useEffect(() => {
    handleSearch('', '')
  }, [])
  
  // Show welcome banner on first visit after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasVisited = localStorage.getItem('mapping-tool-visited')
      if (!hasVisited) {
        setShowWelcome(true)
      }
    }, 1500) // Wait 1.5 seconds after page loads
    
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = async (query: string, type?: string) => {
    setIsLoading(true)
    setError(null)
    setSearchQuery(query)
    try {
      const results = await searchLayers(query, type)
      setSearchResults(results)
      if (results.length === 0 && query) {
        setError('No results found. Try a different search term.')
      }
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
      setError('Failed to load layers. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddLayer = async (layer: MappingLayer) => {
    if (!selectedLayers.find(l => l.item === layer.item)) {
      setSelectedLayers([...selectedLayers, layer])
      if (mapRef.current) {
        await mapRef.current.addLayer(layer)
      }
    }
  }

  const handleRemoveLayer = (layerName: string) => {
    setSelectedLayers(selectedLayers.filter(l => l.item !== layerName))
    if (mapRef.current) {
      mapRef.current.removeLayer(layerName)
    }
  }

  const handleClearAll = () => {
    setSelectedLayers([])
    if (mapRef.current) {
      mapRef.current.clearAllLayers()
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <Navigation />

      <div className="flex-1 flex relative overflow-hidden p-3 sm:p-4 lg:p-6 gap-3 lg:gap-4">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden absolute top-4 left-4 z-50 p-2.5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Toggle sidebar"
        >
          <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Enhanced Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          transition-all duration-300 ease-out
          absolute md:relative
          w-full sm:w-80 lg:w-96 xl:w-[400px]
          h-full
          bg-white
          rounded-xl
          shadow-2xl md:shadow-xl
          z-40
          flex flex-col
          overflow-hidden
          border border-gray-200
        `}>
          
          {/* Search Header */}
          <div className="p-5 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Layer Search</h2>
              <button
                onClick={() => setShowHelp(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How to Use
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search mapping resources..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value, '')}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-500 shadow-sm"
                aria-label="Search resources"
              />
              <svg 
                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => handleSearch('', '')}
                  className="absolute right-3 top-3.5 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Filter Toggle */}
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setShowOnlyWorking(!showOnlyWorking)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
                  showOnlyWorking 
                    ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={showOnlyWorking}
                  onChange={() => setShowOnlyWorking(!showOnlyWorking)}
                  className="rounded"
                />
                Show Only Working Layers
              </button>
            </div>
          </div>
          
          {/* Scrollable Results */}
          <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 custom-scrollbar">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-xl p-5">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                      <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600 text-center font-medium">{error}</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg className="h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p className="text-gray-600 text-center font-medium text-lg">No layers available</p>
                <p className="text-gray-500 text-center text-sm mt-2">Try searching for a specific resource</p>
              </div>
            ) : (
              <div className="space-y-3">
                {searchResults
                  .filter(layer => {
                    if (!showOnlyWorking) return true
                    if (layer.type !== 'Feature') return true // Always show Apps and References
                    return getLayerStatus(layer.item) === 'working'
                  })
                  .slice(0, 50)
                  .map((layer, index) => {
                  const canAdd = canAddToMap(layer)
                  const isSelected = selectedLayers.some(l => l.item === layer.item)
                  const layerStatus = getLayerStatus(layer.item)
                  
                  return (
                    <div
                      key={`${layer.item}-${index}`}
                      className={`
                        p-4 border-2 rounded-xl transition-all duration-200 transform
                        ${canAdd 
                          ? isSelected 
                            ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg scale-[1.02]' 
                            : 'border-gray-200 hover:border-blue-400 hover:shadow-lg hover:scale-[1.01] hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer'
                          : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                        }
                      `}
                      onClick={() => canAdd && !isSelected && handleAddLayer(layer)}
                      tabIndex={canAdd ? 0 : -1}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && canAdd && !isSelected) {
                          handleAddLayer(layer)
                        }
                      }}
                      role="button"
                      aria-pressed={isSelected}
                      aria-disabled={!canAdd}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 text-base line-clamp-1">
                              {layer.item}
                            </h3>
                            {layer.type === 'Feature' && (
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                layerStatus === 'working' 
                                  ? 'bg-green-100 text-green-700'
                                  : layerStatus === 'auth-required'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : layerStatus === 'app'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {layerStatus === 'working' && '✓ Works'}
                                {layerStatus === 'auth-required' && '🔒 Red Cross Only'}
                                {layerStatus === 'app' && '📱 Actually an App'}
                                {layerStatus === 'unknown' && '? Untested'}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {layer.description}
                          </p>
                        </div>
                        <span className={`
                          px-3 py-1.5 text-xs rounded-full flex-shrink-0 font-semibold border
                          ${layer.type === 'Feature' && canAdd
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300' 
                            : layer.type === 'App' 
                              ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-300'
                              : 'bg-gray-100 text-gray-600 border-gray-300'
                          }
                        `}>
                          {layer.type}
                        </span>
                      </div>
                      {canAdd && (
                        <div className="mt-3 flex items-center gap-2">
                          {isSelected ? (
                            <span className="text-green-600 flex items-center gap-1.5 font-medium text-sm">
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Added to map
                            </span>
                          ) : (
                            <span className="text-blue-600 flex items-center gap-1.5 font-medium text-sm">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Click to add
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          
          {/* Active Layers Section */}
          <div className="border-t-2 border-gray-200 bg-gradient-to-b from-gray-50 to-white max-h-72 flex flex-col rounded-b-xl">
            <div className="px-5 py-4 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  Active Layers
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    {selectedLayers.length}
                  </span>
                </h3>
                {selectedLayers.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-all"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
            
            {selectedLayers.length > 0 ? (
              <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                <div className="space-y-2">
                  {selectedLayers.map((layer, index) => (
                    <div 
                      key={layer.item} 
                      className="group flex items-center justify-between bg-white p-3 rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all animate-fadeIn"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex-1 min-w-0 pr-3">
                        <div className="font-semibold text-sm text-gray-900 truncate">
                          {layer.item}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {layer.type} Layer
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveLayer(layer.item)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all opacity-70 group-hover:opacity-100"
                        aria-label={`Remove ${layer.item}`}
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <svg className="h-12 w-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <p className="text-sm font-medium text-gray-600">No active layers</p>
                <p className="text-xs text-gray-500 mt-1">Select layers above to display on map</p>
              </div>
            )}
          </div>
        </aside>
        
        {/* Map Container */}
        <main className="flex-1 relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <MapView ref={mapRef} selectedLayers={selectedLayers} />
        </main>
      </div>

      {/* Welcome Banner for First-Time Users */}
      {showWelcome && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-4">
            <div>
              <p className="text-lg font-bold">Welcome to Mapping Resource Tool!</p>
              <p className="text-sm opacity-90">Access 60+ disaster response mapping resources</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowWelcome(false)
                  setShowHelp(true)
                  localStorage.setItem('mapping-tool-visited', 'true')
                }}
                className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                View Tutorial
              </button>
              <button
                onClick={() => {
                  setShowWelcome(false)
                  localStorage.setItem('mapping-tool-visited', 'true')
                }}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  )
}