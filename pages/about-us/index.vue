<template>
  <section class="about-us space-y-12 p-8 mx-auto max-w-4xl bg-gradient-to-r from-indigo-100 to-pink-100 rounded-xl shadow-lg">
    <!-- About Us Section -->
    <el-card shadow="hover">
      <h1 class="text-center text-4xl font-bold text-indigo-700 animate-bounce">
        About Us
      </h1>
      <p class="text-lg text-gray-700 leading-relaxed mt-6">
        Welcome to our <span class="font-semibold text-indigo-600">e-commerce platform</span>, a unique marketplace where multiple vendors come together to offer a wide selection of exquisite perfumes. We are passionate about connecting perfume enthusiasts with trusted sellers, ensuring an easy and reliable shopping experience.
      </p>
    </el-card>

    <!-- Project Context Section -->
    <el-card shadow="hover">
      <el-avatar
        class="block mx-auto mt-4 mb-6"
        size="large"
        icon="el-icon-school"
        color="#67C23A"
      ></el-avatar>
      <p class="text-lg text-gray-700 leading-relaxed">
        This project is part of our Year 3, Semester 1 coursework in the
        <span class="font-semibold text-pink-600">Information Technology Engineering</span>
        Major at the Royal University of Phnom Penh. It reflects our dedication to technology and our drive to simulate real-world solutions for a modern marketplace.
      </p>
    </el-card>

    <!-- Vision Section -->
    <el-card shadow="hover">
      <el-icon class="text-4xl text-indigo-500 animate-spin">
        <el-icon-goods />
      </el-icon>
      <p class="text-lg text-gray-700 leading-relaxed mt-4">
        We hope you enjoy using our website as much as we enjoyed building it.
        This platform allowed us to explore <span class="font-semibold text-pink-600">cutting-edge web technologies</span>, enhance our skills, and provide an innovative solution to everyday needs.
      </p>
      <p class="text-lg text-gray-700 mt-6 font-semibold">
        Thank you for supporting our journey!
      </p>
      <p class="text-center mt-4 text-gray-500">
        — The Team at Royal University of Phnom Penh
      </p>
    </el-card>

    <!-- Project Members Section -->
    <el-card shadow="hover" class="bg-white">
      <h2 class="text-center text-3xl font-bold text-indigo-700 mb-6">
        Meet the Project Members
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Member 1 -->
        <div class="text-center">
          <el-avatar
            size="large"
            src="https://ui-avatars.com/api/?name=La+Seavyong&background=random"
          ></el-avatar>
          <p class="text-lg text-gray-700 font-semibold mt-4">
            La Seavyong
          </p>
          <p class="text-sm text-gray-500 italic">Team Member</p>
        </div>
        <!-- Member 2 -->
        <div class="text-center">
          <el-avatar
            size="large"
            src="https://ui-avatars.com/api/?name=Sony+Lyna&background=random"
          ></el-avatar>
          <p class="text-lg text-gray-700 font-semibold mt-4">
            Sony Lyna
          </p>
          <p class="text-sm text-gray-500 italic">Team Member</p>
        </div>
        <!-- Member 3 -->
        <div class="text-center">
          <el-avatar
            size="large"
            src="https://ui-avatars.com/api/?name=Seng+Pitou&background=random"
          ></el-avatar>
          <p class="text-lg text-gray-700 font-semibold mt-4">
            Seng Pitou
          </p>
          <p class="text-sm text-gray-500 italic">Team Member</p>
        </div>

        <div class="text-center">
          <el-avatar
            size="large"
            src="https://ui-avatars.com/api/?name=Kim+Siveng&background=random"
          ></el-avatar>
          <p class="text-lg text-gray-700 font-semibold mt-4">
            Kim Siveng
          </p>
          <p class="text-sm text-gray-500 italic">Team Member</p>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script setup>
useSeoMeta({ title: 'About Us' });
definePageMeta({ layout: 'homepage' });
</script>

<style scoped>
</style>
