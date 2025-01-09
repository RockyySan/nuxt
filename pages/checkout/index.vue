<template>
  <h1 class="text-2xl font-bold mb-4">Your Shopping Cart</h1>
  <div class="container flex flex-row mx-auto py-8">

    <div v-if="carts.data" class="border border-gray:10 p-4 rounded h-auto border-gray-200 space-y-4 mr-2 w-[800px]">

        <div v-for="item in carts.data" :key="item.id" class="pb-4 flex items-center justify-between h-auto">
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
      <div>Total : {{ carts?.summary?.total }}</div>
      <el-button v-if="!isProcessing" type="primary" @click="showPaypal" class="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600">Order</el-button>
      <div class="flex w-20">
        <div v-if="isProcessing" id="paypal-checkout"></div>
      </div>

      <!--
      <p v-if="paymentDetails" class="text-green-500">Payment completed successfully!</p>
      -->
      <!-- Payment Success Dialog -->
      <el-dialog
        v-model="showPaymentPopup"
        title="Order Complete"
        width="40%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        class="flex flex-col items-center justify-center "
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
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { useCartStore } from '~/store/cart.js';
import { ElMessage } from 'element-plus';

useSeoMeta({ title: 'Rumdul | Cart' });
definePageMeta({ layout: 'default' ,middleware: ['authenticate']})//protect from unauthorized

const cartStore = useCartStore();
const { getCart,  buyCart } = cartStore;

const carts = ref([]);
const isProcessing = ref(false);
const paymentDetails = ref(null);
const showPaymentPopup = ref(false); // Popup state

const fetchCart = async () => {
  try {
    const cartList = await getCart();
    carts.value = cartList;
    console.log('Cart:', cartList);
  } catch (error) {
    ElMessage.error('Failed to fetch cart');
  }
};

const showPaypal = async () => {
  isProcessing.value = true;
  await nextTick(); // Wait until the DOM updates
  const paypalElement = document.getElementById('paypal-checkout');
  if (!paypalElement) {
    ElMessage.error('PayPal button container not found');
    isProcessing.value = false;
    return;
  }
  usePaypalButton({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: carts?.value?.summary?.total || '0',
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
        await buy(details);
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
      transaction_method: 'paypal',
      transaction_id: details.id,
      amount: details.purchase_units[0]?.amount?.value,
      address: details.payer?.address?.address_line_1 || 'Unknown Address',
    };
    const cartList = await buyCart(params);
    console.log('Cart after purchase:', cartList);
    fetchCart();
   // ElMessage.success('Purchase successful');
  } catch (error) {
    ElMessage.error('Failed to complete purchase');
  }
};

const handleClosePopup = () => {
  showPaymentPopup.value = false; // Close the popup
  navigateTo('/order')
};
onMounted(() => {
  fetchCart();
});
</script>

<style scope="scss">
.icon{
  border-radius: 50%;

}
</style>
