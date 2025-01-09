import { defineStore } from 'pinia'
import CartService from '~/services/CartService.js'
import { ElMessage } from 'element-plus'


export const useCartStore = defineStore('cart', () => {
  const cart = ref([])
  const cartService = CartService.getInstance()

  const getCart = async (params) => {
    try {
      const data = await cartService.getCart(params)
      // const carts = data || {}
      cart.value = data
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Get product failed')
      throw new Error(`Get product failed: ${error.message || 'Unknown error'}`)
    }
  }

  const buyCart = async (data) => {
    try {
      const response = await cartService.buyCart(data)
      ElMessage.success('Product added to cart successfully')
      return response.data
    } catch (error) {
      ElMessage.error(error.message || 'Failed to add product to cart')
      throw new Error(`Add product to cart failed: ${error.message || 'Unknown error'}`)
    }
  }

  const state = reactive({
    Cart: [] // Initialize as an empty array
  });
  const addCart = async (params) => {
    try {
      const addedCart = await cartService.addCart(params);
      console.log('Cart added successfully:', addedCart);  // Log full response
        state.Cart = addedCart.Cart;  // Update cart state
        return addedCart.data;
    }catch(error) {
      throw new Error('Failed to add product to cart');
    }
  }

  const deleteCart = async (params) => {
    try {
      // Call the deleteCategory function from the service
      const deleteCart = await cartService.deleteCart(params)
      ElMessage.success('Item deleted successfully')
      return deleteCart.data  // Return the deleted category data
    } catch (error) {
      throw new Error('Failed to delete item in store: ' + error.message)
    }
  }
  return {
    cart: computed(() => cart.value),  // Expose cart as computed property
    getCart,
    deleteCart,
    buyCart,
    addCart
  }
})
