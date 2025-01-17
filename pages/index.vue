<template>
  <div class="container flex flex-col items-center justify-center gap-y-8">
    <Banner />
    <CategoryContent />
    <LatestProduct />
    <Discounted />
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Rumdul' })
definePageMeta({ layout: 'homepage' })
</script>