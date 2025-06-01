<template>
<div class="relative">
  <nav class="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#F4EDE4]/80 via-[#E8DCCB]/80 to-[#D6C9B3]/80 backdrop-blur-lg border-b border-[#D6C9B3]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">

        <div class="flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Logo_Williams_F1.png"
               class="h-10 w-10 mr-3 filter grayscale"
               alt="WeAgree Logo">
          <span class="text-2xl font-bold text-[#7A4E2E]">
            WeAgree
          </span>
        </div>

        <ul class="hidden md:flex space-x-6">
          <li>
            <RouterLink to="/" class="text-[#7A4E2E] hover:text-[#C56E33] transition">
              Inicio
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/service" class="text-[#7A4E2E] hover:text-[#C56E33] transition">
              {{ user?.is_pro ? 'Servicios' : 'Proyectos' }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/contact" class="text-[#7A4E2E] hover:text-[#C56E33] transition">
              Contacto
            </RouterLink>
          </li>
        </ul>

        <div class="flex items-center space-x-3">
          <template v-if="accessToken">
            <RouterLink v-if="user?.is_pro" to="/work"
                        class="hidden md:block bg-[#C56E33] hover:bg-[#A35429] transition px-4 py-2 rounded-full text-white text-sm">
              Mis Trabajos
            </RouterLink>
            <button @click="preferences"
                    class="hidden md:block text-[#7A4E2E] hover:text-[#C56E33] transition font-medium">
              👤 {{ user?.user_name || "Usuario" }}
            </button>
            <button @click="logout"
                    class="hidden md:block px-4 py-2 rounded-full bg-red-400 hover:bg-red-500 text-white text-sm transition">
              Cerrar sesión
            </button>
          </template>

          <template v-else>
            <RouterLink to="/login"
                        class="hidden md:block px-4 py-2 rounded-full bg-[#7A4E2E] hover:bg-[#C56E33] text-white text-sm transition">
              Acceder
            </RouterLink>
          </template>

          <button @click="isMobileMenuOpen = !isMobileMenuOpen"
                  class="text-[#7A4E2E] md:hidden focus:outline-none">
            <svg v-if="!isMobileMenuOpen" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white/90 backdrop-blur-lg rounded-b-lg p-4 space-y-3 border-t border-[#D6C9B3]">
        <RouterLink to="/" class="block text-[#7A4E2E] hover:text-[#C56E33] transition">Inicio</RouterLink>
        <RouterLink to="/service" class="block text-[#7A4E2E] hover:text-[#C56E33] transition">
          {{ user?.is_pro ? 'Servicios' : 'Proyectos' }}
        </RouterLink>
        <RouterLink to="/contact" class="block text-[#7A4E2E] hover:text-[#C56E33] transition">Contacto</RouterLink>

        <template v-if="accessToken">
          <button @click="preferences" class="block w-full text-left px-4 py-2 bg-transparent hover:bg-[#F4EDE4] rounded transition text-[#7A4E2E]">
            👤 {{ user?.user_name || "Usuario" }}
          </button>
          <button @click="logout" class="block w-full text-left px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded transition">
            Cerrar sesión
          </button>
        </template>
        <template v-else>
          <RouterLink to="/login"
                      class="block w-full text-center px-4 py-2 bg-[#7A4E2E] hover:bg-[#C56E33] text-white rounded transition">
            Acceder
          </RouterLink>
        </template>
      </div>
    </transition>
  </nav>
</div>
</template>



<script>
import AuthService from "../services/api/auth.service";
import { useToast } from 'vue-toastification';
import UserPreferencesComponent from "../modals/UserPreferencesComponent.vue";
import Dialog from 'primevue/dialog';

export default {
  components: {
    UserPreferencesComponent,
    Dialog
  },
  data() {
    return {
      openUserPreferencesModal: false,
      isOpen: false,
      accessToken: null,
      isMobileMenuOpen: false,
      user: null,
      dropdownMenu: null,
      toast: useToast()
    };
  },
  mounted() {
    this.accessToken = localStorage.getItem("token");
    let userStr = localStorage.getItem("user");
    this.user = JSON.parse(userStr);
    console.log(this.user);
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  watch: {
    '$route'() {
      this.accessToken = localStorage.getItem("token");
      let userStr = localStorage.getItem("user");
      this.user = userStr ? JSON.parse(userStr) : null;
      this.isMobileMenuOpen = false;
    },
    accessToken() {
      let userStr = localStorage.getItem("user");
      this.user = userStr ? JSON.parse(userStr) : null;
    }
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
        this.user = null;

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
    async preferences() {
      this.openUserPreferencesModal = true;
    }
  }
};
</script>
