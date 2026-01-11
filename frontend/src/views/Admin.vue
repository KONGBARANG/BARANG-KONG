<template>
  <div class="admin">
    <h1>Admin Page</h1>
    <p>ទិន្នន័យពី Server: {{ backendData }}</p>
    <router-link to="/">
       <button>Go to Home</button>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const backendData = ref('កំពុងទាញទិន្នន័យ...');

onMounted(async () => {
  try {
    // ហៅទៅកាន់ API ដែលអ្នកបានបង្កើតក្នុង server.js
    const response = await axios.get('http://localhost:5000/api/data');
    backendData.value = response.data.message;
  } catch (error) {
    backendData.value = "មិនអាចភ្ជាប់ទៅ Server បានទេ!";
    console.error(error);
  }
});
</script>