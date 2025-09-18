'use client'

import { useState, useEffect, useRef } from 'react'
import Script from 'next/script'

interface HybridAuthProps {
  children: React.ReactNode
}

const PORTAL_URL = 'https://arc-nhq-gis.maps.arcgis.com'
const AUTH_MODE = process.env.NEXT_PUBLIC_AUTH_MODE || 'simple'
const CLIENT_ID = process.env.NEXT_PUBLIC_ARCGIS_CLIENT_ID || 'KkhuTGzSvjtjGrVc'
const SIMPLE_PASSWORD = process.env.NEXT_PUBLIC_AUTH_PASSWORD || 'redcross'

export default function HybridAuth({ children }: HybridAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const esriIdRef = useRef<any>(null)

  // OAuth initialization for production
  const initializeOAuth = () => {
    if (typeof window !== 'undefined' && (window as any).require) {
      const require = (window as any).require
      
      require(["esri/identity/IdentityManager", "esri/identity/OAuthInfo"], 
        function(IdentityManager: any, OAuthInfo: any) {
          esriIdRef.current = IdentityManager
          
          const oauthInfo = new OAuthInfo({
            appId: CLIENT_ID,
            portalUrl: PORTAL_URL,
            popup: true,
            popupCallbackUrl: window.location.origin + window.location.pathname,
            flowType: "authorization-code",
            scope: "openid profile email content"
          })
          
          IdentityManager.registerOAuthInfos([oauthInfo])
          
          IdentityManager.checkSignInStatus(oauthInfo.portalUrl + "/sharing")
            .then(function(credential: any) {
              handleOAuthSuccess(credential)
            })
            .catch(function() {
              console.log("Not currently logged in to ArcGIS")
              setIsLoading(false)
            })
        }
      )
    }
  }

  const handleOAuthSuccess = (credential: any) => {
    setUserName(credential.userId)
    setIsAuthenticated(true)
    setIsLoading(false)
    localStorage.setItem('arcgis-auth', JSON.stringify({
      userId: credential.userId,
      token: credential.token,
      expires: credential.expires,
      portal: PORTAL_URL
    }))
  }

  const handleOAuthLogin = () => {
    setError('')
    
    if (!esriIdRef.current) {
      setError('Authentication system not initialized. Please refresh the page.')
      return
    }

    esriIdRef.current.getCredential(PORTAL_URL + "/sharing", { oAuthPopupConfirmation: false })
      .then(function(credential: any) {
        handleOAuthSuccess(credential)
      })
      .catch(function(error: any) {
        console.error("Login failed:", error)
        setError('Login failed. Please ensure you have access to the Red Cross ArcGIS portal.')
      })
  }

  // Simple auth for development
  const handleSimpleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password === SIMPLE_PASSWORD) {
      setUserName('jeff.franzen2@redcross.org')
      setIsAuthenticated(true)
      localStorage.setItem('simple-auth', 'authenticated')
    } else {
      setError('Invalid password')
    }
  }

  const handleLogout = () => {
    if (esriIdRef.current) {
      esriIdRef.current.destroyCredentials()
    }
    localStorage.removeItem('arcgis-auth')
    localStorage.removeItem('simple-auth')
    setIsAuthenticated(false)
    setUserName('')
    setPassword('')
  }

  useEffect(() => {
    // Check for existing authentication
    if (AUTH_MODE === 'simple') {
      const simpleAuth = localStorage.getItem('simple-auth')
      if (simpleAuth === 'authenticated') {
        setUserName('jeff.franzen2@redcross.org')
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    } else {
      // OAuth mode
      const authData = localStorage.getItem('arcgis-auth')
      if (authData) {
        try {
          const auth = JSON.parse(authData)
          if (auth.expires > Date.now()) {
            setUserName(auth.userId)
            setIsAuthenticated(true)
            setIsLoading(false)
            return
          }
        } catch (e) {
          console.error('Error parsing auth data:', e)
        }
      }
      
      // Initialize OAuth
      const timer = setTimeout(() => {
        initializeOAuth()
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  // Add logout to window for navigation component
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).handleAuthLogout = handleLogout
    }
  }, [])

  if (isLoading) {
    return (
      <>
        {AUTH_MODE === 'oauth' && <Script src="https://js.arcgis.com/4.30/" strategy="beforeInteractive" />}
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </>
    )
  }

  if (!isAuthenticated) {
    // Simple auth UI for development
    if (AUTH_MODE === 'simple') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <div className="text-center mb-6">
              <div className="flex justify-center items-center mb-4">
                <span className="text-3xl font-bold text-red-600">Red Cross</span>
                <span className="text-3xl font-light text-gray-600 ml-2">Mapping</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800 mb-2">Access Portal</h1>
              <p className="text-gray-600 text-sm">Development Mode - Simple Authentication</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800 mb-4">
              <p className="font-semibold mb-2">🔐 Local Development Mode</p>
              <p className="text-xs">OAuth requires registered domain. Using simple auth for localhost.</p>
              <p className="text-xs mt-2">Password: <strong className="font-mono">redcross</strong></p>
            </div>

            <form onSubmit={handleSimpleLogin} className="space-y-4">
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
                  placeholder="Enter: redcross"
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
                Access Application (Development)
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              <p>Contact: jeff.franzen2@redcross.org</p>
              <p className="mt-2 text-orange-600">
                Deploy to GitHub Pages for full OAuth authentication
              </p>
            </div>
          </div>
        </div>
      )
    }

    // OAuth UI for production
    return (
      <>
        <Script src="https://js.arcgis.com/4.30/" strategy="beforeInteractive" />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <div className="text-center mb-6">
              <div className="flex justify-center items-center mb-4">
                <span className="text-3xl font-bold text-red-600">Red Cross</span>
                <span className="text-3xl font-light text-gray-600 ml-2">Mapping</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800 mb-2">ArcGIS Portal Access</h1>
              <p className="text-gray-600 text-sm">Login with your Red Cross ArcGIS account</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                <p className="font-semibold mb-2">Quick Access - Two Clicks!</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Click "Login to Red Cross ArcGIS" below</li>
                  <li>In popup: Click "Allow" to grant permission</li>
                  <li>That's it! Full access to all layers</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg text-sm">
                <p className="font-semibold text-green-800 mb-2">📝 Login Credentials:</p>
                <div className="space-y-2 text-xs font-mono bg-white p-3 rounded border border-green-200">
                  <p><span className="text-gray-600">Username:</span> <strong>ARC_Jeff.Franzen_825009</strong></p>
                  <p><span className="text-gray-600">Password:</span> <strong>[Your ArcGIS Password]</strong></p>
                  <p className="text-gray-500 mt-2">If you see a permission dialog, just click "Allow"</p>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleOAuthLogin}
                className="w-full bg-red-600 text-white py-4 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
              >
                🔐 Login to Red Cross ArcGIS
              </button>

              <div className="text-center text-xs text-gray-500 mt-4">
                <p>Portal: <strong>arc-nhq-gis.maps.arcgis.com</strong></p>
                <p className="mt-1">App ID: KkhuTGzSvjtjGrVc</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Authenticated
  return (
    <>
      {AUTH_MODE === 'oauth' && <Script src="https://js.arcgis.com/4.30/" strategy="beforeInteractive" />}
      {children}
    </>
  )
}