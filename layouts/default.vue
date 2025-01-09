<template>
  <div>
    <!-- Header -->
    <header>
      <HeaderMenu :isLogin="isLogin"/>
    </header>

    <!-- Page Content -->
    <main class="container mx-auto py-8">
      <slot />
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const isLogin = ref(false)
const { value: token } = useCookie('access_token')

const checkUserLoginStatus = async () => {
  isLogin.value = !!token;
}

onMounted(() => {
  checkUserLoginStatus()
})
</script>


