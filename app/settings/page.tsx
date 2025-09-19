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
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    style={{color: '#111827', fontWeight: '700'}}
                    value={settings.defaultBasemap}
                    onChange={(e) => setSettings({...settings, defaultBasemap: e.target.value})}
                  >
                    <option value="topo-vector" style={{color: '#111827', fontWeight: '600'}}>Topographic</option>
                    <option value="streets-vector" style={{color: '#111827', fontWeight: '600'}}>Streets</option>
                    <option value="satellite" style={{color: '#111827', fontWeight: '600'}}>Satellite</option>
                    <option value="hybrid" style={{color: '#111827', fontWeight: '600'}}>Hybrid</option>
                    <option value="gray-vector" style={{color: '#111827', fontWeight: '600'}}>Gray Canvas</option>
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
                    <label htmlFor="autoSave" className="ml-3 text-gray-900 font-bold">
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
                    <label htmlFor="showLegend" className="ml-3 text-gray-900 font-bold">
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
                    <label htmlFor="enableClustering" className="ml-3 text-gray-900 font-bold">
                      Enable point clustering for large datasets
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Authentication Status */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Authentication Status</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Authenticated</p>
                      <p className="text-sm text-gray-600">You are logged in and have API access</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('auth-token');
                      localStorage.removeItem('mapping-tool-auth');
                      window.location.href = '/';
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    ℹ️ Your authentication provides full API access to all public layers. No additional API key needed.
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
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white font-bold placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    style={{color: '#111827', fontWeight: '700'}}
                    value={settings.organization}
                    onChange={(e) => setSettings({...settings, organization: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Default Region
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    style={{color: '#111827', fontWeight: '700'}}
                    value={settings.region}
                    onChange={(e) => setSettings({...settings, region: e.target.value})}
                  >
                    <option value="US East" style={{color: '#111827', fontWeight: '600'}}>US East</option>
                    <option value="US West" style={{color: '#111827', fontWeight: '600'}}>US West</option>
                    <option value="US Central" style={{color: '#111827', fontWeight: '600'}}>US Central</option>
                    <option value="International" style={{color: '#111827', fontWeight: '600'}}>International</option>
                  </select>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-5">About</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-bold">
                  <span className="text-gray-900 font-bold">Version:</span> 1.0.0
                </p>
                <p className="font-bold">
                  <span className="text-gray-900 font-bold">Built with:</span> Next.js, ArcGIS JavaScript API
                </p>
                <p className="font-bold">
                  <span className="text-gray-900 font-bold">Support:</span> jeff.franzen2@redcross.org
                </p>
                <p className="font-bold">
                  <span className="text-gray-900 font-bold">GitHub:</span>{' '}
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
                className="px-6 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
              <button
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md"
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