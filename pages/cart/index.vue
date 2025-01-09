<template>
  <h1 class="text-2xl font-bold mb-4">Your Shopping Cart</h1>
  <div class="flex flex-row justify-between gap-8 p-4">
    <div class="flex flex-col w-[1000px]">
      <!-- Shopping Cart Section -->
      <div class="mb-4 border border-gray-200 h-[100px] p-4 rounded flex items-center justify-between">
        <span class="font-bold">Delivery Address:</span>
        <!-- Display the address if it exists, otherwise show the "Add Address" button -->
        <div v-if="address.phone && address.city && address.state && address.country && address.postalId">
          <p>{{ address.city }}, {{ address.state }}, {{ address.country }}</p>
        </div>
        <div v-else>
          <el-button @click="showPopup = true" type="primary">
            Add Address
          </el-button>
        </div>
      </div>

      <!-- Address Popup -->
      <el-dialog
        v-model="showPopup"
        title="Enter Delivery Address"
        width="400px"
        :before-close="handleClose">
        <el-form :model="address" ref="addressForm" label-width="120px">
          <el-form-item label="Phone Number" prop="phone" :rules="[{ required: true, message: 'Please enter your phone number', trigger: 'blur' }]">
            <el-input
              v-model="address.phone"
              placeholder="Enter your phone number"
              clearable
            />
          </el-form-item>
          <el-form-item label="City" prop="city" :rules="[{ required: true, message: 'Please enter your city', trigger: 'blur' }]">
            <el-input
              v-model="address.city"
              placeholder="Enter your city"
              clearable
            />
          </el-form-item>
          <el-form-item label="State" prop="state" :rules="[{ required: true, message: 'Please enter your state', trigger: 'blur' }]">
            <el-input
              v-model="address.state"
              placeholder="Enter your state"
              clearable
            />
          </el-form-item>

          <el-form-item label="Country" prop="country" :rules="[{ required: true, message: 'Please enter your country', trigger: 'blur' }]">
            <el-input
              v-model="address.country"
              placeholder="Enter your country"
              clearable
            />
          </el-form-item>

          <!-- Action Buttons -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="showPopup = false">Cancel</el-button>
            <el-button type="primary" @click="handleSaveAddress">Save</el-button>
          </div>
        </el-form>
      </el-dialog>


      <div v-if="carts.data" class="border border-gray:10 p-4 rounded h-auto">
        <div class="space-y-4">
          <div v-for="item in carts.data " :key="item.id" class="pb-4 flex items-center justify-between">
            <div class="flex items-center">
              <img :src="item.image" alt="Product Image" class="w-16 h-16 object-cover rounded" />
              <div class="ml-4">
                <p class="font-medium w-[300px]">{{ item.product?.title }}</p>
              </div>
            </div>

            <div class="text-left">
              <div>
                <span>Each: ${{ item.product?.price }}</span>
              </div>
              <div>
                <span>Amount: {{ item.count }}</span>
              </div>
              <div>
                <span>Total: ${{ item.product?.price * item.count }}</span>
              </div>
            </div>
            <button class="text-red-500 hover:text-red-700 ml-4" @click="handleDelete(item.id)">
              <i class="fa-solid fa-trash"></i> Remove
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No items in your cart.</p>
      </div>
    </div>

    <!-- Summary Section -->
    <div class=" w-1/3 bg-gray-100 p-6 rounded shadow" v-if="carts.summary">
      <h1 class="text-xl font-bold mb-4">Summary</h1>
      <ul class="space-y-2">
        <li class="flex justify-between">
          <span>Subtotal:</span>
          <span>{{carts.summary?.subtotal}} $</span>
        </li>
        <li class="flex justify-between">
          <span>Delivery Fee:</span>
          <span>{{carts.summary?.delivery_fee}} $</span>
        </li>
        <li class="flex justify-between font-semibold">
          <span>Estimated Total:</span>
          <span>{{carts.summary?.total}} $</span>
        </li>
      </ul>
      <button class="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600" @click="handleCheckout">
        Check Out
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import {useCartStore} from '~/store/cart.js'

useSeoMeta({ title: 'Rumdul | Cart' });
definePageMeta({ layout: 'default' ,middleware: ['authenticate']})

const cartStore = useCartStore();
const { getCart, buyCart } = cartStore;

const carts = ref([])

// Fetch cart from the store
const fetchCart = async () => {
  try {
    const cartList = await getCart();
    console.log(cartList)
    carts.value = cartList;
    console.log('Cart:', cartList);
  } catch (error) {
    ElMessage.error('Failed to fetch cart')
  }
}

// Handle deletion
const handleDelete = async (id) => {
  try {
    // Call the store function to delete the category
    await cartStore.deleteCart(id)
    ElMessage.success('Cart deleted successfully')
    // Refresh the table data
    await fetchCart()
  } catch (error) {
    ElMessage.error('Failed to delete cart: ' + error.message)
    console.error('Failed to delete cart:', error)
  }
}

//add address
const showPopup = ref(false);
const address = reactive({
  phone: '',
  city: '',
  state: '',
  country: '',

});

// Form validation and save method
const addressForm = ref(null);

const handleSaveAddress = () => {
  addressForm.value.validate((valid) => {
    if (valid) {
      console.log('Address Saved:', address);
      showPopup.value = false; // Close popup after saving
    } else {
      console.log('Form is invalid');
    }
  });
};

const handleClose = (done) => {
  addressForm.value.resetFields(); // Reset the form fields when closing
  done();
};

const handleCheckout = () => {
  navigateTo('/checkout');
}


onMounted(() => {
  fetchCart();
})
</script>
