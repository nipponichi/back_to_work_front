<template>
  <nav class="absolute top-0 left-0 w-full p-4 bg-transparent z-50 mt-10">
    <div class="flex justify-between items-center w-full">
      <ul class="grid grid-cols-4 gap-4 absolute left-1/2 transform -translate-x-1/2">
        <li>
          <RouterLink to="/" class="w-32 h-12 flex items-center justify-center text-black bg-gray-100 rounded text-lg font-semibold hover:bg-gray-300">
            🏠 Inicio
          </RouterLink>
        </li>
        <li>
          <button @click="handleAboutClick" class="w-32 h-12 flex items-center justify-center text-black bg-gray-100 rounded text-lg font-semibold hover:bg-gray-300">
            ℹ️ Acerca de
          </button>
        </li>
        <li>
          <RouterLink to="/service" class="w-32 h-12 flex items-center justify-center text-black bg-gray-100 rounded text-lg font-semibold hover:bg-gray-300">
            🛠️ Servicios
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" class="w-32 h-12 flex items-center justify-center text-black bg-gray-100 rounded text-lg font-semibold hover:bg-gray-300">
            📞 Contacto
          </RouterLink>
        </li>
      </ul>

      <div ref="dropdownMenu" class="relative ml-auto mr-10">
        <div @click="toggleDropdown" class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
          <span>
            {{ accessToken ? `👤 ${user.name || "Usuario"} (${userReviews.length})` : "📝 Cuenta" }}
          </span>
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div v-if="isOpen" class="absolute right-0 mt-2 w-60 bg-white shadow-md rounded-lg overflow-hidden no-underline z-50">
          <template v-if="!accessToken">
            <RouterLink to="/login" class="block px-4 py-2 text-gray-700 hover:bg-gray-200 no-underline" @click="closeDropdown">
              🔑 Iniciar Sesión
            </RouterLink>
            <RouterLink to="/register" class="block px-4 py-2 text-gray-700 hover:bg-gray-200 no-underline" @click="closeDropdown">
              📝 Registrarse
            </RouterLink>
          </template>

          <template v-else>
            <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">
              🚪 Cerrar Sesión
            </button>
            <hr />
            <button @click="fetchUserReviews" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">
              ⭐ Ver mis valoraciones
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Mostrar las valoraciones -->
    <div v-if="showReviews" class="absolute right-10 top-full mt-4 w-96 bg-white shadow-lg rounded-lg p-4 z-40 max-h-96 overflow-y-auto">
      <h3 class="text-lg font-bold mb-2">Mis valoraciones</h3>
      <ul v-if="userReviews.length">
        <li v-for="review in userReviews" :key="review.id" class="mb-2 p-2 border rounded">
          <strong>Anuncio:</strong> {{ review.ad?.title || 'Sin título' }}<br />
          <strong>Valoración:</strong> {{ review.customer_care }} ⭐<br />
          <strong>Comentario:</strong> {{ review.review }}
        </li>
      </ul>
      <p v-else>No tienes valoraciones todavía.</p>
      <button @click="showReviews = false" class="mt-2 text-blue-600 underline">Cerrar</button>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import AuthService from "../services/api/auth.service";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      isOpen: false,
      accessToken: null,
      user: {},  // objeto, no string
      toast: useToast(),
      userReviews: [],
      showReviews: false,
    };
  },
  mounted() {
    this.accessToken = localStorage.getItem("token");
    let userStr = localStorage.getItem("user");
    this.user = JSON.parse(userStr || "{}");
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  watch: {
    "$route"() {
      this.accessToken = localStorage.getItem("token");
      let userStr = localStorage.getItem("user");
      this.user = JSON.parse(userStr || "{}");
    },
    accessToken() {
      this.accessToken = localStorage.getItem("token");
      let userStr = localStorage.getItem("user");
      this.user = JSON.parse(userStr || "{}");
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    handleClickOutside(event) {
      if (this.$refs.dropdownMenu && !this.$refs.dropdownMenu.contains(event.target)) {
        this.isOpen = false;
      }
    },
    closeDropdown() {
      this.isOpen = false;
    },
    async logout() {
      const response = await AuthService.logout(this.accessToken);
      if (response.data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.accessToken = null;
        this.user = {};
        this.$router.push("/login");
        this.toast.success("Logout exitoso");
      } else {
        this.toast.error("Error al cerrar sesión");
      }
    },
    handleAboutClick() {
      if (this.user && this.user.is_admin) {
        this.$router.push("/about");
      } else {
        this.toast.error("Acceso denegado: Solo administradores.");
      }
    },
    async fetchUserReviews() {
      console.log("👉 fetchUserReviews llamado");
     
     

      try {
        const token = localStorage.getItem('token'); 
        console.log("📦 Token usado:", token);
        const response = await axios.get("http://localhost:8000/api/getStats", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

        console.log("✅ Respuesta recibida:", response.data);

        if (response.data.success) {
          this.userReviews = response.data.data;
          this.showReviews = true;
        } else {
          this.toast.error("No se pudieron obtener las valoraciones.");
        }
      } catch (error) {
        console.error("❌ Error en llamada a http://localhost:8000/api/getStats:", error);
        this.toast.error("No se pudieron obtener las valoraciones.");
      }
    },
  },
};
</script>
