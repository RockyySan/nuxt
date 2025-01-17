<script setup>
import { ref, onMounted, watch } from 'vue'
import { useDebounce } from '~/composables/useDebounce.js'
import { useProductStore } from '~/store/product.js'
import { useRoute } from 'vue-router'

useSeoMeta({ title: 'Products' })
definePageMeta({ layout: 'homepage' })

const route = useRoute() // Access the route
const filterOption = ref({
  title: route.query.title || '', // Initialize with query param or empty string
  priceRange: [0, 5000],
})

const currentPage = ref(1)
const products = ref([])
const productStore = useProductStore()
const { getLatestProduct } = productStore
const collapse = ref(true)
const { debounce } = useDebounce()
const totalPages = ref()
const per_page = 15;
const totalLatest = ref('')

const fetchLatestProducts = async (params = {}) => {
  try {
    // Merge default params with incoming params
    const mergedParams = {
      per_page: per_page,
      page: currentPage.value,
      latest: true,
      ...params, // Add incoming params
    }

    const response = await getLatestProduct(mergedParams)
    products.value = response.data || [];
    totalPages.value = response.last_page || 1; // Ensure a default value
    totalLatest.value = response.total || 0; // Handle undefined or missing total
  } catch (error) {
    ElMessage.error('Failed to fetch latest products')
  }
}

// Debounced fetch function
const debouncedFetch = debounce(async () => {
  const params = {
    title: filterOption.value.title,
    min_price: filterOption.value.priceRange[0],
    max_price: filterOption.value.priceRange[1],
  }
  await fetchLatestProducts(params)
}, 300)

const filterProducts = () => {
  debouncedFetch()
}

const prevPage = () => {
  if (currentPage.value > 1) {
    fetchLatestProducts({ page: currentPage.value - 1 })
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchLatestProducts({ page: currentPage.value + 1 })
  }
}


watch(
  () => filterOption.value.title,
  () => {
    filterProducts()
  },
)

// Fetch products when component mounts and use the `title` query if present
onMounted(() => {
  const params = {
    per_page: per_page,
    page: currentPage.value,
    latest: true,
    title: filterOption.value.title,
    min_price: filterOption.value.priceRange[0],
    max_price: filterOption.value.priceRange[1],
  }
  fetchLatestProducts(params)
})
</script>

<template>
  <div class="products-container px-4 md:px-8 lg:px-12">
    <button @click="navigateTo('')" class="p-2 bg-primary rounded w-[100px]">
      <i class="fa-solid fa-arrow-left pr-[10px]"></i>Back</button>
    <h1 class="text-2xl font-bold mb-6 text-center">Latest Product</h1>
    <div class="text-xl">Total: {{totalLatest}}</div>
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Filter section -->
      <section
        class="filter-container border-2 rounded-md p-4 h-auto bg-white w-full lg:w-1/4"
      >
        <div class="mb-6">
          <div class="flex justify-between">
            <p class="font-bold mb-4">{{ $t('home.filters') }}</p>
            <el-button type="primary" @click="collapse = !collapse">
              {{ collapse ? 'Show Filters' : 'Hide Filters' }}
            </el-button>
          </div>

          <div v-if="collapse" class="flex flex-col">
            <!-- Product Name Filter -->
            <div class="flex flex-col gap-2 mb-4">
              <label for="product-name">{{ $t('home.name') }}</label>
              <el-input
                v-model="filterOption.title"
                :placeholder="$t('home.enter_name')"
                class="mb-4"
                @change="filterProducts"
              />
            </div>

            <div class="flex flex-col gap-2 mb-4">
              <label for="product-price">{{ $t('home.price') }}</label>
              <el-slider
                v-model="filterOption.priceRange"
                range
                class="mb-4"
                :min="0"
                :max="5000"
                :step="1"
                show-tooltip
                @change="filterProducts"
              />

              <div class="flex justify-between text-sm">
                <span>{{ $t('home.min') }}: ${{ filterOption.priceRange[0] }}</span>
                <span>{{ $t('home.max') }}: ${{ filterOption.priceRange[1] }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product list -->
      <section v-if="products" class="w-full lg:w-2/2">
        <ProductCard :products="products" />
        <!-- Pagination -->
        <div class="pagination flex justify-between items-center mt-6">
          <el-button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="w-[100px] text-blue-400 border-blue-200"
          >
            {{ $t('home.previous') }}
          </el-button>
          <div class="page-numbers flex gap-2">
            <el-button
              v-for="page in Array.from(
                { length: totalPages },
                (_, i) => i + 1,
              )"
              :key="page"
              :class="page === currentPage ? 'btn-action' : 'btn-inactive'"
              @click="fetchProduct({ page })"
            >
              {{ page }}
            </el-button>
          </div>
          <el-button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="w-[100px] text-blue-400 border-blue-200"
          >
            {{ $t('home.next') }}
          </el-button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.btn-action {
  cursor: pointer;
  background-color: #2ec4b6;
  color: white;
  padding: 10px 20px;
}

.btn-inactive {
  cursor: pointer;
  background-color: #f1f1f1;
  color: black;
  padding: 10px 20px;
}

.filter-container {
  animation: content-animation 1s;
  font-family: Inter, sans-serif;
}

.products-container {
  animation: content-animation 1s;
  font-family: Inter, sans-serif;
}

@keyframes content-animation {
  from {
    opacity: 0;
  }
  to {
    opacity: 100;
  }
}
</style>
