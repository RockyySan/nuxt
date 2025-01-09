<template>
  <div class="promo-content container mx-auto py-8">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold">Super Sale</h2>
        <el-button @click="navigateTo('/products')" class="text-lg cursor-pointer">See More</el-button>
    </div>

    <!-- Promotions Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <div
        v-for="promo in promotions"
        :key="promo.id"
        class="promo-item border rounded-lg overflow-hidden shadow hover:shadow-lg transition-all"
      >
        <!-- Image -->
        <img
          :src="promo.image"
          alt="Promotion Sale"
          class="w-full h-48 object-cover cursor-pointer"
        />

        <!-- Content -->
        <div class="p-4">
          <!-- Title and Icon -->
          <div class="flex justify-between items-center mb-2">
            <h3 class="item-title text-lg font-semibold">{{ promo.title }}</h3>
          </div>
          <!-- Rate -->
          <h5 class="item-rate text-sm font-semibold">{{ promo.rate }}</h5>
          <!-- Discount -->
          <p class="text-green-600 font-bold text-sm mb-2">{{ promo.discount }}</p>

          <!-- Price and "In Stock" Button (Flex container) -->
          <div class="flex justify-between items-center">
            <p class="item-price text-lg font-semibold text-gray-800">{{ promo.price }}</p>
            <el-tag
              :type="promo.inStock === 'In Stock' ? 'success' : 'danger'"
              effect="plain"
              class="cursor-pointer"
            >
              {{ promo.inStock }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define ref for storing JSON data
const promotions = ref([]);

// Fetch data from the JSON file
onMounted(async () => {
  try {
    const response = await fetch('/data/promotionSale.json');
    promotions.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch promotions:', error);
  }
});
</script>

<style scoped>
/* Styling for Modern UI */
.promo-content {
  width: 90%;
  margin: 0 auto;
}
.promo-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.promo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
.item-title {
  color: #000;
}
.item-rate{
  color: #edb424;
}
.item-price {
  color: #000;
}
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
