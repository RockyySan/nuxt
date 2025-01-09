import { defineStore } from 'pinia'
import VendorService from '~/services/VendorService.js'

export const useVendorStore = defineStore('vendor', () => {
  const vendor = ref({})
  const vendorDetail = ref({})
  const vendorService = VendorService.getInstance()

  const getVendor = async(params) => {
    try{
      const { data } = await vendorService.getVendor(params)
      const vendors = data || {}
      vendor.value = vendors
      return vendors
    }catch(error) {
      ElMessage.error("Failed to get vendor",error)
    }
  }

  const showVendor = async (params) => {
    try {
      const { data } = await vendorService.showVendor(params);
      const vendors = data || {};
      vendor.value = vendors;
      return vendors;
    } catch (error) {
      ElMessage.error(error.message || 'Failed to fetch vendor');
    }
  };


  return {
    getVendor,
    showVendor
  }
})
