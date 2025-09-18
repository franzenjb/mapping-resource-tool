'use client'

import { useState, useEffect } from 'react'

interface PasswordProtectionProps {
  children: React.ReactNode
}

// For static deployment, use a hardcoded password
const APP_PASSWORD = 'redcross'
const AUTH_KEY = 'mapping-tool-auth'

export default function PasswordProtection({ children }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      // Check if user was previously authenticated
      const authStatus = localStorage.getItem(AUTH_KEY)
      setIsAuthenticated(authStatus === 'authenticated')
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password === APP_PASSWORD) {
      // Set authentication in localStorage
      localStorage.setItem(AUTH_KEY, 'authenticated')
      setIsAuthenticated(true)
      setPassword('')
    } else {
      setError('Invalid password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
  }

  // Add logout to window for navigation component to use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).handleLogout = handleLogout
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4">
              <span className="text-3xl font-bold text-red-600">Red Cross</span>
              <span className="text-3xl font-light text-gray-600 ml-2">Mapping</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">ArcGIS & Resource Tool</h1>
            <p className="text-gray-600 text-sm">Please enter the access password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter password"
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Access Application
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>For access, contact: jeff.franzen2@redcross.org</p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}