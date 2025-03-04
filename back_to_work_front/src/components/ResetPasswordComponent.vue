<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-center text-gray-700">Recuperar contraseña</h2>
        
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
  
          <button 
            @click="handleResetPassword" 
            class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Recuperar contraseña
          </button>
        </form>
  
        <p v-if="errorMessage" class="mt-2 text-sm text-red-500 text-center">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from "vue";
  import axios from "axios";

  const email = ref("");
  const errorMessage = ref("");
  
  const handleResetPassword = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/reset-password", { 
        email: email.value 
      });
      console.log("Respuesta del servidor:", response.data);
      alert("Solicitud enviada con éxito");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      errorMessage.value = "Hubo un error al procesar la solicitud.";
    }
  };
  </script>