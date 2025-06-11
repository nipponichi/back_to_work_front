<template>
  <div class="relative min-h-screen bg-gradient-to-br from-blue-950 to-blue-800">
    <div class="fixed inset-0 bg-[url('https://appwebel.com/assets/es/img/backgrounds/landing/landing.webp')] bg-cover bg-center opacity-10"></div>
    <div class="fixed inset-0 bg-blue-950/40"></div>

    <main class="relative z-10 flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 text-center">

        <div v-if="loading" class="text-blue-200 text-lg">
          Confirmando tu pago...
        </div>

        <div v-if="success" class="space-y-4">
          <h2 class="text-2xl font-bold text-green-400">¡Pago realizado con éxito!</h2>
          <p class="text-blue-100">Tu puja ha sido marcada como pagada.</p>
        </div>

        <div v-if="error" class="space-y-4">
          <h2 class="text-2xl font-bold text-red-400">Error al confirmar el pago</h2>
          <p class="text-blue-100">{{ errorMessage }}</p>
          <button 
            @click="retryConfirmation"
            class="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            Reintentar
          </button>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const loading = ref(true)
    const success = ref(false)
    const error = ref(false)
    const errorMessage = ref('')
    const route = useRoute()

    const confirmPayment = async () => {
      const bidId = route.query.bid_id

      if (!bidId) {
        error.value = true
        errorMessage.value = 'No se proporcionó un ID de puja válido.'
        loading.value = false
        return
      }

      try {
        const response = await axios.post(`http://localhost:8000/api/offers/${bidId}/mark-paid`)

        if (response.data.success) {
          success.value = true
        } else {
          throw new Error(response.data.message || 'No se pudo confirmar el pago')
        }
      } catch (err) {
        error.value = true
        errorMessage.value = err.response?.data?.message || err.message || 'Error desconocido'
      } finally {
        loading.value = false
      }
    }

    const retryConfirmation = () => {
      loading.value = true
      error.value = false
      confirmPayment()
    }

    onMounted(() => {
      confirmPayment()
    })

    return { loading, success, error, errorMessage, retryConfirmation }
  }
}
</script>
