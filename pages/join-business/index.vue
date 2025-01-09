<template>
  <div class="container flex justify-center items-center" style="height: 100vh">
    <div class="Register-body">
      <div class="other-information">
        <img src="/images/RUMDULBUSINESS.jpg" alt="Rumdul Logo" />
      </div>
      <div class="Register-form">
        <h1 class="text-3xl font-bold text-center mb-6">
          Join Our Business Platform
        </h1>
        <el-form
          ref="businessFormRef"
          :model="businessForm"
          :rules="rules"
          label-width="120px"
          class="business-form"
        >
          <!-- Name -->
          <el-form-item label="Name" prop="name">
            <el-input
              v-model="businessForm.name"
              placeholder="Enter your business name"
            />
          </el-form-item>

          <!-- Slug -->
          <el-form-item label="Slug" prop="slug">
            <el-input
              v-model="businessForm.slug"
              placeholder="Enter a unique slug for your business"
            />
          </el-form-item>

          <!-- Address -->
          <el-form-item label="Address" prop="address">
            <el-input
              v-model="businessForm.address"
              placeholder="Enter your business address"
            />
          </el-form-item>

          <!-- Description -->
          <el-form-item label="Description" prop="description">
            <el-input
              type="textarea"
              v-model="businessForm.description"
              placeholder="Write a short description of your business"
            />
          </el-form-item>

          <!-- Purpose -->
          <el-form-item label="Purpose" prop="purpose">
            <el-input
              type="textarea"
              v-model="businessForm.purpose"
              placeholder="Describe your business purpose"
            />
          </el-form-item>

          <!-- Email -->
          <el-form-item label="Email" prop="email">
            <el-input
              v-model="businessForm.email"
              placeholder="Enter your email"
            />
          </el-form-item>

          <!-- Submit Button -->
          <el-form-item>
            <el-button   class="submit-button" @click="handleSubmit">Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSeoMeta } from 'nuxt/app'
import { ElMessage } from 'element-plus'

// Page Metadata
useSeoMeta({ title: 'Rumdul | Join Business' })
definePageMeta({ layout: 'auth' })

import { useRequestVendorStore } from '~/store/request.js'
const requestVendorStore = useRequestVendorStore()

// Form Data and Rules
const businessForm = ref({
  name: '',
  slug: '',
  address: '',
  description: '',
  purpose: '',
  email: '',
})

const rules = {
  name: [
    {
      required: true,
      message: 'Please enter your business name',
      trigger: 'blur',
    },
  ],
  slug: [
    { required: true, message: 'Please enter a unique slug', trigger: 'blur' },
  ],
  address: [
    {
      required: true,
      message: 'Please enter your business address',
      trigger: 'blur',
    },
  ],
  description: [
    {
      required: true,
      message: 'Please provide a description',
      trigger: 'blur',
    },
  ],
  purpose: [
    { required: true, message: 'Please specify your purpose', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' },
  ],
}

// Define the form reference
const businessFormRef = ref(null)

// Handle Submit
const handleSubmit = () => {
  if (!businessFormRef.value) return; // Ensure the form ref exists
  businessFormRef.value.validate(async (valid) => {
    if (valid) {
      ElMessage.success('Business registration submitted successfully!')
      // Add submission logic here (e.g., API call)
      await requestVendorStore.requestVendor({
        name: businessForm.value.name,
        slug: businessForm.value.slug,
        address: businessForm.value.address,
        description: businessForm.value.description,
        purpose: businessForm.value.purpose,
        email: businessForm.value.email,
      })
      navigateTo('/')
      ElMessage.success('Registration successful')
    } else {
      ElMessage.error('Please fill in the form correctly.')
    }
  })
}
</script>

<style scoped>
.Register-body {
  width: 1200px;
  height: 90vh;
  display: flex;
  /* background: #9c0707; */
  -webkit-box-shadow: 17px 37px 51px 0px rgba(0, 0, 0, 0.31);
  -moz-box-shadow: 17px 37px 51px 0px rgba(0, 0, 0, 0.31);
  box-shadow: 17px 37px 51px 0px rgba(0, 0, 0, 0.31);
}
.Register-form {
  width: 40%;
  height: 100%;
  padding: 2rem;
  /* max-width: 29rem; */
  background: #efeff3;
  border: 2px solid #fff;
  /* border-top-right-radius: 10px; */
  /* border-bottom-right-radius: 10px; */
}
.other-information {
  width: 60%;
  height: 100%;
  background-color: #efeff3;
  position: relative;
  display: inline-block;
}
.other-information img {
  display: block; /* Ensures no gap below the image */
  width: 100%; /* Makes the image responsive */
  height: 100%;
}

.submit-button {
  width: 200px;
  height: 40px;
  border-radius: 20px;
  background: #2ec4b6;
  color: #000;
}
.submit-button:hover {
  color: #fff;
  background: #2ec4b6;
}
.join-business-container {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.business-form {
  display: flex;
  flex-direction: column;
}
.el-form-item {
  margin-bottom: 1.5rem;
}
</style>
