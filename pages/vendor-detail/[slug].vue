<script setup>
import { ref, onMounted } from 'vue'
import { useVendorStore } from '~/store/vendor.js'
import { ElMessage } from 'element-plus'
import { useDebounce } from '~/composables/useDebounce.js'

definePageMeta({ layout: 'homepage' })

const vendorDetail = ref([])
const searchTerm = ref('');
const vendorStore = useVendorStore()
const { showVendor } = vendorStore

const route = useRoute();
const { debounce } = useDebounce();
// Fetch vendors
const showVendorDetail = async () => {
  try {
    const slug = route.params.slug
    vendorDetail.value = await showVendor({
        slug: slug,
        search: searchTerm.value,
    }
    )
  } catch (error) {
    ElMessage.error('Failed to fetch vendor detail')
  }
}
// Handle search input
const handleSearch = debounce(() => {
  showVendorDetail();
}, 500);


onMounted(() => {
  showVendorDetail()
})
</script>

<template>
  <div class="flex items-center border-b border-b-gray-400 p-4" v-if="vendorDetail">
    <div class="mr-[400px] flex items-center">
      <img :src="vendorDetail.logo || ' '" alt="Vendor Image" class="w-[150px] h-[150px]" />
    </div>
    <div>
      <div>Name: {{ vendorDetail.name }}</div>
      <div>Address: {{ vendorDetail.address }}</div>
      <div>Total products: {{ vendorDetail.total_products }}</div>
      <div>Joined since: {{ vendorDetail.created_at }}</div>
      <div>Email: {{ vendorDetail.email }}</div>
    </div>
  </div>

  <div>
    <div class="products-container px-4 md:px-8 lg:px-12">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Product list -->
        <section class="w-full">
          <h1 class="text-2xl font-bold mb-6">Product List</h1>
          <div class="flex items-center mb-4">
            <input
              v-model="searchTerm"
              @input="handleSearch"
              type="text"
              placeholder="Search products..."
              class="border rounded-md p-2 mr-4"
            />
          </div>
          <ProductCard :products="vendorDetail.products" />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-action {
  cursor: pointer;
  background-color: #2ec4b6;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn-inactive {
  cursor: pointer;
  background-color: #f1f1f1;
  color: black;
  padding: 10px 20px;
  border-radius: 5px;
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
    opacity: 1;
  }
}
</style>
