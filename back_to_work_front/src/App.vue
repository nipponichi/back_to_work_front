<script setup>
  import {RouterView, RouterLink} from 'vue-router';
  import Navy from './components/Navy.vue'
  import Footer from './components/Footer.vue'
</script>

<template>
  <div>
    <Navy />
    <div>
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
</style>
