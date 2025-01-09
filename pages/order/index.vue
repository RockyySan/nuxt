<script setup>
import { ref } from 'vue'

useSeoMeta({ title: 'Rumdul | Cart' })
definePageMeta({ layout: 'default' ,middleware: ['authenticate']})
import { useOrderStore } from '~/store/order.js'

const orderStore = useOrderStore()
const { getOrder } = orderStore

const orders = ref([])

// Fetch cart from the store
const fetchOrder = async () => {
  try {
    const orderList = await getOrder()
    console.log(orderList)
    orders.value = orderList
    console.log('Order:', orderList)
  } catch (error) {
    ElMessage.error('Failed to fetch order')
  }
}

onMounted(() => {
  fetchOrder()
})
</script>

<template>
  <h1>Your History</h1>
  <el-table :data="orders" class="w-[1000px] table">
    <el-table-column prop="code" label="Order code" width="180" />
    <el-table-column prop="created_at" label="Date" width="280" />
    <el-table-column prop="amount" label="Total price" width="180" />
    <el-table-column prop="address" label="Address" width="400" />
  </el-table>
</template>

<style scoped>
.table {
  border: 2px solid #d3d3d3;
  border-radius: 8px;
  overflow: hidden;
}
</style>
