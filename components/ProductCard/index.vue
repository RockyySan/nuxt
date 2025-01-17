<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  max-w-7xl"
  >
    <div
      v-for="product in products"
      :key="product.id"
      class="py-[10px] relative border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 "
    >
      <!-- Wishlist Heart -->
      <div
        @click="toggleWishlist(product.id)"
        class="absolute top-2 right-2 z-10 cursor-pointer p-2 rounded-full bg-white shadow hover:shadow-md transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          :class="{
            'text-red-500': isInWishlist(product.id),
            'text-gray-400': !isInWishlist(product.id),
          }"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </div>

      <!-- Image Section -->
      <div class="relative h-72">
        <img
          :src="product.image"
          alt="product image"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Details Section -->
      <div class="p-2 flex flex-col justify-between h-[250px]">
        <div class="flex flex-col gap-1">
          <div v-if="product.product_type">
      <span
        :class="{
          'text-xs px-2 py-1 rounded-full': true,
          'bg-red-500 text-white': product.product_type === 'discount',
          'bg-green-500 text-white': product.product_type === 'compound',
          'bg-blue-500 text-white': product.product_type === 'compound_discount',
        }"
      >
        {{ $t('home.' + product.product_type) }}
      </span>
          </div>

          <div v-if="product.tags" class="flex flex-wrap gap-2">
            <el-tag
              v-for="tag in product.tags"
              :key="tag.id"
              :style="{ backgroundColor: tag.color, color: 'white' }"
              size="small"
              effect="plain"
              class="capitalize"
            >
              {{ tag.name }}
            </el-tag>
          </div>

          <h2 class="font-semibold text-lg text-gray-800 line-clamp-2 h-[60px]">
            {{ product.title }}
          </h2>
          <p class="text-sm text-gray-500">{{ $t('home.size') }} : {{ product.volume ?? 0 }} {{ $t('home.ml') }}</p>

          <!-- Price and Final Price -->
          <p class="text-gray-500" v-if="product.final_price">
            <span class="line-through">&dollar;{{ product.final_price }}</span>
            <span class="ml-2 text-lg text-green-600 font-bold">&dollar;{{ product.final_price }}</span>
          </p>

          <p class="text-lg text-green-600 font-bold" v-else>
            &dollar;{{ product.price }}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Quantity Selector -->
          <div
            class="flex items-center border border-gray-300 rounded overflow-hidden"
          >
            <button
              class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 w-[50]"
              @click="decreaseAmount(product.id)"
              :disabled="getAmount(product.id) <= 1"
            >
              -
            </button>
            <span class="w-12 text-center">{{ getAmount(product.id) }}</span>
            <button
              class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 w-[50]"
              @click="increaseAmount(product.id)"
              :disabled="getAmount(product.id) >= 10"
            >
              +
            </button>
          </div>

        <!-- Add to Cart Button -->
        <el-button
          type="primary"
          class="buy-now-btn"
          size="large"
          @click="addToCart(product.id)"
        >
          {{ $t('home.add_to_cart') }}
        </el-button>
      </div>

        <button
          @click="navigateTo('/products/' + product.id)"
          class="w-full bg-cyan-500 text-white text-center py-2 rounded-lg hover:bg-cyan-600 active:bg-cyan-700 transition-colors duration-200 mt-2"
        >
          {{ $t('home.view_details') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWishlistStore } from '~/store/wishlist.js'
import { ElMessage } from 'element-plus'
import { useCookies } from 'vue3-cookies'
import { useCartStore } from '~/store/cart.js'
const cartStore = useCartStore()
// Store quantities per product
const productQuantities = ref({})

// Get the amount of a specific product
const getAmount = (productId) => {
  return productQuantities.value[productId] || 1
}

// Increase the quantity of a specific product
const increaseAmount = (productId) => {
  if (getAmount(productId) < 10) {
    productQuantities.value[productId] = getAmount(productId) + 1
  }
}

// Decrease the quantity of a specific product
const decreaseAmount = (productId) => {
  if (getAmount(productId) > 1) {
    productQuantities.value[productId] = getAmount(productId) - 1
  }
}

const addToCart = async (productId) => {
  try {
    const params = {
      product: productId, // Pass the product ID
      count: getAmount(productId), // Pass the unique quantity
    }
    console.log('Adding to cart with params:', params)

    // Call the cartStore's addCart method (action)
    const response = await cartStore.addCart(params)

    // Log the updated cart state or API response
    console.log('Cart updated:', response)
    ElMessage.success('Product added to cart successfully')
    return response
  } catch (error) {
    console.error('Failed to add product to cart:', error.message)
    ElMessage.error(`Failed to add product to cart: ${error.message}`)
  }
}

defineProps({
  products: {
    type: Array,
    required: true,
  },
})
const { cookies } = useCookies()
const wishlistStore = useWishlistStore()
const wishlist = ref([])

// Toggle wishlist status
const toggleWishlist = async (productId) => {
  const token = cookies.get('access_token')
  if (!token) {
    navigateTo('/sign-in')
    ElMessage.error('Please login to add to wishlist')
    return
  }
  try {
    if (isInWishlist(productId)) {
      await wishlistStore.deleteWishlist(productId)
      wishlist.value = wishlist.value.filter((item) => item.id !== productId)
    } else {
      await wishlistStore.addWishlist(productId)
      fetchWishlist()
    }
  } catch (error) {
    ElMessage.error(error.message)
  }
}

const fetchWishlist = async (param) => {
  try {
    const data = await wishlistStore.getWishlist(param)
    wishlist.value = data.products
  } catch (error) {
    ElMessage.error('Failed to fetch wishlist')
  }
}

// Check if a product is in the wishlist
const isInWishlist = (productId) => {
  const ids = wishlist.value.map((item) => item.id)
  return ids.includes(productId)
}

const formattedProductType = (product_type) => {
  if (!product_type) return ''
  return product_type
    .replace(/_/g, ' ') // Replace underscores with spaces
    .toLowerCase() // Ensure it's in lowercase
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}
// On component mounted, fetch the wishlist
onMounted(() => {
  const token = cookies.get('access_token')
  if (!token) {
    return
  }
  fetchWishlist()
})
</script>

<style scoped>
/* Additional hover and transition effects */
button {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

button:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Wishlist icon styles */
svg {
  transition:
    color 0.2s ease,
    /* Smooth color transition */ transform 0.2s ease; /* Smooth transform (scale) transition */
}

svg:hover {
  transform: scale(1.1);
}
</style>
