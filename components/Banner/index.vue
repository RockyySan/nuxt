<template>
    <div class="block text-center">
      <!-- <span class="demonstration"></span> -->
      <el-carousel height="400px" arrow="always">
        <!-- Loop over the images fetched dynamically -->
        <el-carousel-item v-for="item in carouselData" :key="item.id" class="slide-image">
          <h3 class="small justify-center" text="2xl">{{ item.title }}</h3>
          <!-- Show image along with title -->
          <img :src="item.src" :alt="item.alt" class="carousel-image"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Reactive variable to store the carousel data
  const carouselData = ref([]);
  
  // Fetch data when the component mounts
  const fetchCarouselData = async () => {
    try {
      const response = await fetch('/data/images.json');
      const data = await response.json();
      carouselData.value = data; // Set the fetched data to carouselData
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    }
  };
  
  // Call fetchCarouselData when the component is mounted
  onMounted(() => {
    fetchCarouselData();
  });
  </script>
  
  <style scoped>
  .block {
    width: 90%;
    height: auto;
  }
  
  .demonstration {
    color: var(--el-text-color-secondary);
  }
  
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }
  
    
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  
  /* Style for the image */
  .carousel-image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  /* Change prev/next button color */
  .el-carousel__prev,
  .el-carousel__next {
    background-color: #5a11ce; /* Change to your desired color */
    color: white; /* Text color */
    border-radius: 50%;
    border: none;
    padding: 10px;
  }
  
  /* Hover effect for prev/next buttons */
  .el-carousel__prev:hover,
  .el-carousel__next:hover {
    background-color: #FF4500; /* Darker shade when hovered */
  }
  
  /* Style for pagination dots */
  .el-carousel__indicator {
    background-color: #bbb; /* Inactive dot color */
  }
  
  .el-carousel__indicator.is-active {
    background-color: #FF6347; /* Active dot color */
  }
  
  /* Optional: Change the size of the dots */
  .el-carousel__indicator {
    width: 12px;
    height: 12px;
    margin: 0 5px;
  }
  
  .el-carousel__indicator.is-active {
    width: 16px;
    height: 16px;
  }
  </style>
  