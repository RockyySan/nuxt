<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '~/store/product';

const products = ref([]);
const productStore = useProductStore();
const { getLatestProduct } = productStore;

const router = useRouter();

const fetchLatestProducts = async () => {
  try {
    const params = {
      per_page: 4,
      current_page: 1,
      latest: true
    }
    products.value = await getLatestProduct(params);
  } catch (error) {
    ElMessage.error('Failed to fetch latest products');
  }
};

const navigateToProducts = () => {
  router.push({ path: '/latest-product', query: { latest: true } });
};

onMounted(() => {
  fetchLatestProducts();
});
</script>

<template>
  <div class="latest-content container mx-auto py-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold">{{ $t('home.latest_product') }}</h2>
      <el-button
        @click="navigateToProducts"
        class="text-lg cursor-pointer"
      >
        {{ $t('home.see_more') }}
      </el-button>
    </div>
    <ProductCard :products="products.data" />
  </div>
</template>

<style scoped>
.latest-content {
  width: 90%;
  margin: 0 auto;
}

.promo-item {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f9f9f9;
  transition: transform 0.2s;
}

.promo-item:hover {
  transform: translateY(-5px);
}

.product-image {
  border-bottom: 1px solid #e5e5e5;
}

.item-title {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit text to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  max-height: 3em; /* Approximate height for two lines of text */
}
</style>
