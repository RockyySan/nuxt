import AuthService from '~/services/AuthService.js'
import { useCookies } from 'vue3-cookies'
import { ElMessage } from 'element-plus'

const authService = AuthService.getInstance()

export const useAuthStore = defineStore('auth', () => {
  const { cookies } = useCookies()
  const user = ref(null)
  const token = ref(null)

  const login = async (credentials) => {
    try {
      const { data } = await authService.login(credentials)
      const { user: userData, token: authToken } = data || {}

      if (!authToken) {
        throw new Error('Invalid Credentials')
      }

      user.value = userData
      token.value = authToken
      const cookieOptions = { secure: true, sameSite: 'Strict' }

      cookies.set('access_token', authToken, cookieOptions)
      cookies.set('user', JSON.stringify(userData), cookieOptions)
      cookies.set('tokenType', 'Bearer', cookieOptions)

      return data
    } catch (error) {
      ElMessage.error(error.message || 'Login failed')
      throw new Error(`Login failed: ${error.message || 'Unknown error'}`)
    }
  }

  //getMe function
  const getMe = async () => {
    try {
      const { data } = await authService.getMe()
      if (!data) {
        throw new Error('No data returned')
      }
      user.value = data
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Login failed')
      throw new Error(`Login failed: ${error.message || 'Unknown error'}`)
    }
  }

  const register = async (credentials) => {
    try {
      const response = await authService.register(credentials) // Use the instance here

      if (response && response.data) {
        user.value = response.data.user
        token.value = response.data.token

        cookies.set('access_token', token.value, {
          secure: true,
          sameSite: 'Strict',
        })
        cookies.set('user', JSON.stringify(user.value), {
          secure: true,
          sameSite: 'Strict',
        })
        cookies.set('tokenType', 'Bearer', { secure: true, sameSite: 'Strict' })
        return response.data
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    authService.logout()
    cookies.remove('access_token')
    cookies.remove('user')
    cookies.remove('tokenType')
    //logout
  }

  //getProfile
  const getProfile = async () => {
    try {
      const { data } = await authService.getProfile()
      if (!data) {
        throw new Error('No data returned')
      }
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Profile failed')
      throw new Error(`Profile failed: ${error.message || 'Unknown error'}`)
    }
  }

  //updateProfile
  const editProfile = async (credentials) => {
    try {
      console.log(credentials)
      const { data } = await authService.updateProfile(credentials)
      if (!data) {
        throw new Error('No data returned')
      }
      return data
    } catch (error) {
      throw error
    }
  }

  //resetPassword
  const resetPassword = async (credentials) => {
    try {
      const { status } = await authService.resetPassword(credentials)
      if (!status) {
        throw new Error('No data returned')
      }
      return status
    } catch (error) {
      throw error
    }
  }

  //updatePassword
  const updatePassword = async (credentials) => {
    try {
      const { status } = await authService.updatePassword(credentials)
      if (!status) {
        throw new Error('No data returned')
      }
      return status
    } catch (error) {
      throw error
    }
  }

  return {
    user: computed(() => user.value),
    token,
    register,
    login,
    logout,
    getMe,
    getProfile,
    editProfile,
    resetPassword,
    updatePassword
  }
})
