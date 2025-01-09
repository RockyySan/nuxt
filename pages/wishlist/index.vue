<template>
  <div class="container mx-auto">
    <el-table :data="wishlist" class="table-list">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="image" label="" width="190">
        <template #default="scope">
          <img
            :src="scope.row.image"
            alt="Table Image"
            class="w-16 h-16 object-cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="210">
        <template #default="scope">
          <span class="name-text">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Description" width="210">
        <template #default="scope">
          <span class="price-text">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="Price" width="160">
        <template #default="scope">
          <div v-if="scope.row.discount && scope.row.final_price !== null">
            <!-- Original Price -->
            <span class="price-text original-price">{{ scope.row.price }} $</span>
            <!-- Final Price after Discount -->
            <span class="price-text discounted-price ml-2">{{ scope.row.final_price }} $</span>
          </div>
          <div v-else>
            <!-- Show only the original price if no discount -->
            <span class="price-text">{{ scope.row.price }} $</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="category" label="Category" width="200">
        <template #default="scope">
          <span class="price-text">{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Add to Cart" width="100">
        <template #default="scope">
          <Icon name="uil:cart" class="cart-icon" @click="addToCart(scope.row.id, scope.row.price)" />
        </template>
      </el-table-column>
      <el-table-column label="Remove" width="100">
        <template #default="scope">
          <Icon
            name="uil:trash"
            class="remove-icon"
            @click="confirmDelete(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { useCartStore } from '~/store/cart.js'
import { useWishlistStore } from '~/store/wishlist.js'

useSeoMeta({ title: 'Rumdul | Cart' })
definePageMeta({ layout: 'homepage' })
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const wishlist = ref([])
//pagination
const currentPage = ref(1)
const totalPages = ref()

const wishlistStore = useWishlistStore()
const cartStore = useCartStore();


const fetchWishlist = async (param) => {
  try {
    const data = await wishlistStore.getWishlist(param)
    wishlist.value = data.products
    currentPage.value = data.pagination.page_number
    totalPages.value = data.pagination.total_pages
  } catch (error) {
    ElMessage.error('Failed to fetch wishlist')
  }
}

//deleteWishlist
const deleteWishlist = async (id) => {
  try {
    await wishlistStore.deleteWishlist(id)
    fetchWishlist()
    ElMessage.success('Item removed successfully!')
  } catch (error) {
    ElMessage.error('Failed to delete wishlist')
  }
}

// confirmDelete
const confirmDelete = (id) => {
  ElMessageBox.confirm(
    'Are you sure you want to remove this item from your wishlist?',
    'Confirmation',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning',
    },
  )
    .then(() => {
      deleteWishlist(id)
    })
    .catch(() => {
      ElMessage.info('Delete action canceled')
    })
}

const addToCart = async (id, amount) => {
  try {
    const params = {
      product: id, // Pass the product ID from the route
      count: amount, // Pass the quantity
    };
    console.log('Adding to cart with params:', params);

    // Call the cartStore's addCart method (action)
    const response = await cartStore.addCart(params);

    // Log the updated cart state or API response
    console.log('Cart updated:', response);
    ElMessage.success('Product added to cart successfully');
    return response;

  } catch (error) {
    console.error('Failed to add product to cart:', error.message);
    ElMessage.error(`Failed to add product to cart: ${error.message}`);
  }
};

onMounted(() => {
  fetchWishlist()
})
</script>

<style scoped>
.container {
  text-align: start;
}

.table-list {
  width: 100%;
  display: flex;
  justify-content: center;
}

img {
  border-radius: 8px;
}

.name-text {
  color: #000;
  font-weight: bold;
}

.price-text {
  color: #3eae3e;
  font-weight: 400;
}

.cart-icon {
  margin-left: 15px;
  font-size: 1.4rem;
  color: #000;
  cursor: pointer;
}

.cart-icon:hover {
  color: #2ec4b6;
}

.remove-icon {
  margin-left: 15px;
  font-size: 1.4rem;
  color: #000;
  cursor: pointer;
}

.remove-icon:hover {
  color: #db0d0d;
}

.original-price {
  text-decoration: line-through;
  color: red;
}

.discounted-price {
  color: green;
  font-weight: bold;
}

</style>
