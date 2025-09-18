'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { searchLayers } from '@/lib/search'
import { MappingLayer } from '@/lib/types'

export default function ResourcesPage() {
  const [resources, setResources] = useState<MappingLayer[]>([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    const data = await searchLayers('', '')
    setResources(data)
  }

  const filteredResources = resources.filter(resource => {
    const matchesFilter = filter === 'all' || resource.type === filter
    const matchesSearch = resource.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Resource Library</h1>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search all resources..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Feature">Features</option>
              <option value="App">Applications</option>
              <option value="Reference">References</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto" style={{maxHeight: 'calc(100vh - 250px)'}}>
            {filteredResources.map((resource, index) => (
              <div key={`${resource.item}-${index}`} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 flex-1">{resource.item}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    resource.type === 'Feature' ? 'bg-blue-100 text-blue-800' :
                    resource.type === 'App' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {resource.type}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{resource.description}</p>
                
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Resource →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}