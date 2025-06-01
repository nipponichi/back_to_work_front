<template>
  <div class="relative min-h-screen bg-gradient-to-br from-blue-950 to-blue-800">
    <!-- Fondo desenfocado fijo -->
    <div class="fixed inset-0 bg-[url('https://appwebel.com/assets/es/img/backgrounds/landing/landing.webp')] bg-cover bg-center opacity-10"></div>
    <div class="fixed inset-0 bg-blue-950/40"></div>

    <!-- Contenido en scroll -->
    <main class="relative z-10 flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 text-center">

        <div v-if="loading" class="text-blue-200 text-lg">
          Verificando tu email...
        </div>

        <div v-if="success" class="space-y-4">
          <h2 class="text-2xl font-bold text-green-400">¡Email verificado!</h2>
          <p class="text-blue-100">Tu dirección de email ha sido verificada correctamente.</p>
        </div>

        <div v-if="error" class="space-y-4">
          <h2 class="text-2xl font-bold text-red-400">Error en la verificación</h2>
          <p class="text-blue-100">{{ errorMessage }}</p>
          <button 
            @click="retryVerification"
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
import { useRoute, useRouter } from 'vue-router'
import UserService from '../services/api/user.service';

export default {
  props: {
    id: String,
    hash: String,
    signature: String
  },
  setup(props) {
    const loading = ref(true)
    const success = ref(false)
    const error = ref(false)
    const errorMessage = ref('')
    const router = useRouter()
    const route = useRoute()

    const verifyEmail = async () => {
      try {
        const response = await UserService.set('verify-email', {
          id: props.id || route.query.id,
          hash: props.hash || route.query.hash,
          signature: props.signature || route.query.signature
        })
        
        if (response.data.success) {
          success.value = true
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        } else {
          throw new Error(response.data.message || 'Error desconocido')
        }
      } catch (err) {
        error.value = true
        errorMessage.value = err.response?.data?.message || err.message || 'Error al verificar el email'
      } finally {
        loading.value = false
      }
    }

    const retryVerification = () => {
      loading.value = true
      error.value = false
      verifyEmail()
    }

    onMounted(() => {
      verifyEmail()
    })

    return { loading, success, error, errorMessage, retryVerification }
  }
}
</script>