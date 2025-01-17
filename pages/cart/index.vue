<template>
  <h1 class="text-2xl font-bold mb-4">Your Shopping Cart</h1>
  <div class="flex flex-row justify-between gap-8 p-4">
    <div class="flex flex-col w-[1000px]">
      <!-- Cart Items -->
      <div v-for="(item, index) in carts" :key="index" class="mb-8">
        <h2 class="text-xl font-bold mb-4">Vendor: {{ item.vendor.name }}</h2>
        <div class="border border-gray-200 p-4 rounded h-auto">
          <div class="space-y-4">
            <div v-for="(product, productIndex) in item.products" :key="productIndex" class="pb-4 flex items-center justify-between">
              <div class="flex items-center">
                <img :src="product.product?.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
                <div class="ml-4">
                  <p class="font-medium w-[300px]">{{ product.product?.title }}</p>
                </div>
              </div>
              <div class="text-left">
                <div>
                  <span>Each: ${{ product.product?.price }}</span>
                </div>
                <div>
                  <span>Amount: {{ product.count }}</span>
                </div>
                <div>
                  <span>Total: ${{ product.product?.price * product.count }}</span>
                </div>
              </div>
              <button class="text-red-500 hover:text-red-700 ml-4" @click="handleDelete(item.products[productIndex].id)">
                <i class="fa-solid fa-trash"></i> Remove
              </button>
            </div>
          </div>

          <!-- Total -->
          <div class="space-y-2">
            <div class="flex justify-between font-semibold">
              <span>Grand Total:</span>
              <span>${{ amount = item.summary.total }}</span>
            </div>
          </div>
          <button class="bg-primary text-white p-2 mt-4 rounded hover:bg-primary opacity-80" @click="navigateTo('/checkout/' + item.vendor.id)">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { useCartStore } from '@/store/cart';
import { ElMessage } from 'element-plus';

const cartStore = useCartStore();
const { getCart } = cartStore;
const carts = ref([]);

// Fetch cart data
const fetchCartData = async () => {
  try {
    const data = await getCart();
    carts.value = data.data; // Fetch cart as a simple list
  } catch (error) {
    ElMessage.error('Failed to fetch cart data. Please try again.');
    console.error('Error fetching cart data:', error);
  }
};

const handleDelete = async (productId) => {
  try {
    await cartStore.deleteCart(productId); // Delete the product using its id
    // Find the product and remove it from the local carts array
    carts.value.forEach((item) => {
      item.products = item.products.filter((product) => product.id !== productId);
    });
    fetchCartData();
    ElMessage.success('Item deleted successfully');
  } catch (error) {
    ElMessage.error('Failed to delete item. Please try again.');
    console.error('Error deleting item:', error);
  }
};



// Fetch cart data on component mount
onMounted(async () => {
  await fetchCartData();
});
</script>
