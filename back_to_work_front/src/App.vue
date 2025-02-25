<script setup>
  import {RouterView, RouterLink} from 'vue-router';
  import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <div>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      &nbsp;
      <RouterLink :to="{ name: 'about'}">About</RouterLink>
      &nbsp;
      <RouterLink :to="{ name: 'contact' }">Contact</RouterLink>
    </div>
    <div>
<!--       <HelloWorld msg="Vite + Vue" /> -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
</style>
