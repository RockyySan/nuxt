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
    orders.value = orderList
  } catch (error) {
    ElMessage.error('Failed to fetch order')
  }
}

onMounted(() => {
  fetchOrder()
})
</script>

<template>
  <button @click="navigateTo('/')" class="bg-primary p-2 rounded">{{ $t('home.back_home') }}</button>
  <h1 class="text-lg mb-2">Your History</h1>
  <el-table :data="orders" class="table w-[900px]">
    <el-table-column prop="code" label="Order code" width="180" />
    <el-table-column prop="created_at" label="Date" width="280" />
    <el-table-column prop="amount" label="Total price" width="180" />
    <el-table-column prop="address" label="Address" width="280" />
  </el-table>
</template>

<style scoped>
.table {
  border: 2px solid #d3d3d3;
  border-radius: 8px;
}
</style>
