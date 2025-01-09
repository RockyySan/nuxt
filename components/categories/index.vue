<template>
    <nav class="category-border py-1">
      <ul class=" flex justify-center space-x-16 ">
        <li v-for="category in categories" :key="category.slug" class="text-black font-semibold hover:text-gray-400">
          <NuxtLink
            :to="`/category/detail/${category.slug}`"
            class="menu-hover">
            {{ category.name }}
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
    font-family:Gill Sans, sans-serif;  
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
  .category-border{
    background: #f59ae0;
  }
  </style>
  