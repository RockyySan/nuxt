import { defineStore } from 'pinia'
import OrderService from '~/services/OrderService.js'
import { ElMessage } from 'element-plus'


export const useOrderStore = defineStore('orders', () => {
  const order = ref([])
  const orderService = OrderService.getInstance()

  const getOrder = async (params) => {
    try {
      const data = await orderService.getOrder(params)
      order.value = data || [];
      return data.data
    } catch (error) {
      ElMessage.error(error.message || 'Get order failed')
      throw new Error(`Get order failed: ${error.message || 'Unknown error'}`)
    }
  }



  return {
    order: computed(() => order.value),  // Expose cart as computed property
    getOrder,
  }
})
