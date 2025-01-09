import { defineStore } from 'pinia'
import ProductService from '~/services/ProductService.js'

export const useProductStore = defineStore('product', () => {
  const product = ref({})
  const productService = ProductService.getInstance()

  const getProduct = async (params) => {
    try {
      const { data } = await productService.getProduct(params)
      const products = data || {}
      product.value = products
      return products
    } catch (error) {
      ElMessage.error(error.message || 'Get product failed')
      throw new Error(`Get product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const showProduct = async (id) => {
    try {
      const { data } = await productService.showProduct(id)
      const products = data || {}
      product.value = products
      return products
    } catch (error) {
      ElMessage.error(error.message || 'Failed to fetch product')
      throw new Error(
        `Failed to fetch product: ${error.message || 'Unknown error'}`,
      )
    }
  }

  //latest product
  const getLatestProduct = async (params) => {
    try {
      const { data } = await productService.getLatestProduct(params)
      const products = data || {}
      product.value = products
      return products
    } catch (error) {
      ElMessage.error(error.message || 'Get latest product failed')
      throw new Error(`Get latest product failed: ${error.message || 'Unknown error'}`)
    }
  }

  //getDiscountedProduct
  const getDiscountedProduct = async (params) => {
    try {
      const { data } = await productService.getDiscountedProduct(params)
      const products = data || {}
      product.value = products
      return products
    } catch (error) {
      ElMessage.error(error.message || 'Get discounted product failed')
      throw new Error(`Get discounted product failed: ${error.message || 'Unknown error'}`)
    }
  }

  //getPromotionProduct
  const getPromotionProduct = async (params) => {
    try {
      const { data } = await productService.getPromotionProduct(params)
      const products = data || {}
      product.value = products
      return products
    } catch (error) {
      ElMessage.error(error.message || 'Get promotion product failed')
      throw new Error(`Get promotion product failed: ${error.message || 'Unknown error'}`)
    }
  }

  return {
    product: computed(() => product.value),
    getProduct,
    showProduct,
    getLatestProduct,
    getDiscountedProduct,
    getPromotionProduct
  }
})
