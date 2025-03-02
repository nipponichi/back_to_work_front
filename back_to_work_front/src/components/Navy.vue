<template>
  <nav class="absolute top-0 left-0 w-full p-4 bg-transparent z-50">
    <div class="flex justify-between items-center w-full">
      <!-- Menú centrado -->
      <ul class="flex space-x-4 absolute left-1/2 transform -translate-x-1/2">
        <li>
          <RouterLink to="/" class="text-white text-lg font-semibold hover:underline">
            🏠 Inicio
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="text-white text-lg font-semibold hover:underline">
            ℹ️ Acerca de
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/service" class="text-white text-lg font-semibold hover:underline">
            🛠️ Servicios
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" class="text-white text-lg font-semibold hover:underline">
            📞 Contacto
          </RouterLink>
        </li>
      </ul>

      <!-- Sección de Cuenta (alineada a la derecha) -->
      <div class="relative ml-auto" ref="dropdownMenu">
        <div @click="toggleDropdown" class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
          📝 Cuenta
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

        <!-- Menú desplegable -->
        <div v-if="isOpen" class="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg overflow-hidden">
          <RouterLink to="/login" class="block px-4 py-2 text-gray-700 hover:bg-gray-200" @click="closeDropdown">
            🔑 Iniciar Sesión
          </RouterLink>
          <RouterLink to="/register" class="block px-4 py-2 text-gray-700 hover:bg-gray-200" @click="closeDropdown">
            📝 Registrarse
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isOpen = ref(false);
const dropdownMenu = ref(null);

// Alternar el menú
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownMenu.value && !dropdownMenu.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
