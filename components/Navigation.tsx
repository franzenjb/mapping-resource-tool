'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const authData = localStorage.getItem('simple-auth') || localStorage.getItem('arcgis-auth')
    setIsLoggedIn(!!authData)
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined' && (window as any).handleAuthLogout) {
      (window as any).handleAuthLogout()
    } else {
      localStorage.removeItem('simple-auth')
      localStorage.removeItem('arcgis-auth')
      window.location.reload()
    }
  }

  const tabs = [
    { name: 'Map View', href: '/', icon: '🗺️' },
    { name: 'Resources', href: '/resources', icon: '📚' },
    { name: 'AI Assistant', href: '/ai', icon: '🤖' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm relative z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center flex-shrink-0">
            <span className="text-lg sm:text-xl font-bold text-red-600">Red Cross</span>
            <span className="text-lg sm:text-xl font-light text-gray-600 ml-2 hidden sm:inline">Mapping Tool</span>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                    pathname === tab.href
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* User Info and Logout - Desktop */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <span className="text-sm text-gray-600">jeff.franzen2@redcross.org</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === tab.href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="text-sm text-gray-600 px-3 py-1">jeff.franzen2@redcross.org</div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 mt-1"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}