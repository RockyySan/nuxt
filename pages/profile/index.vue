<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-center mb-6">Profile</h1>

    <!-- Profile Section -->
    <div v-if="user" class="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
      <img
        :src="user.image"
        alt="Profile Image"
        class="w-32 h-32 rounded-full object-cover mb-4"
      />
      <h2 class="text-xl font-semibold">{{ user.name }}</h2>
      <p class="text-gray-600">{{ user.email }}</p>
      <p class="text-gray-600">{{ user.mobile }}</p>
      <p class="text-gray-600">Age: {{ user.age }}</p>

      <!-- Edit/Update Profile -->
      <div class="mt-6 w-full">
        <button
          @click="toggleEditMode"
          class="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          {{ editMode ? 'Cancel Edit' : 'Edit Profile' }}
        </button>

        <div v-if="editMode" class="mt-4">
          <h3 class="text-lg font-semibold mb-2">Update Profile</h3>
          <form @submit.prevent="handleUpdate">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input
                v-model="userForm.name"
                type="text"
                id="name"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <div class="mb-4">
              <label for="mobile" class="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                v-model="userForm.mobile"
                type="text"
                id="mobile"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Enter your mobile"
              />
            </div>
            <div class="mb-4">
              <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
              <input
                v-model="userForm.age"
                type="number"
                id="age"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Enter your age"
              />
            </div>
            <div class="mb-4">
              <label for="image" class="block text-sm font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                @change="handleImageUpload"
                id="image"
                accept="image/*"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>

      <!-- Update Password Section -->
      <div class="mt-6 w-full">
        <button
          @click="togglePasswordEditMode"
          class="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          {{ passwordEditMode ? 'Cancel Password Edit' : 'Change Password' }}
        </button>

        <div v-if="passwordEditMode" class="mt-4">
          <h3 class="text-lg font-semibold mb-2">Change Password</h3>
          <form @submit.prevent="handleUpdatePassword">
            <div class="mb-4">
              <label for="oldPassword" class="block text-sm font-medium text-gray-700">Old Password</label>
              <input
                v-model="updatePasswordForm.oldPassword"
                type="password"
                id="oldPassword"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Enter old password"
              />
            </div>
            <div class="mb-4">
              <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
              <input
                v-model="updatePasswordForm.newPassword"
                type="password"
                id="newPassword"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Enter new password"
              />
            </div>
            <div class="mb-4">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                v-model="updatePasswordForm.confirmPassword"
                type="password"
                id="confirmPassword"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="Confirm new password"
              />
            </div>
            <button
              type="submit"
              class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>

      <!-- Logout Button -->
      <div class="mt-6 w-full">
        <button
          @click="handleLogout"
          class="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else>
      <p class="text-center text-red-500">Loading profile...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/store/auth.js';
import { ElMessage } from 'element-plus';

definePageMeta({ layout: 'homepage' });

const authStore = useAuthStore();
const user = ref(null);
const userForm = ref({
  name: '',
  mobile: '',
  age: '',
  image: null,
});

const updatePasswordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const editMode = ref(false); // Controls if the user is in edit mode
const passwordEditMode = ref(false); // Controls if the user is editing password

// Fetch user profile
const fetchProfile = async () => {
  try {
    const data = await authStore.getProfile();
    user.value = data;
    userForm.value.name = data.name;
    userForm.value.mobile = data.mobile;
    userForm.value.age = data.age;
    userForm.value.image = null; // reset image on fetch
  } catch (error) {
    ElMessage.error('Failed to fetch profile');
  }
};

// Handle profile update
const handleUpdate = async () => {
  const formData = new FormData();
  formData.append('name', userForm.value.name);
  formData.append('mobile', userForm.value.mobile);
  formData.append('age', userForm.value.age);
  formData.append('image', userForm.value.image);

  const response = await authStore.editProfile(formData);
  if (response) {
    ElMessage.success('Profile updated successfully');
    fetchProfile();
    toggleEditMode();
  } else {
    ElMessage.error('Failed to update profile');
  }
};

const handleLogout = async () => {
  await authStore.logout();
  navigateTo('/sign-in');
};

// Handle update password
const handleUpdatePassword = async () => {
  const response = await authStore.updatePassword({
    old_password: updatePasswordForm.value.oldPassword,
    password: updatePasswordForm.value.newPassword,
    password_confirmation: updatePasswordForm.value.confirmPassword,
  });
  if (response) {
    ElMessage.success('Password updated successfully');
    togglePasswordEditMode();
  } else {
    ElMessage.error('Failed to update password');
  }
};

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    userForm.value.image = file;
  }
};

// Toggle edit mode
const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

// Toggle password edit mode
const togglePasswordEditMode = () => {
  passwordEditMode.value = !passwordEditMode.value;
};

onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
.container {
  max-width: 400px;
}
</style>
