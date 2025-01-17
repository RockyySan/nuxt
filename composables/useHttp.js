export const useHttp = async (url, options = {}) => {
  const config = useRuntimeConfig();
  const baseURL = `${config.public.serverApiUrl}/${config.public.apiVersion}`;
  const cookie = useCookie('access_token');
  const token = cookie.value;

  // Remove body for GET requests
  if (options.method === 'GET') {
    delete options.body;
  }

  // Configure request headers
  options = {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    // Ensure the body is either FormData or JSON
    body: options.body instanceof FormData ? options.body : JSON.stringify(options.body),
  }

  try {
    return await $fetch(url, { baseURL, ...options })
  } catch (error) {
    console.error('HTTP Request failed:', error);

    // Extract error response safely
    const errorMessage =
      error?.response?._data?.alert?.title || // API alert title
      error?.response?._data?.message || // Generic API error message
      error?.message || // Native fetch error
      'Unknown error occurred';

    // Handle 401 errors (Unauthorized)
    if (error?.response?.status === 401) {
      cookie.value = null; // Clear token
      ElMessage.error('Session expired. Please log in again.');
    } else {
      ElMessage.error(errorMessage);
    }

    throw new Error(errorMessage);
  }
};
