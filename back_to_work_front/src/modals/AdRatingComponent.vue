<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Valora este anuncio</h2>

      <div v-if="user?.user_stat?.length" class="mb-6">
        <h3 class="text-lg font-medium mb-2">Valoraciones anteriores:</h3>
        <ul class="space-y-2 max-h-48 overflow-y-auto pr-1">
          <li
            v-for="(stat, index) in user.user_stat"
            :key="index"
            class="bg-gray-100 p-3 rounded-md"
          >
            <div class="flex items-center justify-between mb-1">
              <div class="text-yellow-500 text-sm">
                <span v-for="i in 10" :key="i">
                  <span :class="i <= stat.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                </span>
              </div>
              <span class="text-sm text-gray-500">{{ formatDate(stat.created_at) }}</span>
            </div>
            <p class="text-sm text-gray-700 italic">"{{ stat.review }}"</p>
          </li>
        </ul>
      </div>

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
import userService from '../services/api/user.service'

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
const userStr = localStorage.getItem('user')
const user = userStr ? JSON.parse(userStr) : null

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

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const submitRating = async () => {
  if (isIncomplete.value || submitting.value) return
  submitting.value = true

  try {
    const token = localStorage.getItem('token')

    await userService.set('api', {
      ad_id: props.adId,
      customer_care: customerCare.value,
      review: review.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    showSuccessToast('¡Valoración enviada con éxito!')
    emits('rating-submitted')
    setTimeout(() => emits('close'), 1500)
  } catch (error) {
    console.error('Error al enviar la valoración:', error)
  } finally {
    submitting.value = false
  }
}
</script>
