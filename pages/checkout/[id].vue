<template>
  <h1 class="text-2xl font-bold mb-4">Checkout Payment</h1>
  <div class="flex flex-row justify-between gap-8 p-4">
    <div class="flex flex-col w-[1000px]">
      <!-- Delivery Address Section -->
      <div class="mb-4 border border-gray-200 h-[100px] p-4 rounded flex items-center justify-between">
        <span class="font-bold">Pickup information:</span>
        <div v-if="info.phone && info.address">
          <p>{{ info.phone }}</p>
          <p>{{ info.address }}</p>
        </div>
        <div v-else>
          <el-button @click="showPopup = true" type="primary">Add Address</el-button>
        </div>
      </div>

      <!-- Address Popup -->
      <el-dialog
        v-model="showPopup"
        title="Enter Delivery Address"
        width="400px"
        :before-close="handleClose"
      >
        <el-form :model="info" ref="addressForm" label-width="120px">
          <el-form-item label="Phone Number" prop="phone" :rules="[{ required: true, message: 'Please enter your phone number', trigger: 'blur' }]">
            <el-input v-model="info.phone" placeholder="Enter your phone number" clearable />
          </el-form-item>
          <el-form-item label="Address" prop="address" :rules="[{ required: true, message: 'Please enter your address', trigger: 'blur' }]">
            <el-input v-model="info.address" placeholder="Enter your address" clearable />
          </el-form-item>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showPopup = false">Cancel</el-button>
            <el-button type="primary" @click="handleSaveAddress">Save</el-button>
          </div>
        </el-form>
      </el-dialog>

      <!-- Cart Items -->
      <div v-for="(item, index) in carts" :key="index"   class="mb-8">
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
              <div>
                <el-radio-group v-model="transactionMethod">
                  <el-radio :value="'cod'">Cash</el-radio>
                  <el-radio :value="'paypal'">Paypal</el-radio>
                </el-radio-group>
              </div>
            </div>
            <button v-if="!isProcessing" @click="handleBuy" class="bg-primary text-white p-2 mt-4 rounded hover:bg-primary opacity-80">Buy</button>
            <div class="flex w-20">
              <div v-if="isProcessing" id="paypal-checkout"></div>
            </div>
            <el-dialog
              v-model="showPaymentPopup"
              title="Order Complete"
              width="40%"
              :close-on-click-modal="false"
              :close-on-press-escape="false"
              :show-close="false"
              class="flex flex-col items-center justify-center"
            >
              <div class="fixed inset-0 flex items-center justify-center bg-gray-100">
                <div class="flex flex-col justify-center items-center w-[300px] h-[200px] bg-white rounded shadow-lg p-6">
                  <div class="icon border border-green-200 w-[50px] h-[50px] flex justify-center items-center rounded-full">
                    <i class="fa-solid fa-check text-green-500 text-xl"></i>
                  </div>
                  <p class="text-green-500 text-2xl font-bold mb-4 text-center">
                    Payment completed successfully!
                  </p>
                  <button
                    class=" text-white bg-primary py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                    @click="handleClosePopup">
                    OK
                  </button>
                </div>
              </div>
            </el-dialog>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { useCartStore } from '@/store/cart';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'; // Assuming you're using Vue Router
const route = useRoute(); // Get the current route

const showPopup = ref(false);
const cartStore = useCartStore();
const { buyCart, getCart, checkout } = cartStore;
const carts = ref([]);
const checkoutData = ref([]);
const isProcessing = ref(false);
const paymentDetails = ref(null);
const showPaymentPopup = ref(false); // Popup state
const transactionMethod = ref(''); // Bind to radio group for payment method
const info = ref({
  phone: '',
  address: ''
});
const router = useRouter(); // Define the router
const vendorId = ref(route.params.id);

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

//checkout
const handleCheckout = async (id) => {
  try {
    console.log(id)
    const params = {
      vendor_id: id, // Static vendor_id for now
    };
    const data = await checkout(params);
    checkoutData.value = data;
    console.log(data.data)
  } catch (error) {
    ElMessage.error('Failed to fetch cart data. Please try again.');
    console.error('Error fetching cart data:', error);
  }
}

const handleBuy = async () => {
  // Validate address and phone
  if (!info.value.phone || !info.value.address) {
    ElMessage.error('Please provide a valid phone number and address.');
    return;
  }

  // Check transaction method
  if (!transactionMethod.value) {
    ElMessage.error('Please select a payment method.');
    return;
  }

  // Handle PayPal transaction
  if (transactionMethod.value === 'paypal') {
    await showPaypal();
    return;
  }

  // Handle Cash on Delivery (COD)
  if (transactionMethod.value === 'cod') {
    try {
      const details = {
        vendor_id: route.params.id,
        transaction_method: transactionMethod.value,
        transaction_id: null,
        amount: checkoutData.value?.amount,
        address: info.value.address,
        phone: info.value.phone,
      };
      await buy(details);
      ElMessage.success('Order placed successfully!');
    } catch (error) {
      console.error('Error during COD:', error);
      ElMessage.error('Failed to place the order.');
    }
  }
};


// Show PayPal button
const showPaypal = async () => {


  isProcessing.value = true;
  await nextTick(); // Wait until the DOM updates
  const paypalElement = document.getElementById('paypal-checkout');
  if (!paypalElement) {
    ElMessage.error('PayPal button container not found');
    isProcessing.value = false;
    return;
  }
  console.log(checkoutData.value?.amount);
  usePaypalButton({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: checkoutData.value?.amount || '0',
            },
          },
        ],
      });
    },
    onApprove: async (data, actions) => {
      try {
        const details = await actions.order.capture();
        paymentDetails.value = details;
        console.log('Payment completed successfully:', details);
        showPaymentPopup.value = true; // Show popup on success
        const data = {
          vendor_id: route.params.id,
          transaction_method: transactionMethod.value,
          transaction_id: details.id,
          amount: checkoutData.value?.amount,
          address: info.value.address,
          phone: info.value.phone,
        };
        await buy(data);
      } catch (error) {
        console.error('Error capturing payment:', error);
        ElMessage.error('Payment failed');
      } finally {
        isProcessing.value = false;
      }
    },
    onError: (error) => {
      console.error('Error during PayPal process:', error);
      ElMessage.error('PayPal process encountered an error');
      isProcessing.value = false;
    },
  });
};

const buy = async (details) => {
  try {
    const params = {
      vendor_id: details.vendor_id,
      transaction_method: details.transaction_method,
      transaction_id: details.transaction_id,
      amount: details.amount,
      address: details.address,
      phone: details.phone,
    };
    const cartList = await buyCart(params);
    console.log('Cart after purchase:', cartList);
    fetchCartData();
    router.push('/order');
    ElMessage.success('Purchase successful');
  } catch (error) {
    ElMessage.error('Failed to complete purchase');
  }
};

// Handle saving address
const handleSaveAddress = () => {
  showPopup.value = false;
};

// Handle closing the popup
const handleClose = () => {
  showPopup.value = false;
};

const handleClosePopup = () => {
  showPaymentPopup.value = false; // Close the popup
  router.push('/order'); // Use Vue Router's push method
};

// Fetch cart data on component mount
onMounted(async () => {
  const id = route.params.id; // Access the 'id' parameter
  vendorId.value = id;
  await handleCheckout(id);

  await fetchCartData();
});
</script>
