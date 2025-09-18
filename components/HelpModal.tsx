'use client'

import { useState } from 'react'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [activeTab, setActiveTab] = useState('basics')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="w-full">
              <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-6">
                How to Use This Tool
              </h3>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('basics')}
                    className={`${
                      activeTab === 'basics'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
                  >
                    Basics
                  </button>
                  <button
                    onClick={() => setActiveTab('types')}
                    className={`${
                      activeTab === 'types'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
                  >
                    Resource Types
                  </button>
                  <button
                    onClick={() => setActiveTab('scenarios')}
                    className={`${
                      activeTab === 'scenarios'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
                  >
                    Use Cases
                  </button>
                  <button
                    onClick={() => setActiveTab('tips')}
                    className={`${
                      activeTab === 'tips'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
                  >
                    Pro Tips
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="max-h-96 overflow-y-auto">
                {activeTab === 'basics' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Quick Start</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-800 font-medium">
                        <li>Search for resources in the search bar or browse all available layers</li>
                        <li>Click on any green "Feature" resource to add it to your map</li>
                        <li>View your active layers at the bottom of the sidebar</li>
                        <li>Remove layers by clicking the trash icon</li>
                        <li>Pan and zoom the map to explore your data</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">Understanding the Interface</h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 text-lg font-bold">✓</span>
                          <span className="text-gray-800"><strong className="text-gray-900">Green borders</strong> = Layer is active on the map</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2 text-lg font-bold">◉</span>
                          <span className="text-gray-800"><strong className="text-gray-900">Blue hover</strong> = Layer can be added to map</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-gray-500 mr-2 text-lg font-bold">○</span>
                          <span className="text-gray-800"><strong className="text-gray-900">Gray/disabled</strong> = Apps or references (not map layers)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'types' && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">🗺️ Features (Map Layers)</h4>
                      <p className="text-sm text-gray-800 mb-2 font-medium">
                        Data you can add directly to the map as visual layers. Think of these as transparent overlays.
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        <strong>Examples:</strong> Building footprints, fire perimeters, flood zones, population density
                      </p>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">📱 Apps (External Tools)</h4>
                      <p className="text-sm text-gray-800 mb-2 font-medium">
                        Complete web applications that open in a new tab. These are standalone tools for analysis.
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        <strong>Examples:</strong> Hurricane trackers, population calculators, weather radars
                      </p>
                    </div>

                    <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">📚 References (Documentation)</h4>
                      <p className="text-sm text-gray-800 mb-2 font-medium">
                        Guides, documentation, and resource portals to help you understand and use the data.
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        <strong>Examples:</strong> Census guides, data portals, training materials
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'scenarios' && (
                  <div className="space-y-4">
                    <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">🌀 Hurricane Response</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-800 font-medium">
                        <li>Add "USA Structures" to see buildings in the path</li>
                        <li>Add "Census Block Characteristics" for population data</li>
                        <li>Add "Live Stream Gauges" to monitor flooding</li>
                        <li>Open "Hurrevac" app for tracking and evacuation zones</li>
                        <li>Add "Open Shelters" to coordinate resources</li>
                      </ol>
                    </div>

                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">🔥 Wildfire Management</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-800 font-medium">
                        <li>Add "Current Wildland Fire Incident Locations"</li>
                        <li>Add "WFIGS Current Fire Perimeters"</li>
                        <li>Add building footprints to identify threatened structures</li>
                        <li>Check road closures for evacuation planning</li>
                        <li>Open fire situational awareness apps for details</li>
                      </ol>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">🌊 Flood Response</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-800 font-medium">
                        <li>Add "Live Stream Gauges" for water levels</li>
                        <li>Add inundation mapping layers</li>
                        <li>Add census data for affected populations</li>
                        <li>Check infrastructure layers for critical facilities</li>
                        <li>Monitor road closures for accessibility</li>
                      </ol>
                    </div>
                  </div>
                )}

                {activeTab === 'tips' && (
                  <div className="space-y-4">
                    <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">💡 Pro Tips</h4>
                      <ul className="space-y-2 text-sm text-gray-800 font-medium">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span><strong>Start simple:</strong> Add 1-2 layers first, then build up your view</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span><strong>Layer order matters:</strong> Add base layers first, then overlays</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span><strong>Check update frequency:</strong> Some data updates hourly, others are static</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span><strong>Combine resources:</strong> Use Features for data, Apps for analysis</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span><strong>Practice first:</strong> Learn the tools before an emergency</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">⚡ Quick Reference</h4>
                      <div className="space-y-1 text-sm text-gray-800 font-medium">
                        <p><strong>Need to see something?</strong> → Add a Feature layer</p>
                        <p><strong>Need to analyze?</strong> → Open an App</p>
                        <p><strong>Need to learn?</strong> → Check References</p>
                        <p><strong>Too many layers?</strong> → Clear All and start fresh</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">🏆 Most Used Resources</h4>
                      <ul className="space-y-1 text-sm text-gray-800 font-medium">
                        <li>• <strong>USA Structures</strong> - Building footprints</li>
                        <li>• <strong>Census Blocks</strong> - Population data</li>
                        <li>• <strong>Live Stream Gauges</strong> - Flood monitoring</li>
                        <li>• <strong>Fire Perimeters</strong> - Active fires</li>
                        <li>• <strong>Hurrevac</strong> - Hurricane tracking</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}