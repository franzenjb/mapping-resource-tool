'use client'

import { useState, useEffect } from 'react'

interface TwoFactorAuthProps {
  children: React.ReactNode
}

const VALID_EMAILS = [
  'jeff.franzen2@redcross.org',
  'admin@redcross.org'
]

// For demo purposes, we'll use a fixed code. In production, this would be generated and sent via email/SMS
const VERIFICATION_CODE = '123456'
const AUTH_KEY = 'mapping-tool-2fa-auth'
const PASSWORD = 'redcross'

export default function TwoFactorAuth({ children }: TwoFactorAuthProps) {
  const [stage, setStage] = useState<'loading' | 'password' | 'email' | 'code' | 'authenticated'>('loading')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const checkAuth = () => {
    try {
      const authData = localStorage.getItem(AUTH_KEY)
      if (authData) {
        const { email, timestamp } = JSON.parse(authData)
        // Session expires after 24 hours
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setEmail(email)
          setStage('authenticated')
          return
        }
      }
      setStage('password')
    } catch (error) {
      console.error('Auth check failed:', error)
      setStage('password')
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password === PASSWORD) {
      setStage('email')
      setPassword('')
    } else {
      setError('Invalid password')
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const normalizedEmail = email.toLowerCase().trim()
    if (!VALID_EMAILS.includes(normalizedEmail)) {
      setError('Email not authorized. Please use your Red Cross email.')
      return
    }

    // Simulate sending verification code
    console.log(`Sending verification code to ${email}...`)
    setCodeSent(true)
    setResendTimer(30)
    setStage('code')
    
    // In production, this would make an API call to send the email
    setTimeout(() => {
      console.log(`Verification code sent: ${VERIFICATION_CODE}`)
    }, 1000)
  }

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (code === VERIFICATION_CODE) {
      // Save authentication
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        email: email,
        timestamp: Date.now()
      }))
      setStage('authenticated')
    } else {
      setError('Invalid verification code')
    }
  }

  const resendCode = () => {
    if (resendTimer === 0) {
      console.log(`Resending verification code to ${email}...`)
      setResendTimer(30)
      setError('')
      // In production, make API call here
      setTimeout(() => {
        console.log(`Verification code resent: ${VERIFICATION_CODE}`)
      }, 1000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY)
    setStage('password')
    setEmail('')
    setCode('')
    setCodeSent(false)
  }

  // Add logout to window for navigation component to use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).handle2FALogout = handleLogout
    }
  }, [])

  if (stage === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (stage === 'password') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4">
              <span className="text-3xl font-bold text-red-600">Red Cross</span>
              <span className="text-3xl font-light text-gray-600 ml-2">Mapping</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Secure Access Portal</h1>
            <p className="text-gray-600 text-sm">Step 1: Enter Password</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
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
                placeholder="Enter access password"
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
              Continue
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (stage === 'email') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4">
              <span className="text-3xl font-bold text-red-600">Red Cross</span>
              <span className="text-3xl font-light text-gray-600 ml-2">Mapping</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Two-Factor Authentication</h1>
            <p className="text-gray-600 text-sm">Step 2: Verify Your Email</p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Red Cross Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="you@redcross.org"
                autoFocus
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                A verification code will be sent to this email
              </p>
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
              Send Verification Code
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setStage('password')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to password
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (stage === 'code') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4">
              <span className="text-3xl font-bold text-red-600">Red Cross</span>
              <span className="text-3xl font-light text-gray-600 ml-2">Mapping</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Enter Verification Code</h1>
            <p className="text-gray-600 text-sm">Step 3: Check your email</p>
          </div>

          {codeSent && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              Verification code sent to {email}
              <div className="text-xs mt-1">For demo: use code {VERIFICATION_CODE}</div>
            </div>
          )}

          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                6-Digit Verification Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-center text-2xl font-mono"
                placeholder="000000"
                autoFocus
                maxLength={6}
                pattern="[0-9]{6}"
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
              disabled={code.length !== 6}
            >
              Verify & Access
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={resendCode}
              disabled={resendTimer > 0}
              className={`text-sm ${
                resendTimer > 0 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:text-blue-700 cursor-pointer'
              }`}
            >
              {resendTimer > 0 
                ? `Resend code in ${resendTimer}s` 
                : 'Resend verification code'
              }
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setStage('email')
                setCode('')
                setCodeSent(false)
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Use different email
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated
  return <>{children}</>
}