'use client'

import { useState, useEffect, useRef } from 'react'
import Script from 'next/script'

interface ArcGISAuthProps {
  children: React.ReactNode
}

// Red Cross ArcGIS Portal configuration
const PORTAL_URL = 'https://arc-nhq-gis.maps.arcgis.com'
// For development, you'll need to register your own app at https://developers.arcgis.com
// The production CLIENT_ID only works with the registered GitHub Pages URL
const CLIENT_ID = process.env.NEXT_PUBLIC_ARCGIS_CLIENT_ID || 'KkhuTGzSvjtjGrVc'

export default function ArcGISAuth({ children }: ArcGISAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [error, setError] = useState('')
  const esriIdRef = useRef<any>(null)

  const initializeAuth = () => {
    if (typeof window !== 'undefined' && (window as any).require) {
      const require = (window as any).require
      
      require(["esri/identity/IdentityManager", "esri/identity/OAuthInfo"], 
        function(IdentityManager: any, OAuthInfo: any) {
          esriIdRef.current = IdentityManager
          
          // Configure OAuth with PKCE and proper scopes
          const oauthInfo = new OAuthInfo({
            appId: CLIENT_ID,
            portalUrl: PORTAL_URL,
            popup: true,
            popupCallbackUrl: window.location.origin + window.location.pathname,
            flowType: "authorization-code", // PKCE flow for security
            scope: "openid profile email content"
          })
          
          IdentityManager.registerOAuthInfos([oauthInfo])
          
          // Check if already logged in
          IdentityManager.checkSignInStatus(oauthInfo.portalUrl + "/sharing")
            .then(function(credential: any) {
              handleLoginSuccess(credential)
            })
            .catch(function() {
              console.log("Not currently logged in to Red Cross ArcGIS")
              setIsLoading(false)
            })
        }
      )
    }
  }

  const handleLoginSuccess = (credential: any) => {
    console.log("Login successful!", credential)
    setUserName(credential.userId)
    setIsAuthenticated(true)
    setIsLoading(false)
    
    // Store authentication state
    localStorage.setItem('arcgis-auth', JSON.stringify({
      userId: credential.userId,
      token: credential.token,
      expires: credential.expires,
      portal: PORTAL_URL
    }))
  }

  const handleLogin = () => {
    setError('')
    
    if (!esriIdRef.current) {
      setError('Authentication system not initialized. Please refresh the page.')
      return
    }

    // Get credentials for the Red Cross portal
    esriIdRef.current.getCredential(PORTAL_URL + "/sharing", { oAuthPopupConfirmation: false })
      .then(function(credential: any) {
        handleLoginSuccess(credential)
      })
      .catch(function(error: any) {
        console.error("Login failed:", error)
        setError('Login failed. Please ensure you have access to the Red Cross ArcGIS portal.')
      })
  }

  const handleLogout = () => {
    if (esriIdRef.current) {
      esriIdRef.current.destroyCredentials()
    }
    localStorage.removeItem('arcgis-auth')
    setIsAuthenticated(false)
    setUserName('')
  }

  useEffect(() => {
    // Check for existing authentication
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
    
    // Initialize after ArcGIS API loads
    const timer = setTimeout(() => {
      initializeAuth()
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // Add logout to window for navigation component to use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).handleArcGISLogout = handleLogout
    }
  }, [])

  if (isLoading) {
    return (
      <>
        <Script src="https://js.arcgis.com/4.30/" strategy="beforeInteractive" />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Initializing ArcGIS authentication...</p>
          </div>
        </div>
      </>
    )
  }

  if (!isAuthenticated) {
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
                <p className="font-semibold mb-2">Secure Authentication via ArcGIS Online</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Uses your Red Cross ArcGIS credentials</li>
                  <li>Supports two-factor authentication (2FA)</li>
                  <li>Secure OAuth 2.0 with PKCE flow</li>
                  <li>Access to all your Red Cross layers</li>
                </ul>
              </div>

              {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleLogin}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Login to Red Cross ArcGIS
              </button>

              <div className="text-center text-xs text-gray-500 mt-4">
                <p>Portal: arc-nhq-gis.maps.arcgis.com</p>
                <p className="mt-1">Contact: jeff.franzen2@redcross.org for access</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Authenticated - render children with user context
  return (
    <>
      <Script src="https://js.arcgis.com/4.30/" strategy="beforeInteractive" />
      <div className="min-h-screen">
        <div className="absolute top-4 right-4 z-50 bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Logged in as: <strong>{userName}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
          >
            Logout
          </button>
        </div>
        {children}
      </div>
    </>
  )
}