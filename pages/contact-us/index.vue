<template>
  <section class="contact-us space-y-12 p-8 mx-auto max-w-4xl bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg">
    <!-- Page Header -->
    <el-card shadow="hover">
      <h1 class="text-center text-4xl font-bold text-blue-700 animate-bounce">
        Contact Us
      </h1>
      <p class="text-lg text-gray-700 leading-relaxed mt-6">
        Have questions, feedback, or need assistance? We're here to help! Feel free to get in touch with us through the form below or use the provided contact details.
      </p>
    </el-card>

    <!-- Contact Details Section -->
    <el-card shadow="hover">
      <h2 class="text-2xl font-bold text-purple-700 mb-4">Our Contact Information</h2>
      <ul class="space-y-4 text-gray-700">
        <li>
          <el-icon class="mr-2 text-blue-600">
            <el-icon-phone />
          </el-icon>
          <strong>Phone:</strong> +855 123 456 789
        </li>
        <li>
          <el-icon class="mr-2 text-blue-600">
            <el-icon-message />
          </el-icon>
          <strong>Email:</strong> support@rumdol.store
        </li>
        <li>
          <el-icon class="mr-2 text-blue-600">
            <el-icon-location />
          </el-icon>
          <strong>Address:</strong> Royal University of Phnom Penh, Phnom Penh, Cambodia
        </li>
      </ul>
    </el-card>
  </section>
</template>

<script setup>
useSeoMeta({ title: 'Contact Us' });
definePageMeta({ layout: 'homepage' });
</script>

<style scoped></style>
