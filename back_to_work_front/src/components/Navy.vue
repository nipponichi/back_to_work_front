<template>
<div class="relative">
  <nav class="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900/70 via-purple-800/70 to-pink-700/70 backdrop-blur-md shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">

        <div class="flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Logo_Williams_F1.png"
               class="h-10 w-10 mr-3 filter brightness-0 invert"
               alt="WeAgree Logo">
          <span class="text-2xl font-bold text-white">
            WeAgree
          </span>
        </div>

        <ul class="hidden md:flex space-x-4 text-lg">
          <li><RouterLink to="/" class="text-white  hover:text-blue-300 transition">Inicio</RouterLink></li>
          	<li class="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </li>
          <li><RouterLink to="/service" class="text-white hover:text-blue-300 transition">{{ user?.is_pro ? 'Servicios' : 'Proyectos' }}</RouterLink></li>
          <li class="text-gray-300 pd-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li><RouterLink to="/contact" class="text-white hover:text-blue-300 transition">Contacto</RouterLink></li>
        </ul>

        <div class="flex items-center space-x-2">
          <template v-if="accessToken">
            <RouterLink v-if="user?.is_pro" to="/work"
                        class="hidden md:block bg-green-500 hover:bg-green-700 transition py-2 px-4 rounded-full text-white">
              Mis Trabajos
            </RouterLink>
            <RouterLink v-if="user.roles[0].name==='admin'" to="/admin"
                        class="hidden md:block bg-orange-500 hover:bg-orange-700 transition py-2 px-4 rounded-full text-white">
              Administración
            </RouterLink>
            <div class="flex items-center text-white text-sm leading-none">
              <button
                @click="preferences"
                class="text-white hidden md:inline-flex items-center bg-transparent hover:text-blue-300 transition font-semibold text-base rounded-l-md border border-white/20 px-2 py-1 m-0 cursor-pointer"
                style="margin-right: 0px; padding-right: 2px;"
              >
                <div class="w-10 h-10 mr-2 rounded-full overflow-hidden">
                  <img
                    :src="userImage"
                    alt="Usuario"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex flex-col leading-tight">
                  <span class="font-semibold">{{ user?.user_name || "Usuario" }}</span>
                  <span class="text-xs text-blue-200" v-if="user?.user_stat?.length">
                    {{ averageRating.toFixed(1) }} / 5
                  </span> 
                </div>
              </button> 
              <button
                @click="openUserstatsModal = true"
                class="text-sm text-blue-300 bg-white/10 rounded-full px-2 py-0.5 transition hover:bg-white/20"
                style="margin-left: 0px; padding-left: 2px;"
              >
                ★ {{ user?.user_stat?.length || 0 }}
              </button>
            </div>

            <button @click="logout"
                    class="hidden md:block px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition shadow cursor-pointer">
              Cerrar sesión
            </button>
          </template>

          <template v-else>
            <RouterLink to="/login"
                        class="hidden md:block px-4 py-2 rounded-full bg-white hover:bg-gray-200 text-black transition shadow">
              Acceder
            </RouterLink>
          </template>

          <button @click="isMobileMenuOpen = !isMobileMenuOpen"
                  class="text-white md:hidden focus:outline-none">
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

      <div v-if="isMobileMenuOpen" class="md:hidden bg-white/90 backdrop-blur-md shadow-lg rounded-b-lg p-4 space-y-3">
        <RouterLink to="/" class="block text-gray-800 hover:text-blue-500 transition">Inicio</RouterLink>
        <RouterLink to="/service" class="block text-gray-800 hover:text-blue-500 transition">{{ user?.is_pro ? 'Servicios' : 'Proyectos' }}</RouterLink>
        <RouterLink to="/contact" class="block text-gray-800 hover:text-blue-500 transition">Contacto</RouterLink>

        <template v-if="accessToken">
        <div class="px-4 py-2 rounded transition text-gray-800 font-semibold flex justify-between items-center bg-transparent hover:bg-gray-100">
          <span><img class="w-6 h-6 inline-block" :src="userImage" alt="Usuario"/> {{ user?.user_name || 'Usuario' }}</span>
          <button @click="openUserstatsModal = true"
                  class="text-sm text-blue-600 hover:underline focus:outline-none">
            {{ user?.user_stat.length }}
          </button>
        </div>

          <button @click="logout" class="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition">
            Cerrar sesión
          </button>
        </template>
        <template v-else>
          <RouterLink to="/login"
                      class="block w-full text-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition">
            Acceder
          </RouterLink>
        </template>
      </div>
  </nav>

  <div v-if="openUserPreferencesModal" class="fixed z-50 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-gradient-to-br from-blue-950/90 to-blue-800/90 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
        <div class="flex justify-between items-center px-6 py-4 border-b border-white/20">
          <h3 class="text-lg leading-6 font-semibold text-white">
            Preferencias de usuario
          </h3>
          <button @click="openUserPreferencesModal = false"
                  class="text-red-500 hover:text-red-700 bg-transparent cursor-pointer focus:outline-none transition">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <UserPreferencesComponent :user="user" @deleteUser="deleteUser"/>
        </div>
      </div>
    </div>
  </div>

  <div v-if="openUserstatsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-gradient-to-br from-blue-950/90 to-blue-800/90 rounded-xl shadow-xl w-full max-w-3xl mx-4">
      <div class="flex justify-between items-center px-6 py-4 border-b border-white/20">
        <h3 class="text-lg leading-6 font-semibold text-white">
          Sobre este usuario
        </h3>
        <button @click="openUserstatsModal = false"
                class="text-red-500 hover:text-red-700 bg-transparent cursor-pointer focus:outline-none transition">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="p-6 max-h-[80vh] overflow-y-auto">
        <UserRatingComponent :user="user" />
      </div>
    </div>
  </div>

</div>
</template>


<script>
import AuthService from "../services/api/auth.service";
import { useToast } from 'vue-toastification';
import UserPreferencesComponent from "../modals/UserPreferencesComponent.vue";
import UserRatingComponent from "../modals/UserRatingComponent.vue";

export default {
  components: {
    UserPreferencesComponent,
    UserRatingComponent
  },
  data() {
    return {
      openUserPreferencesModal: false,
      openUserstatsModal: false,
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
  computed: {
    userImage() {
      console.log(`${import.meta.env.VITE_IMG_URL}/${this.user.image}`);
      return this.user?.image && this.user?.image.trim() !== ''
        ? `${import.meta.env.VITE_IMG_URL}/${this.user.image}`
        : 'https://cdn-icons-png.flaticon.com/512/11461/11461171.png';
    },
    averageRating() {
      if (!this.user.user_stat.length) return 0
      const total = this.user.user_stat.reduce((sum, s) => sum + s.rating, 0)
      return total / this.user.user_stat.length
    }
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
    async deleteUser(id) {
      console.log("Eliminando usuario con ID:", id);
      try {
        this.openUserPreferencesModal = false;
        const response = await AuthService.delete('users', id);
        console.log("Respuesta de eliminación:", response);
        if (response.data.success) {
          this.logout();
          this.toast.success("Cuenta de usuario eliminada correctamente");
        } else {
          this.toast.error("Error al eliminar la cuenta de usuario");
        }
      } catch (error) {
        this.toast.error("Error al eliminar el usuario");
      }

    },
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
