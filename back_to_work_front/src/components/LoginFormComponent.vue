<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700">Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin" class="mt-4">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600">Correo Electrónico</label>
          <input 
            v-model="email" 
            type="email" 
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300" 
            required
          >
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600">Contraseña</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300" 
            required
          >
        </div>
        <button 
          type="submit" 
          class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>
      <p v-if="errorMessage" class="mt-2 text-sm text-red-500 text-center">
        {{ errorMessage }}
      </p>
      <div class="mt-4 text-center">
        <RouterLink to="/register" class="text-blue-500 hover:underline">
          📞 ¿No tienes cuenta? Regístrate aquí
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8001/api/login", { 
        email: email.value,
        password: password.value 
      });
      console.log("Respuesta del servidor:", response.data);
      if (response.data.succes) {
        const expiration = Date.now() + 2 * 3600 * 1000;
        localStorage.setItem("tokenExpiration", expiration);
        localStorage.setItem("token", response.data.result.token.accessToken);
        console.log("Token guardado en localStorage:", response.data.result.token.accessToken);
        localStorage.setItem("user", response.data.result.user.name);
        localStorage.setItem("fullUser", JSON.stringify(response.data.result.user));
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");

        router.push(redirectPath);
      } else {
        errorMessage.value = response.data.message;
      } 
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      errorMessage.value = "Hubo un error al procesar la solicitud.";
    }
};
</script>
