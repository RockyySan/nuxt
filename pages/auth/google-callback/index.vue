<template>
  <div>
    <p>Logging in...</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useGoogleAuthStore } from '~/store/google.js'
definePageMeta({ layout: 'default'})
const googleAuth = useGoogleAuthStore()
const route = useRoute();

const code = route.query.code;

if (code) {
  try {
    const google = await googleAuth.handleGoogleCallback({
      code: code,
    });
    console.log('Google login successful:', google);
  } catch (error) {
    console.error('Google login failed:', error);
  }
} else {
  console.error('No authorization code found in callback URL.');
}
</script>
