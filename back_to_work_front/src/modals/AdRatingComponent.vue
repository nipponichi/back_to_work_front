<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Valora este anuncio</h2>
  
        <label class="block mb-2 font-medium">Tu valoración:</label>
        <div class="flex space-x-1 mb-4">
          <button
            v-for="star in 5"
            :key="star"
            @click="rating = star"
            class="text-2xl focus:outline-none"
          >
            <span :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
          </button>
        </div>
  
        <label class="block mb-2 font-medium">Comentario:</label>
        <textarea
          v-model="comment"
          rows="4"
          class="w-full border rounded-lg p-2 mb-4"
          placeholder="Escribe tu opinión sobre el anuncio..."
        ></textarea>
  
        <div class="flex justify-end space-x-2">
          <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button
            @click="submitRating"
            :disabled="rating === 0 || submitting"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const props = defineProps({
    adId: {
      type: Number,
      required: true
    }
  })
  
  const emits = defineEmits(['close', 'rating-submitted'])
  
  const rating = ref(0)
  const comment = ref('')
  const submitting = ref(false)
  
  const submitRating = async () => {
    if (rating.value === 0 || submitting.value) return
    submitting.value = true
  
    try {
      await axios.post(`/api/ads/${props.adId}/rating`, {
        rating: rating.value,
        comment: comment.value
      })
  
      emits('rating-submitted')
      emits('close')
    } catch (error) {
      console.error('Error al enviar la valoración:', error)
    } finally {
      submitting.value = false
    }
  }
  </script>
  
  <style scoped>
  /* Puedes añadir estilos adicionales si lo deseas */
  </style>
  