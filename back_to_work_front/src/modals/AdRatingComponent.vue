<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Valora este anuncio</h2>

      <!-- Estrellas 0 a 10 -->
      <label class="block mb-2 font-medium">Tu valoración (0–10):</label>
      <div class="flex flex-wrap gap-1 mb-4">
        <button
          v-for="star in 10"
          :key="star"
          @click="customerCare = star"
          class="text-2xl focus:outline-none"
        >
          <span :class="star <= customerCare ? 'text-yellow-400' : 'text-gray-300'">★</span>
        </button>
      </div>

      <!-- Comentario -->
      <label class="block mb-2 font-medium">Comentario:</label>
      <textarea
        v-model="review"
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
          :disabled="isIncomplete || submitting"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </div>

    <!-- Toast -->
    <div
      v-if="showToast"
      class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md transition-opacity duration-300"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const props = defineProps({
  adId: {
    type: Number,
    required: true
  },
})

const emits = defineEmits(['close', 'rating-submitted'])

const customerCare = ref(0)
const review = ref('')
const submitting = ref(false)

const toastMessage = ref('')
const showToast = ref(false)

const isIncomplete = computed(() =>
  customerCare.value === 0 || review.value.trim() === ''
)

const showSuccessToast = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const submitRating = async () => {
  if (isIncomplete.value || submitting.value) return;
  submitting.value = true;

  try {
    const token = localStorage.getItem('token'); // Ajusta según dónde guardes el token
    console.log('Token enviado:', token);  // <-- Aquí mostramos el token
    

    await axios.post('http://localhost:8000/api/userstats', {
      ad_id: props.adId,
      customer_care: customerCare.value,
      review: review.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    showSuccessToast('¡Valoración enviada con éxito!');
    emits('rating-submitted');
    setTimeout(() => emits('close'), 1500);
  } catch (error) {
    console.error('Error al enviar la valoración:', error);
  } finally {
    submitting.value = false;
  }
};
</script>
