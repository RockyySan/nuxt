import { defineStore } from 'pinia'
import WishlistService from '~/services/WishlistService.js'

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlists = ref({})
  const wishlistService = WishlistService.getInstance()

  const getWishlist = async (params) => {
    try {
      const { data } = await wishlistService.getWishlist(params)
      const wishlist = data || {}
      wishlists.value = wishlist
      return wishlist
    } catch (error) {
      ElMessage.error(error.message || 'Get product failed')
      throw new Error(`Get product failed: ${error.message || 'Unknown error'}`)
    }
  }

  //addWishlist
  const addWishlist = async (id) => {
    try {
      await wishlistService.addWishlist(id)
      ElMessage.success('Add product to wishlist successfully')
      return true
    } catch (error) {
      ElMessage.error(error.message || 'Add product to wishlist failed')
      throw new Error(`Add product to wishlist failed: ${error.message || 'Unknown error'}`)
    }
  }

  //deleteWishlist
  const deleteWishlist = async (id) => {
    try {
      await wishlistService.deleteWishlist(id)
      ElMessage.success('Delete product successfully')
      return true
    } catch (error) {
      ElMessage.error(error.message || 'Delete product failed')
      throw new Error(`Delete product failed: ${error.message || 'Unknown error'}`)
    }
  }

  return {
    wishlist: computed(() => wishlists.value),
    getWishlist,
    addWishlist,
    deleteWishlist
  }
})
