<template>
    <div class="max-w-lg mx-auto p-12 bg-white shadow-lg rounded-lg mt-10">
        <AdverFilters />
        <InputText type="text" v-model="text" />
        {{ text }}
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import AdverFilters from '../modals/AdverFilters.vue';
    import InputText from 'primevue/inputtext';
  
    const text = ref('');
  </script>

  