<script setup>
  import {RouterView, RouterLink} from 'vue-router';
  import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <div>
      <RouterLink to="/">Home</RouterLink>
      &nbsp;
      <RouterLink to="/about">About</RouterLink>
      &nbsp;
      <RouterLink to="/contact">Home</RouterLink>
    </div>
    <div>
<!--       <HelloWorld msg="Vite + Vue" /> -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
</style>
