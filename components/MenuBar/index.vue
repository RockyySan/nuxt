<template>
  <nav class="py-1">
    <ul class="flex justify-center space-x-16">
      <li>
        <NuxtLink to="/"
          class="menu-hover">
          Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/promotion"
          class="menu-hover">
          Promotion
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/Products"
          class="menu-hover">
          Products
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/category"
          class="menu-hover">
          Category
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/vendor-list"
          class="menu-hover">
          Store
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about-us"
          class="menu-hover">
          About Us
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contact-us"
          class="menu-hover">
          Contact Us
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import categories from '~/assets/categories.json';
</script>

<style scoped>

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  font-size: 1.1rem;
  font-family:Stencil Std, fantasy;
}
.menu-hover{
  color: #000;
}
.menu-hover:hover{
  padding: 0.25rem 1rem 0.25rem 1rem;
  background: #2ec4b6;
  color: #fff;
  border-radius: 0.25rem;
  transition: 0.2s ease ;
}
</style>
