'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    defaultBasemap: 'topo-vector',
    autoSave: true,
    showLegend: true,
    enableClustering: false,
    apiKey: '',
    organization: 'American Red Cross',
    region: 'US East'
  })

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings))
    alert('Settings saved successfully!')
  }

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Map Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Basemap
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={settings.defaultBasemap}
                    onChange={(e) => setSettings({...settings, defaultBasemap: e.target.value})}
                  >
                    <option value="topo-vector">Topographic</option>
                    <option value="streets-vector">Streets</option>
                    <option value="satellite">Satellite</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="gray-vector">Gray Canvas</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoSave"
                    className="h-4 w-4 text-blue-600 rounded"
                    checked={settings.autoSave}
                    onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
                  />
                  <label htmlFor="autoSave" className="ml-2 text-sm text-gray-700">
                    Auto-save map configurations
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showLegend"
                    className="h-4 w-4 text-blue-600 rounded"
                    checked={settings.showLegend}
                    onChange={(e) => setSettings({...settings, showLegend: e.target.checked})}
                  />
                  <label htmlFor="showLegend" className="ml-2 text-sm text-gray-700">
                    Show legend by default
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableClustering"
                    className="h-4 w-4 text-blue-600 rounded"
                    checked={settings.enableClustering}
                    onChange={(e) => setSettings({...settings, enableClustering: e.target.checked})}
                  />
                  <label htmlFor="enableClustering" className="ml-2 text-sm text-gray-700">
                    Enable point clustering for large datasets
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ArcGIS API Key
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your API key"
                    value={settings.apiKey}
                    onChange={(e) => setSettings({...settings, apiKey: e.target.value})}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Required for premium features and higher rate limits
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Organization</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={settings.organization}
                    onChange={(e) => setSettings({...settings, organization: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Region
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={settings.region}
                    onChange={(e) => setSettings({...settings, region: e.target.value})}
                  >
                    <option value="US East">US East</option>
                    <option value="US West">US West</option>
                    <option value="US Central">US Central</option>
                    <option value="International">International</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => window.location.reload()}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleSave}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}