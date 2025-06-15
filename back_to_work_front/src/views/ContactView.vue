<template>
  <div class="relative w-full min-h-screen bg-gradient-to-br from-blue-950/10 to-blue-800/10 rounded-2xl mt-24 overflow-hidden">

    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-[url('https://appwebel.com/assets/es/img/backgrounds/landing/landing.webp')] bg-cover bg-center opacity-40 blur-sm"></div>
      <div class="absolute inset-0 bg-blue-900/50"></div>
    </div>

    <main class="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="bg-blue-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 sm:p-10">

        <div class="mb-10">
          <h2 class="text-3xl font-bold text-white mb-2">Contacto</h2>
          <div class="h-1 w-full bg-blue-800 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div class="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
            <div class="p-8 sm:p-10">
              <form @submit.prevent="submitForm">
                <div class="grid gap-6">
                  <div>
                    <label class="text-sm font-medium text-blue-200 mb-1 block">Nombre completo</label>
                    <input type="text" v-model="form.name" required
                      class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200"
                      placeholder="Tu nombre" />
                  </div>

                  <div>
                    <label class="text-sm font-medium text-blue-200 mb-1 block">Correo electrónico</label>
                    <input type="email" v-model="form.email" required
                      class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200"
                      placeholder="tu@email.com" />
                  </div>

                  <div>
                    <label class="text-sm font-medium text-blue-200 mb-1 block">Asunto</label>
                    <select v-model="form.subject" required
                      class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none transition duration-200">
                      <option value="">Selecciona un asunto</option>
                      <option value="general">Consulta general</option>
                      <option value="support">Soporte técnico</option>
                      <option value="professional">Registro como profesional</option>
                      <option value="payment">Problemas con pagos</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label class="text-sm font-medium text-blue-200 mb-1 block">Mensaje</label>
                    <textarea v-model="form.message" rows="5" required
                      class="w-full resize-none px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200"
                      placeholder="Escribe tu mensaje aquí..."></textarea>
                  </div>

                  <div class="mt-2">
                    <button type="submit" :disabled="isSubmitting"
                      class="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition transform hover:scale-[1.02] shadow-lg flex justify-center items-center">
                      <span v-if="!isSubmitting">Enviar mensaje</span>
                      <span v-else class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                          <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Enviando...
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8">
            <h3 class="text-2xl font-bold text-white mb-6">Otras formas de contactar</h3>
            <div class="space-y-6 text-blue-200">
              <div class="flex items-start gap-4">
                <div class="p-3 bg-blue-100 rounded-lg">
                  <i class="pi pi-envelope text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p>info@weagree.com</p>
                  <p class="text-sm text-blue-100 mt-1">Responderemos lo antes posible</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-3 bg-blue-100 rounded-lg">
                  <i class="pi pi-phone text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p>+34 91 597 41 89</p>
                  <p class="text-sm text-blue-100 mt-1">Lunes a Viernes, 9:00 - 18:00</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-3 bg-blue-100 rounded-lg">
                  <i class="pi pi-map-marker text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p>Calle Reyes Católicos, 123</p>
                  <p class="text-sm text-blue-100">28001 Madrid, España</p>
                </div>
              </div>

              <div class="pt-6">
                <h4 class="text-lg font-semibold text-white mb-3">Síguenos en redes</h4>
                <div class="flex space-x-4">
                  <a v-for="icon in ['facebook', 'instagram', 'twitter', 'linkedin']" :key="icon"
                    href="#" target="_blank"
                    class="bg-blue-100 hover:bg-blue-200 p-3 rounded-lg transition-colors duration-200">
                    <i :class="`pi pi-${icon}`" class="text-blue-600 text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import toast from '../services/toast.js'

export default {
  components () {
    toast
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      isSubmitting: false
    }
  },

  methods: {
    async submitForm() {
      this.isSubmitting = true
      
      try {
        
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        toast.success('Mensaje enviado con éxito. Te responderemos pronto.', {
          position: 'top-right',
          duration: 5000
        })
        
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
      } catch (error) {
        this.$toast.error('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.', {
          position: 'top-right',
          duration: 5000
        })
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>
