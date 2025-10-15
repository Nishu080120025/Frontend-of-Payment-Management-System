<template>
  <div id="app" class="app-container">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
/* Global container */
.app-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  color: #333;
  font-family: Arial, sans-serif;
}

/* Main content spacing */
.main-content {
  max-width: 1000px;
  margin: 20px auto;
  padding: 10px;
}

/* Responsive */
@media (max-width: 600px) {
  .main-content {
    margin: 10px;
    padding: 5px;
  }
}
</style>
