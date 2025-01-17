<script setup>
import { useAuthStore } from '~/store/auth.js'
import { ElMessage, ElLoading } from 'element-plus'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

useSeoMeta({ title: 'Rumdul | Reset Password' })
definePageMeta({
  middleware: ['redirect-if-authenticated'],
})

const authStore = useAuthStore()
const resetForm = reactive({
  email: '',
})

const router = useRouter()

// Handle password reset
const handleReset = async () => {
  // Start loading indicator
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: 'Sending password reset link...',
  })

  const data = {
    email: resetForm.email,
  }

  try {
    // Attempt to reset the password
    const respond = await authStore.resetPassword(data)

    // Success message
    ElMessage.success('Password reset link sent to your email')
    loadingInstance.close()

    // Navigate to the homepage
    navigateTo('/sign-in')
  } catch (error) {
    // Handle error
    loadingInstance.close()
    ElMessage.error('Failed to send reset link')
  }
}

// Validation rules for the form
const rules = {
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please enter a valid email address',
      trigger: 'blur',
    },
  ],
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-white">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-3xl font-semibold text-center text-gray-700 mb-6">Reset Password</h2>

      <!-- Reset Password Form -->
      <el-form :model="resetForm" :rules="rules" ref="formRef">
        <el-form-item label="Email" prop="email">
          <el-input
            v-model="resetForm.email"
            placeholder="Enter your email"
            class="rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></el-input>
        </el-form-item>

        <!-- Reset Password Button -->
        <div class="mt-6">
          <el-button
            class="w-full py-3 rounded-md bg-blue-600 text-white text-lg transition duration-300 ease-in-out"
            @click="handleReset"
          >
            Reset Password
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for the container */
.reset-password-container {
  background-image: linear-gradient(to top right, #ffffff, #ffffff);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-form-item {
  margin-bottom: 1.5rem;
}

.el-input {
  border-radius: 8px;
}

.el-button {
  transition: all 0.3s ease;
}

.el-button:hover {
  background-color: #ffffff; /* Darker blue */
}
</style>
