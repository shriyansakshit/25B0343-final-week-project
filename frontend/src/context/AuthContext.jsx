import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import * as authApi from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('mg_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('mg_user')
      }
    }
    setLoading(false)
  }, [])

  const persistSession = useCallback((token, userData) => {
    localStorage.setItem('mg_token', token)
    localStorage.setItem('mg_user', JSON.stringify(userData))
    setUser(userData)
  }, [])

  const loginPatient = useCallback(async (credentials) => {
    const { data } = await authApi.loginPatient(credentials)
    persistSession(data.token, data.user)
    return data.user
  }, [persistSession])

  const loginDoctor = useCallback(async (credentials) => {
    const { data } = await authApi.loginDoctor(credentials)
    persistSession(data.token, data.user)
    return data.user
  }, [persistSession])

  const loginDean = useCallback(async (credentials) => {
    const { data } = await authApi.loginDean(credentials)
    persistSession(data.token, data.user)
    return data.user
  }, [persistSession])

  const signupPatient = useCallback(async (details) => {
    const { data } = await authApi.signupPatient(details)
    persistSession(data.token, data.user)
    return data.user
  }, [persistSession])

  const signupDoctor = useCallback(async (details) => {
    const { data } = await authApi.signupDoctor(details)
    persistSession(data.token, data.user)
    return data.user
  }, [persistSession])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // ignore network errors on logout, clear locally regardless
    }
    localStorage.removeItem('mg_token')
    localStorage.removeItem('mg_user')
    setUser(null)
  }, [])

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    loading,
    loginPatient,
    loginDoctor,
    loginDean,
    signupPatient,
    signupDoctor,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
