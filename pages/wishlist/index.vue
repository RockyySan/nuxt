<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-2xl font-bold mb-6">Wishlist</div>
    <ProductCard :products="wishlist" />
  </div>
</template>

<script setup>
import { useWishlistStore } from '~/store/wishlist.js'

useSeoMeta({ title: 'Rumdul | Wishlist' })
definePageMeta({ layout: 'homepage' })
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const wishlist = ref([])
//pagination
const currentPage = ref(1)
const totalPages = ref()

const wishlistStore = useWishlistStore()

const fetchWishlist = async (param) => {
  try {
    const data = await wishlistStore.getWishlist(param)
    wishlist.value = data.products
    currentPage.value = data.pagination.page_number
    totalPages.value = data.pagination.total_pages
  } catch (error) {
    ElMessage.error('Failed to fetch wishlist')
  }
}

onMounted(() => {
  fetchWishlist()
})
</script>

<style scoped>
.container {
  max-width: 1280px;
}

</style>
