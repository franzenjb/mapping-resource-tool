'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'

export default function AIAssistantPage() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const userMessage = query
    setQuery('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate AI response for now
    setTimeout(() => {
      const responses = [
        "I can help you find the best mapping layers for disaster response. What specific area or hazard are you interested in?",
        "Based on your query, I recommend using the FEMA structures layer combined with Census block data for population analysis.",
        "For hurricane tracking, use the National Hurricane Center GIS feeds along with the Storm Prediction Center products.",
        "The Red Cross has specific operational layers for damage assessment. Would you like me to show you those?",
        "I can help you create a composite map with multiple data layers. What's your primary objective?"
      ]
      
      const response = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex">
        <div className="flex-1 max-w-4xl mx-auto p-6 flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">AI Mapping Assistant</h1>
            <p className="text-gray-600 mt-1">Ask questions about mapping resources, get recommendations, and learn best practices</p>
          </div>
          
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 bg-gray-50 rounded-lg p-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <div className="mb-4">🤖</div>
                <p>Hello! I'm your AI mapping assistant.</p>
                <p className="mt-2">Ask me about:</p>
                <ul className="mt-3 text-sm space-y-1">
                  <li>• Finding specific mapping layers</li>
                  <li>• Disaster response resources</li>
                  <li>• Data analysis recommendations</li>
                  <li>• Best practices for emergency mapping</li>
                </ul>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-lg px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about mapping resources..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Send
            </button>
          </form>
        </div>
        
        <aside className="w-80 border-l border-gray-200 p-6 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => setQuery('What layers are best for hurricane response?')}
              className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-gray-100 text-sm"
            >
              🌀 Hurricane response layers
            </button>
            <button
              onClick={() => setQuery('How do I assess flood damage?')}
              className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-gray-100 text-sm"
            >
              💧 Flood damage assessment
            </button>
            <button
              onClick={() => setQuery('What Census data is available?')}
              className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-gray-100 text-sm"
            >
              📊 Census data layers
            </button>
            <button
              onClick={() => setQuery('Show me building footprint data')}
              className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-gray-100 text-sm"
            >
              🏢 Building footprints
            </button>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Recent Topics</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div>• Storm tracking resources</div>
              <div>• Population density maps</div>
              <div>• Emergency shelter locations</div>
              <div>• Road network analysis</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}