'use client'

import { MapViewRef } from '@/lib/types'

interface ExportButtonProps {
  mapRef: React.RefObject<MapViewRef>
  layerCount: number
}

export default function ExportButton({ mapRef, layerCount }: ExportButtonProps) {
  const handleExport = () => {
    if (!mapRef.current) return
    
    const webMap = mapRef.current.exportWebMap()
    if (!webMap) {
      alert('No map data to export')
      return
    }
    
    const dataStr = JSON.stringify(webMap, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `mapping-resources-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }
  
  return (
    <button
      onClick={handleExport}
      disabled={layerCount === 0}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        layerCount === 0
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-green-600 text-white hover:bg-green-700'
      }`}
    >
      Export Map ({layerCount} layers)
    </button>
  )
}