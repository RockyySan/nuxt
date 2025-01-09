<template>
  <div class="container flex justify-center items-center" style="height: 100vh">
    <div class="Register-body">
      <div class="other-information">
        <img src="/images/rumdulLogo.png" alt="Rumdul Logo" />
        <h1>Welcome to Rumdul sign Up</h1>
      </div>
      <div class="Register-form">
        <h1 class="text-2xl font-bold mb-6 text-center">Sign Up here!</h1>
        <el-form
          :model="registerForm"
          :rules="rules"
          ref="registerFormRef"
          label-position="top"
        >
          <el-form-item label="Full Name" prop="fullName">
            <el-input
              v-model="registerForm.fullName"
              placeholder="Enter your full name"
            ></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input
              v-model="registerForm.email"
              type="email"
              placeholder="Enter your email"
            ></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="Enter your password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password" prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="Confirm your password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="container flex justify-center items-center">
              <el-button class="register-button" @click="handleRegister">
                Register
              </el-button>
            </div>
          </el-form-item>
        </el-form>
        <div class="text-center my-4 text-gray-500">or register with</div>
        <div class="google-register">
          <button
            class="button-google flex justify-center items-center gap-2"
            @click="handleGoogleSignUp"
          >
            <img
              src="/images/google.jpg"
              class="google-icon-image"
              alt="google image icon"
            />
          </button>
        </div>
        <p class="text-center text-sm mt-4">
          Already have an account?
          <a
            @click="navigateTo('/sign-in')"
            class="text-blue-500 cursor-pointer"
            >Sign In</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '~/store/auth.js'

useSeoMeta({ title: 'Rumdul | Sign Up' })
definePageMeta({
  layout: 'auth',
  middleware: ['redirect-if-authenticated'],
})

const authStore = useAuthStore()

const registerForm = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const rules = {
  fullName: [
    { required: true, message: 'Full name is required', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please enter a valid email address',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    {
      min: 6,
      message: 'Password must be at least 6 characters',
      trigger: 'blur',
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Confirm password is required',
      trigger: 'blur',
    },
    {
      validator: (rule, value) => value === registerForm.password,
      message: 'Passwords do not match',
      trigger: 'blur',
    },
  ],
}

const registerFormRef = ref(null)

const handleRegister = async () => {
  registerFormRef.value.validate(async (valid) => {
    if (valid) {
      await authStore.register({
        name: registerForm.fullName,
        email: registerForm.email,
        password: registerForm.password,
      })
      navigateTo('/')
      ElMessage.success('Registration successful')
    } else {
      ElMessage.error('Please fill in the form correctly')
    }
  })
}

const handleGoogleSignUp = () => {
  ElMessage.info('Redirecting to Google login...');
  // Redirect to the Google login endpoint
  window.location.href = 'https://api.decapsoul.one/auth/google';
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
.other-information h1 {
  position: absolute; /* Positions the text relative to the container */
  bottom: 10%; /* Centers vertically */
  left: 21%; /* Centers horizontally */
  color: #000000; /* Makes the text stand out */
  font-size: 2rem; /* Adjusts text size */
  font-weight: bold; /* Makes the text bold */
  text-align: center; /* Centers text alignment */
  padding: 10px 20px; /* Adds some padding for better readability */
  border-radius: 8px; /* Optional: Adds rounded corners */
  font-family:
    Stencil Std,
    fantasy;
}
.google-icon-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.register-button {
  width: 200px;
  height: 40px;
  border-radius: 20px;
  background: #2ec4b6;
  color: #000;
}
.register-button:hover {
  color: #fff;
  background: #2ec4b6;
}
.google-register {
  width: 100%;
  display: flex;
  justify-content: center;
}
.button-google {
  width: 30px;
}
</style>
