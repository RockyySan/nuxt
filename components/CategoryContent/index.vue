<template>
  <div class="promo-content container mx-auto py-8">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">{{ $t('home.category') }}</h2>
      <el-button
        @click="navigateTo('category')"
        class="text-lg cursor-pointer"
      >
        {{ $t('home.see_more') }}
      </el-button>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <div
        v-for="category in categories"
        :key="category.id"
        class="promo-item border rounded-lg overflow-hidden shadow hover:shadow-lg transition-all"
        @click="navigateTo(`/category/detail/${category.slug}`)"
      >
        <!-- Image -->
        <img
          :src="category.icon"
          :alt="category.name"
          class="w-full h-48 object-cover cursor-pointer"
        />

        <!-- Content -->
        <div class="p-4">
          <!-- Title -->
          <h3 class="item-title text-lg font-semibold mb-2">
            {{ category.name }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '~/store/category.js'

const categories = ref([])
const categoryStore = useCategoryStore()
const { getCategories } = categoryStore

const fetchCategory = async (params) => {
  try {
    const categoryList = await getCategories(params)
    categories.value = categoryList.data // Adjusted to fetch the products from the data object
  } catch (error) {
    ElMessage.error('Failed to fetch product')
  }
}
// Fetch data on component mount
onMounted(() => {
  fetchCategory({ per_page: 5 })
})
</script>

<style scoped>
/* Content Wrapper */
.promo-content {
  width: 90%;
  margin: 0 auto;
}

/* Header Styles */
.text-color {
  color: #000;
}

/* Promo Item Styles */
.promo-item {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.promo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Typography */
.item-title {
  color: #000;
}

.item-rate {
  color: #edb424;
}

.item-price {
  color: #000;
}

/* Box Icon */
.bx {
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: color 0.2s ease;
}

.bx:hover {
  color: #ff0000;
}
</style>
