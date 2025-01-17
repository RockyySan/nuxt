<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '~/store/product.js'

const products = ref([])
const productStore = useProductStore()
const { getDiscountedProduct } = productStore

const fetchProduct = async (params) => {
  try {
    products.value = await getDiscountedProduct(params) // Fetch products using the API
  } catch (error) {
    ElMessage.error('Failed to fetch product')
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <div v-if="products.length" class="latest-content container mx-auto py-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">{{ $t('home.discount_product') }}</h2>
      <el-button
        @click="navigateTo('/promotion?filter=discount')"
        class="text-lg cursor-pointer"
      >
        See More
      </el-button>
    </div>

    <ProductCard :products="products" />
  </div>
</template>

<style scoped>
.latest-content {
  width: 90%;
  margin: 0 auto;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
}
</style>
