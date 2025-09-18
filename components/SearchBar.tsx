'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string, type?: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query, selectedType)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mapping resources..."
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      
      <div className="flex gap-2">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="">All Types</option>
          <option value="Feature">Feature Layers</option>
          <option value="App">Applications</option>
          <option value="Reference">References</option>
        </select>
        
        <button
          type="button"
          onClick={() => {
            setQuery('')
            setSelectedType('')
            onSearch('', '')
          }}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
        >
          Clear
        </button>
      </div>
    </form>
  )
}