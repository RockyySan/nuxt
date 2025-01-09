<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Categories</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="category in categories"
        :key="category.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div @click="navigateTo('/category/detail/' + category.slug)" class="cursor-pointer">
          <img
            :src="category.icon"
            alt="Category Icon"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <div class="text-hover text-xl font-semibold block mb-2">
              {{ category.name }}
            </div>
            <p v-if="category.description" class="text-gray-600 text-sm">
              {{ category.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6 text-center">
      <button
        v-if="!allLoaded"
        @click="loadMore"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        View More
      </button>
      <p v-else class="text-gray-600">All categories loaded</p>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from '~/store/category.js'

useSeoMeta({ title: 'Category' })
definePageMeta({ layout: 'homepage' })
const categoryStore = useCategoryStore();
const { getCategories } = categoryStore;

const categories = ref([]);
const page = ref(1);
const per_page = 6;
const allLoaded = ref(false);

const fetchCategories = async () => {
  const payload = { page: page.value, per_page };
  const response = await getCategories(payload);
  if (response && response.data.length > 0) {
    categories.value.push(...response.data);
  } else {
    allLoaded.value = true; // No more categories to load
  }
};

const loadMore = () => {
  page.value++;
  fetchCategories();
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.text-hover {
  color: #000;
  text-decoration: none;
}
.text-hover:hover {
  color: #2ec4b6;
}
</style>
