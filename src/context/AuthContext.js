// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import jwt_decode from 'jwt-decode'
import { useLogin } from 'src/hooks/api/useAuth'
import { useQueryClient } from '@tanstack/react-query'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient()

  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  const { mutate } = useLogin()

  // ** Hooks
  const router = useRouter()

  const handleLogin = (body, errorCallback) => {
    const payloadBody = {
      username: body.username,
      password: body.password
    }

    mutate(payloadBody, {
      onSuccess: data => {
        if (data?.data) {
          const userData = {
            email: 'admin@admin.com',
            fullName: 'Administrator',
            id: 1,
            role: 'admin',
            username: 'admin'
          }

          window.localStorage.setItem('accessToken', data?.data?.token)
          window.localStorage.setItem('userData', JSON.stringify(userData))

          setUser(userData)

          const returnUrl = router.query.returnUrl
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/bulletins'
          router.replace(redirectURL)
        }
      },
      onError: () => {
        errorCallback()
      }
    })
  }

  const handleLogout = () => {
    setUser(null)
    queryClient.clear()
    window.localStorage.removeItem('userData')
    localStorage.removeItem('userData')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    router.push('/login')
  }

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      const storedToken = window.localStorage.getItem('accessToken')

      if (storedToken) {
        const { exp } = jwt_decode(storedToken)

        // ** Get token expiration time
        // eslint-disable-next-line
        const expirationTime = exp * 1000 - 60000

        // ** Handle auto logout if token expired
        if (Date.now() >= expirationTime) {
          handleLogout()
        } else {
          const storedUserData = JSON.parse(window.localStorage.getItem('userData') || '{}')

          setUser(storedUserData)
        }
      } else {
        handleLogout()
      }

      setLoading(false)
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
