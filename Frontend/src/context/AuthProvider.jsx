// frontend/src/context/AuthProvider.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContextValue'

// AuthProvider is the only React component exported from this file
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem('token') } catch { return null }
  })

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  // keep axios header in sync with token
  useEffect(() => {
    if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    else delete axios.defaults.headers.common['Authorization']
  }, [token])

  const login = ({ token: newToken, user: newUser }) => {
    if (!newToken) return
    try {
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(newUser || {}))
    } catch (err) {
      console.warn('Could not write auth to localStorage', err)
    }
    setToken(newToken)
    setUser(newUser || null)
  }

  const logout = () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } catch (err) {
      console.warn('Could not remove auth from localStorage', err)
    }
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
