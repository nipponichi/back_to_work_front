<template>
  <nav class="absolute top-0 left-0 w-full p-4 bg-transparent z-50">
    <div class="flex justify-between items-center w-full">

      <ul class="grid grid-cols-4 gap-4 absolute left-1/2 transform -translate-x-1/2">
        <li>
          <RouterLink to="/" class="block w-32 h-12 flex items-center justify-center text-black bg-gray-100 rounded text-lg font-semibold hover:bg-gray-300">
            🏠 Inicio
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="block w-32 h-12 flex items-center justify-center text-black bg-gray-100 rounded text-lg font-semibold hover:bg-gray-300">
            ℹ️ Acerca de
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/service" class="block w-32 h-12 flex items-center justify-center text-black bg-gray-100 rounded text-lg font-semibold hover:bg-gray-300">
            🛠️ Servicios
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" class="block w-32 h-12 flex items-center justify-center text-black bg-gray-100 rounded text-lg font-semibold hover:bg-gray-300">
            📞 Contacto
          </RouterLink>
        </li>
      </ul>
      
      <div ref="dropdownMenu" class="relative ml-auto">
        <div @click="toggleDropdown" class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
          {{ accessToken ? `👤 ${userName || "Usuario"}` : "📝 Cuenta" }}
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

        <div v-if="isOpen" class="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg overflow-hidden">
          <template v-if="!accessToken">
            <RouterLink to="/login" class="block px-4 py-2 text-gray-700 hover:bg-gray-200" @click="closeDropdown">
              🔑 Iniciar Sesión
            </RouterLink>
            <RouterLink to="/register" class="block px-4 py-2 text-gray-700 hover:bg-gray-200" @click="closeDropdown">
              📝 Registrarse
            </RouterLink>
          </template>

          <template v-else>
            <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">
              🚪 Cerrar Sesión
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const isOpen = ref(false);
const accessToken = ref(null);
const userName = ref("");
const router = useRouter();
const dropdownMenu = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};


const handleClickOutside = (event) => {
  if (dropdownMenu.value && !dropdownMenu.value.contains(event.target)) {
    isOpen.value = false;
  }
};

const closeDropdown = () => {
  isOpen.value = false;
};

const logout = async () => {
  const response = await axios.post("http://127.0.0.1:8001/api/logout", {}, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`
    }
  });
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  accessToken.value = null;
  userName.value = "";
  router.push("/login");
};

onMounted(() => {
  accessToken.value = localStorage.getItem("token");
  userName.value = localStorage.getItem("user");

  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(() => router.currentRoute.value, () => {
  accessToken.value = localStorage.getItem("token");
  userName.value = localStorage.getItem("user");
});

watchEffect(() => {
  accessToken.value = localStorage.getItem("token");
  userName.value = localStorage.getItem("user");
});
</script>
