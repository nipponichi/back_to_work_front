<template>
    <nav v-if="route.path!=='/'" class="bg-gray-800 p-4 min-h-54 flex items-center">
      <ul class="flex space-x-4 list-none">
        <li>
          <RouterLink to="/" class="px-5 py-2.5 flex items-center justify-center text-white bg-transparent hover:bg-transparent rounded-lg text-base font-medium transition-all duration-300 border border-white/20 hover:border-transparent shadow-sm hover:shadow-md backdrop-blur-sm">
            Inicio
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/acerca" class="px-5 py-2.5 flex items-center justify-center text-white bg-transparent hover:bg-transparent rounded-lg text-base font-medium transition-all duration-300 border border-white/20 hover:border-transparent shadow-sm hover:shadow-md backdrop-blur-sm">
            Acerca de
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" class="px-5 py-2.5 flex items-center justify-center text-white bg-transparent hover:bg-transparent rounded-lg text-base font-medium transition-all duration-300 border border-white/20 hover:border-transparent shadow-sm hover:shadow-md backdrop-blur-sm">
            Contacto
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" class="px-5 py-2.5 flex items-center justify-center text-white bg-transparent hover:bg-transparent rounded-lg text-base font-medium transition-all duration-300 border border-white/20 hover:border-transparent shadow-sm hover:shadow-md backdrop-blur-sm">
            Contacto
          </RouterLink>
        </li>
      </ul>
    </nav>
</template>
  
<script setup>
  import { RouterLink, useRoute } from 'vue-router';
  const route = useRoute();
</script>