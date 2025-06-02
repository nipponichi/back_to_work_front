<template>
  <div class="relative min-h-screen bg-gradient-to-br from-blue-950 to-blue-800">
    <div class="fixed inset-0 bg-[url('https://appwebel.com/assets/es/img/backgrounds/landing/landing.webp')] bg-cover bg-center opacity-10"></div>
    <div class="fixed inset-0 bg-blue-950/40"></div>

    <main class="relative z-10 flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8">
        <h2 class="text-3xl font-bold text-center text-white mb-6">Iniciar Sesión</h2>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-blue-200 mb-1">Correo Electrónico</label>
            <input 
              v-model="email" 
              type="email" 
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
              placeholder="tu@email.com"
              required
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-blue-200 mb-1">Contraseña</label>
            <input 
              v-model="password" 
              type="password" 
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
              placeholder="********"
              required
            >
          </div>

          <button 
            type="submit" 
            class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            Iniciar Sesión
          </button>
        </form>

        <p v-if="errorMessage" class="mt-4 text-sm text-red-400 text-center">
          {{ errorMessage }}
        </p>

        <div class="mt-6 text-center">
          <RouterLink to="/password-reset" class="text-blue-300 hover:underline">
            ¿Olvidaste tu contraseña?
          </RouterLink>
        </div>

        <div class="mt-2 text-center">
          <RouterLink to="/register" class="text-blue-300 hover:underline">
            ¿No tienes cuenta? Regístrate aquí
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AuthService from '../services/api/auth.service'
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      toast: useToast()
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await AuthService.login(this.email, this.password);
        if (response.data.success) {
          this.toast.success("Inicio de sesión exitoso");
          
          const tokenExpiration = Date.now() + 2 * 3600 * 1000;
          localStorage.setItem("tokenExpiration", tokenExpiration);
          localStorage.setItem("token", response.data.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));

          const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
          localStorage.removeItem("redirectAfterLogin");
          this.$router.push(redirectPath);
        } else {
          this.errorMessage = response.data.message || "Error en el inicio de sesión";
          this.toast.error(this.errorMessage);
        }
      } catch (error) {
        const msg = error.response?.data?.message || "Error al iniciar sesión";
        this.errorMessage = msg;
        this.toast.error(msg);
      }
    }
  }
}
</script>
