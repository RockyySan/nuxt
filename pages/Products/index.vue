<script setup>
useSeoMeta({ title: 'Products' })
definePageMeta({ layout: 'homepage' })
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '~/store/product.js'

const filterOption = ref({
  name: '',
  size: '',
  priceRange: [0, 1000], // This will hold the min_price and max_price as an array
})

const sortOrder = ref('ascending')
const currentPage = ref(1)
const products = ref([])
const productStore = useProductStore()
const { getProduct } = productStore
const collapse = ref(true)

const totalPages = ref()

const fetchProduct = async (params) => {
  try {
    const productList = await getProduct(params)
    products.value = productList.data // Adjusted to fetch the products from the data object
    currentPage.value = productList.current_page // Current page from the API response
    totalPages.value = productList.last_page // Last page from the API response
  } catch (error) {
    ElMessage.error('Failed to fetch product')
  }
}

const filterProducts = async () => {
  const min_price = filterOption.value.priceRange[0]
  const max_price = filterOption.value.priceRange[1]
  const params = {
    min_price,
    max_price,
  }
  fetchProduct(params)
  let filteredProducts = products.value

  if (filterOption.value.name) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name
        .toLowerCase()
        .includes(filterOption.value.name.toLowerCase()),
    )
  }

  if (filterOption.value.size) {
    filteredProducts = filteredProducts.filter(
      (product) => product.size === filterOption.value.size,
    )
  }

  if (
    filterOption.value.min_price !== null &&
    filterOption.value.max_price !== null
  ) {
    const { min_price, max_price } = filterOption.value.priceRange
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= min_price && product.price <= max_price,
    )
  }

  products.value = filteredProducts
}

const sortProducts = () => {
  if (sortOrder.value) {
    products.value.sort((a, b) => {
      if (sortOrder.value === 'ascending') {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    fetchProduct({ page: currentPage.value - 1 })
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchProduct({ page: currentPage.value + 1 })
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <div class="products-container px-4 md:px-8 lg:px-12">
    <h1 class="text-2xl font-bold mb-6">Product List</h1>
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Filter section -->
      <section
        class="filter-container border-2 rounded-md p-4 h-auto bg-white w-full lg:w-1/4"
      >
        <div class="mb-6">
          <div class="flex justify-between">
            <p class="font-bold mb-4">Filter by</p>
            <el-button
              type="primary"
              @click="collapse = !collapse"
              ></el-button>
          </div>

          <div v-if="collapse" class="flex flex-col">
            <!-- Product Name Filter -->
            <div class="flex flex-col gap-2 mb-4">
              <label for="product-name">Name</label>
              <el-input
                v-model="filterOption.name"
                placeholder="Enter Name"
                class="mb-4"
                @change="filterProducts"
              />
            </div>

            <div class="flex flex-col gap-2 mb-4">
              <label for="product-size">Size</label>
              <el-select
                v-model="filterOption.volume"
                placeholder="Select Size"
                class="mb-4"
                @change="filterProducts"
              >
                <el-option label="Small" value="small" />
                <el-option label="Medium" value="medium" />
                <el-option label="Large" value="large" />
              </el-select>
            </div>

            <div class="flex flex-col gap-2 mb-4">
              <label for="product-price">Price</label>
              <el-slider
                v-model="filterOption.priceRange"
                range
                class="mb-4"
                :min="0"
                :max="1000"
                :step="1"
                show-tooltip
                @change="filterProducts"
              />

              <div class="flex justify-between text-sm">
                <span>Min: ${{ filterOption.priceRange[0] }}</span>
                <span>Max: ${{ filterOption.priceRange[1] }}</span>
              </div>
            </div>

            <div class="mb-6">
              <p class="font-bold mb-4">Sort by Price</p>
              <el-radio-group v-model="sortOrder" @change="sortProducts">
                <el-radio value="ascending">Ascending</el-radio>
                <el-radio value="descending">Descending</el-radio>
              </el-radio-group>
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
            Previous
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
            Next
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
