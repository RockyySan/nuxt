export const useHttp = (url, options = {}) => {
  const config = useRuntimeConfig()
  const baseURL = `${config.public.serverApiUrl}/${config.public.apiVersion}`
  const cookie = useCookie('access_token')
  const token = cookie.value

  if (options.method === 'GET') {
    delete options.body
  }

  options = {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    async onResponseError({ request, response, options }) {
      if (response.status === 401) {
        cookie.value = null
      } else if (response.status !== 422) {
        ElMessage.error(response.data?.message || 'Unknown error')
      }
    },
  }

  try {
    return $fetch(url, { baseURL, ...options })
  } catch (error) {
    console.error('HTTP Request failed:', error)
    ElMessage.error(error.message || 'Unknown error occurred')
    throw error
  }
}
