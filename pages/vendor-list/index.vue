<script setup>
import { ref, onMounted } from 'vue';
import { useVendorStore } from '~/store/vendor.js';
import { ElMessage } from 'element-plus';
import { useDebounce } from '~/composables/useDebounce.js';

definePageMeta({ layout: 'homepage' })

const currentPage = ref(1);
const totalPages = ref(1);
const vendors = ref([]);
const searchQuery = ref('');
const itemsPage = ref(5);
const vendorStore = useVendorStore();
const { getVendor } = vendorStore;

// For search debounce
const { debounce } = useDebounce();
// Fetch vendors
const fetchVendor = async () => {
  try {
    const response = await getVendor({
      page: currentPage.value,
      search: searchQuery.value, // Trim whitespace
      per_page: itemsPage.value
    });
    vendors.value = response.data || [];
    totalPages.value = response.totalPages || 0;
  } catch (error) {
    ElMessage.error('Failed to fetch Vendor');
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchVendor();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchVendor();
  }
};

// Debounced search handler
const searchHandler = debounce(async () => {
  currentPage.value = 1; // Reset to the first page on search
  await fetchVendor();
}, 500);

// Search vendors when query changes
const searchVendors = async () => {
  await searchHandler();
}

onMounted(() => {
  fetchVendor();
});
</script>

<template>
  <div>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search vendors..."
      @input="searchVendors"
      class="border rounded px-4 py-2 w-full max-w-xs"
    />
    <div class="flex items-center justify-between pb-4">
    </div>
    <div v-if="vendors.length > 0">
      <ul
        v-for="(vendor, index) in vendors"
        :key="index"
        class="pb-4 flex items-center justify-between border border-gray-100 rounded mb-2 p-4">
        <li class="w-[200px]">
          <img
            :src="vendor.logo || 'default-logo.jpg'"
            alt="Vendor logo"
            class="w-[100px] h-[100px] rounded"
          />
        </li>
        <li class="text-left w-[200px]">
          <div class="text-xl">
            {{ vendor.name }}
          </div>
          <div class="text-gray-500">
            Slug: {{ vendor.slug }}
          </div>
        </li>
        <li>
          <button
            class="bg-primary text-white hover:text-red-700 p-2 w-[100px] rounded"
            @click="navigateTo(`/vendor-detail/${vendor.slug}`)">
            Visit
          </button>
        </li>
      </ul>
    </div>
    <div v-else class="text-center text-gray-500">
      No vendors found.
    </div>

    <div class="flex justify-between pt-4">
      <button
        @click="prevPage"
        :disabled="currentPage.value === 1"
        class="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50">
        Previous
      </button>
      <span>Page {{ currentPage.value }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage.value === totalPages.value"
        class="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50">
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.border {
  border: 1px solid #e5e7eb;
}
.bg-primary {
  background-color: #3b82f6;
}
.hover\:text-red-700:hover {
  color: #b91c1c;
}
</style>
