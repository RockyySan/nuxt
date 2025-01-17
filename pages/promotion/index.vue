<template>
  <div class="promotion-page p-4 flex">
    <!-- Sidebar for Filters -->
    <div class="sidebar w-72 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">{{ $t('home.filters') }}</h2>

      <!-- Search Input -->
      <el-input
        v-model="searchQuery"
        :placeholder="$t('home.search_products')"
        size="small"
        clearable
        @input="debouncedApplyFilters"
        class="mb-4"
      />

      <!-- Filter Options -->
      <div class="space-y-2">
        <h3 class="font-semibold text-sm">{{ $t('home.product_type') }}</h3>
        <el-radio-group v-model="selectedType" @change="applyFilters">
          <el-radio label="compound">{{ $t('home.discount') }}</el-radio>
          <el-radio label="discount">{{ $t('home.compound') }}</el-radio>
          <el-radio label="compound_discount">{{ $t('home.compound_discount') }}</el-radio>
          <el-radio label="all">All</el-radio>
        </el-radio-group>
      </div>

      <!-- Additional filters can be added here -->
    </div>

    <!-- Main Content -->
    <div class="flex-1 ml-8">
      <h1 class="text-2xl font-bold mb-4 text-center">{{ $t('home.promotion_products') }}</h1>

      <el-row :gutter="20">
        <ProductCard :products="products" />
      </el-row>

      <!-- Pagination -->
      <div class="pagination mt-8 flex justify-center items-center space-x-2">
        <!-- Previous Button -->
        <el-button
          size="small"
          :disabled="!prevPageUrl"
          @click="fetchProduct({ page: currentPage - 1 })"
        >
          {{ $t('home.previous') }}
        </el-button>

        <!-- Page Number -->
        <span>{{ currentPage }} / {{ totalPages }}</span>

        <!-- Next Button -->
        <el-button
          size="small"
          :disabled="!nextPageUrl"
          @click="fetchProduct({ page: currentPage + 1 })"
        >
          {{ $t('home.next') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '~/store/product.js'
import { ElMessage, ElButton, ElInput, ElRadioGroup, ElRadio } from 'element-plus'
import { useDebounce } from '~/composables/useDebounce.js'

useSeoMeta({ title: 'Promotion' })
definePageMeta({ layout: 'homepage' })

const currentPage = ref(1)
const products = ref([])
const totalPages = ref()
const paginationLinks = ref([])
const nextPageUrl = ref(null)
const prevPageUrl = ref(null)
const searchQuery = ref('')
const selectedType = ref('all')

const route = useRoute()
const router = useRouter()

const productStore = useProductStore()
const { getPromotionProduct } = productStore
const { debounce } = useDebounce()

// Debounced version of applyFilters to delay API calls
const debouncedApplyFilters = debounce(() => {
  applyFilters()
}, 500) // Delay of 500ms before applying filters

// Function to fetch products with URL parameters
const fetchProduct = async (params = { page: 1, filter: 'all', search: '' }) => {
  try {
    const data = await getPromotionProduct(params)
    products.value = data.data
    currentPage.value = data.current_page
    totalPages.value = data.last_page
    paginationLinks.value = data.links
    nextPageUrl.value = data.next_page_url
    prevPageUrl.value = data.prev_page_url
  } catch (error) {
    ElMessage.error('Failed to fetch product')
  }
}

// Function to apply filters and update URL params
const applyFilters = () => {
  // Construct the URL query parameters
  const queryParams = {
    page: currentPage.value,
    filter: selectedType.value,
    search: searchQuery.value
  }

  // Update the URL with the new query params
  router.push({ query: queryParams })

  // Fetch the products with the current filters
  fetchProduct(queryParams)
}

// Watch for changes in the URL query params
watch(() => route.query, (newQuery) => {
  selectedType.value = newQuery.filter || 'all'

  // Fetch products when URL params change
  fetchProduct({
    page: currentPage.value,
    filter: selectedType.value,
    search: searchQuery.value
  })
}, { immediate: true })

onMounted(() => {
  // Initialize the page with the URL params
  fetchProduct({
    page: currentPage.value,
    filter: selectedType.value,
    search: searchQuery.value
  })
})
</script>

<style scoped>
.product-card {
  border-radius: 8px;
  overflow: hidden;
}

.product-image {
  border-radius: 4px;
}

.pagination button {
  min-width: 32px;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
}

.el-drawer__body {
  padding: 20px;
}
</style>
