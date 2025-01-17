<template>
  <div>
    <!-- Category Section -->
    <div v-if="category" class="category-section">
      <div class="text-center mb-6">
        <!-- Display Category Icon -->
        <img
          v-if="category.icon"
          :src="category.icon"
          alt="Category Icon"
          class="w-16 h-16 mx-auto rounded-full mb-4"
        />
        <!-- Category Name -->
        <h2 class="text-2xl font-semibold text-gray-800">{{ category.name }}</h2>
        <!-- Category Description -->
        <p v-if="category.description" class="text-sm text-gray-500 mt-2">{{ category.description }}</p>
        <p v-else class="text-sm text-gray-500 mt-2 italic">{{ $t('home.no_description_available') }}.</p>
      </div>

      <!-- Search Input -->
      <div class="mb-6">
        <input
          v-model="searchQuery"
          @input="onSearchQueryChange"
          type="text"
          :placeholder="$t('home.search_products')"
          class="w-full md:w-1/2 p-2 border rounded-lg shadow-sm"
        />
      </div>

      <!-- Products Section -->
      <div v-if="products.length > 0" class="products-section">
        <ProductCard :products="products" />
      </div>
      <!-- No Products Found -->
      <div v-else class="text-center text-gray-600 mt-6">
        <p>No products found for the search query.</p>
      </div>

      <div v-if="currentPage < totalPages" class="text-center mt-6">
        <button
          @click="loadMore"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {{ $t('home.see_more') }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="text-center text-gray-600">
      <p>Loading...</p>
    </div>

    <!-- Category Not Found -->
    <div v-else class="text-center text-gray-600">
      <p>Category not found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDebounce } from '~/composables/useDebounce.js';
import { useCategoryStore } from '~/store/category.js';

definePageMeta({
  layout: 'homepage',
});
useSeoMeta({ title: `Category` });

const category = ref(null);
const products = ref([]);
const searchQuery = ref('');
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);
const route = useRoute();
const { debounce } = useDebounce();
const categoryStore = useCategoryStore();
const { showCategory } = categoryStore;

// Fetch data from API
const fetchData = async (search = '', page = 1) => {
  loading.value = true;
  const slug = route.params.slug;
  try {
    const response = await showCategory(slug, { search, page });
    category.value = response.category;

    // Replace or append products based on page
    if (page === 1) {
      products.value = response.products.data;
    } else {
      products.value = [...products.value, ...response.products.data];
    }

    // Update pagination info
    currentPage.value = response.products.current_page;
    totalPages.value = response.products.last_page;
  } catch (error) {
    console.error('Error fetching data:', error);
    category.value = null;
    products.value = [];
  } finally {
    loading.value = false;
  }
};

// Debounced function to handle search input
const debouncedFetchData = debounce((newSearch) => {
  fetchData(newSearch, 1);
}, 500);

// Event handler for search input
const onSearchQueryChange = (event) => {
  const newSearch = event.target.value;
  searchQuery.value = newSearch;
  debouncedFetchData(newSearch);
};

// Load more products when reaching the bottom of the list
const loadMore = () => {
  if (currentPage.value < totalPages.value && !loading.value) {
    fetchData(searchQuery.value, currentPage.value + 1);
  }
};

onMounted(() => {
  fetchData();
});
</script>


<style scoped>
img {
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-section {
  max-width: 1200px;
  margin: 0 auto;
}

.products-section .product-card img {
  border: 1px solid #f0f0f0;
}

.product-card {
  height: 100%;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
