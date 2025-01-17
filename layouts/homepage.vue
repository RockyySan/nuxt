<template>
  <div class="layout">
    <!-- Header -->
    <header>
      <HeaderMenu :isLogin="isLogin" />
    </header>
    <!-- Menu bar -->
    <el-affix :offset="100">
      <nav class="bg-gray-100">
        <div class="menu container mx-auto">
          <ul class="flex items-center space-x-16 p-4">
            <MenuBar />
          </ul>
        </div>
      </nav>
    </el-affix>
    <!-- Page Content -->
    <main class="container mx-auto py-8 ">
      <slot />
    </main>
    <Footer />
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

<style scoped>
/* Full-height layout */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
}

main {
  flex-grow: 1; /* Allow main content to grow and take available space */
}
/* Navigation Links */
ul {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
}

li a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

li a:hover {
  color: #3b82f6;
}
.menu {
  display: flex;
  justify-content: center;
}
</style>
