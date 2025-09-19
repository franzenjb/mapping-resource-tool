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

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="bg-gradient-to-br from-blue-50 via-white to-red-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Configure your mapping tool preferences</p>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="mb-6 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg animate-fadeIn">
              ✓ Settings saved successfully!
            </div>
          )}
          
          <div className="space-y-6">
            {/* Map Preferences */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Map Preferences</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Default Basemap
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900 bg-white font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoSave"
                      className="h-5 w-5 text-blue-600 rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-200"
                      checked={settings.autoSave}
                      onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
                    />
                    <label htmlFor="autoSave" className="ml-3 text-gray-900 font-medium">
                      Auto-save map configurations
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showLegend"
                      className="h-5 w-5 text-blue-600 rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-200"
                      checked={settings.showLegend}
                      onChange={(e) => setSettings({...settings, showLegend: e.target.checked})}
                    />
                    <label htmlFor="showLegend" className="ml-3 text-gray-900 font-medium">
                      Show legend by default
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableClustering"
                      className="h-5 w-5 text-blue-600 rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-200"
                      checked={settings.enableClustering}
                      onChange={(e) => setSettings({...settings, enableClustering: e.target.checked})}
                    />
                    <label htmlFor="enableClustering" className="ml-3 text-gray-900 font-medium">
                      Enable point clustering for large datasets
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* API Configuration */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-5">API Configuration</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    ArcGIS API Key
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900 bg-white font-medium placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Enter your API key"
                    value={settings.apiKey}
                    onChange={(e) => setSettings({...settings, apiKey: e.target.value})}
                  />
                  <p className="mt-2 text-sm text-gray-600 font-medium">
                    Required for premium features and higher rate limits
                  </p>
                </div>
              </div>
            </div>
            
            {/* Organization */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Organization</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900 bg-white font-medium placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    value={settings.organization}
                    onChange={(e) => setSettings({...settings, organization: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Default Region
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900 bg-white font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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

            {/* About Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-5">About</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-medium">
                  <span className="text-gray-900 font-semibold">Version:</span> 1.0.0
                </p>
                <p className="font-medium">
                  <span className="text-gray-900 font-semibold">Built with:</span> Next.js, ArcGIS JavaScript API
                </p>
                <p className="font-medium">
                  <span className="text-gray-900 font-semibold">Support:</span> jeff.franzen2@redcross.org
                </p>
                <p className="font-medium">
                  <span className="text-gray-900 font-semibold">GitHub:</span>{' '}
                  <a 
                    href="https://github.com/franzenjb/mapping-resource-tool" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    View Repository
                  </a>
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pb-8">
              <button
                className="px-6 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
              <button
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
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