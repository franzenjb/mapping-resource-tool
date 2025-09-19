'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { searchLayers } from '@/lib/search'
import { MappingLayer } from '@/lib/types'
import { getLayerStatus } from '@/lib/working-layers'

export default function ResourcesPage() {
  const [resources, setResources] = useState<MappingLayer[]>([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    setLoading(true)
    const data = await searchLayers('', '')
    setResources(data)
    setLoading(false)
  }

  const filteredResources = resources.filter(resource => {
    const matchesFilter = filter === 'all' || resource.type === filter
    const matchesSearch = resource.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getCategoryIcon = (type: string) => {
    switch(type) {
      case 'Feature': return '🗺️'
      case 'App': return '📱'
      case 'Reference': return '📚'
      default: return '📄'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="bg-gradient-to-br from-blue-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Library</h1>
            <p className="text-gray-600">Browse all available mapping resources, applications, and references</p>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search all resources..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white font-medium"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Types ({resources.length})</option>
                <option value="Feature">Features ({resources.filter(r => r.type === 'Feature').length})</option>
                <option value="App">Applications ({resources.filter(r => r.type === 'App').length})</option>
                <option value="Reference">References ({resources.filter(r => r.type === 'Reference').length})</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-700 font-medium">
              Showing {filteredResources.length} resources
            </p>
            <div className="flex gap-2">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                ✓ {resources.filter(r => r.type === 'Feature' && getLayerStatus(r.item) === 'working').length} Working Layers
              </span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                🔒 {resources.filter(r => r.type === 'Feature' && getLayerStatus(r.item) === 'auth-required').length} Need Auth
              </span>
            </div>
          </div>
          
          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-5 shadow-md animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-20 bg-gray-100 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              ))}
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No resources found matching your criteria</p>
            </div>
          ) : (
            /* Resource Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource, index) => {
                const status = resource.type === 'Feature' ? getLayerStatus(resource.item) : null
                
                return (
                  <div 
                    key={`${resource.item}-${index}`} 
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 p-5 border-2 border-transparent hover:border-blue-200"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-gray-900 text-base flex-1 mr-2 leading-tight">
                        <span className="mr-2">{getCategoryIcon(resource.type)}</span>
                        {resource.item}
                      </h3>
                      <div className="flex flex-col gap-1 items-end">
                        <span className={`px-3 py-1 text-xs rounded-full font-semibold whitespace-nowrap ${
                          resource.type === 'Feature' ? 'bg-green-100 text-green-700' :
                          resource.type === 'App' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {resource.type}
                        </span>
                        {status && (
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            status === 'working' 
                              ? 'bg-green-50 text-green-600 border border-green-200'
                              : status === 'auth-required'
                              ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                              : status === 'app'
                              ? 'bg-purple-50 text-purple-600 border border-purple-200'
                              : 'bg-gray-50 text-gray-600 border border-gray-200'
                          }`}>
                            {status === 'working' && '✓ Works'}
                            {status === 'auth-required' && '🔒 Auth'}
                            {status === 'app' && '📱 App'}
                            {status === 'unknown' && '?'}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    {/* Link */}
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-semibold group"
                    >
                      View Resource 
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}