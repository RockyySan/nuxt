import RequestVendorService from '~/services/RequestVendorService.js'

const requestVendorServer = RequestVendorService.getInstance()

export const useRequestVendorStore = defineStore('request-vendor', () => {
  const vendor = ref(null)

  const requestVendor = async (credentials) => {
    try {
      const response = await requestVendorServer.request(credentials) // Use the instance here
      if (response && response.data) {
        vendor.value = response.data
        return response.data
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      throw error
    }
  }
  return {
    vendor: computed(() => vendor.value),
    requestVendor,
  }
})
