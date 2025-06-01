<template>
<section class="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
  <div class="fixed inset-0 z-0">
    <div class="absolute inset-0 bg-[url('https://appwebel.com/assets/es/img/backgrounds/landing/landing.webp')] bg-cover bg-center opacity-10"></div>
    <div class="absolute inset-0 bg-[#D6C9B3]/50"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto bg-white/70 backdrop-blur-md m-20 pt-6 pb-12 px-12 rounded-2xl shadow-xl border border-[#D6C9B3]">
    <div class="relative mb-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-[#7A4E2E] inline-block relative z-10">Contacto</h2>
      <div class="absolute bottom-0 left-0 w-full h-1 bg-[#C56E33] rounded-full"></div>
    </div>
      
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

      <div class="bg-white rounded-2xl shadow-md border border-[#D6C9B3]">
        <div class="p-8 sm:p-10">
          <form @submit.prevent="submitForm">
            <div class="grid grid-cols-1 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-[#7A4E2E] mb-1">Nombre completo</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-[#D6C9B3] focus:ring-2 focus:ring-[#C56E33] focus:border-[#C56E33] transition-all duration-200"
                  placeholder="Tu nombre">
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-[#7A4E2E] mb-1">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-[#D6C9B3] focus:ring-2 focus:ring-[#C56E33] focus:border-[#C56E33] transition-all duration-200"
                  placeholder="tu@email.com">
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-[#7A4E2E] mb-1">Asunto</label>
                <select 
                  id="subject" 
                  v-model="form.subject"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-[#D6C9B3] focus:ring-2 focus:ring-[#C56E33] focus:border-[#C56E33] transition-all duration-200">
                  <option value="" disabled selected>Selecciona un asunto</option>
                  <option value="general">Consulta general</option>
                  <option value="support">Soporte técnico</option>
                  <option value="professional">Registro como profesional</option>
                  <option value="payment">Problemas con pagos</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-[#7A4E2E] mb-1">Mensaje</label>
                <textarea 
                  id="message" 
                  v-model="form.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 rounded-lg border border-[#D6C9B3] focus:ring-2 focus:ring-[#C56E33] focus:border-[#C56E33] transition-all duration-200"
                  placeholder="Escribe tu mensaje aquí..."></textarea>
              </div>
              
              <div class="mt-4">
                <button 
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full px-6 py-4 bg-[#C56E33] hover:bg-[#A35429] text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center">
                  <span v-if="!isSubmitting">Enviar mensaje</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-8 h-full border border-[#D6C9B3]">
        <h3 class="text-2xl font-bold text-[#7A4E2E] mb-6">Otras formas de contactar</h3>
        
        <div class="space-y-6">
          <div class="flex items-start">
            <div class="flex-shrink-0 bg-[#EED4B9] p-3 rounded-lg">
              <svg class="h-6 w-6 text-[#C56E33]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-[#7A4E2E] mt-1">info@weagree.com</p>
              <p class="text-[#A97A50] text-sm mt-2">Responderemos lo antes posible</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex-shrink-0 bg-[#EED4B9] p-3 rounded-lg">
              <svg class="h-6 w-6 text-[#C56E33]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-[#7A4E2E] mt-1">+34 91 597 41 89</p>
              <p class="text-[#A97A50] text-sm mt-2">Lunes a Viernes, 9:00 - 18:00</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex-shrink-0 bg-[#EED4B9] p-3 rounded-lg">
              <svg class="h-6 w-6 text-[#C56E33]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-[#7A4E2E] mt-1">Calle Reyes Católicos, 123</p>
              <p class="text-[#7A4E2E]">28001 Madrid, España</p>
            </div>
          </div>
          
          <div class="pt-6">
            <h4 class="text-lg font-semibold text-[#7A4E2E] mb-4">Síguenos en redes</h4>
            <div class="flex space-x-4">
              <a href="#" class="bg-[#EED4B9] hover:bg-[#D6C9B3] p-3 rounded-lg transition-colors duration-200">
                <svg class="h-6 w-6 text-[#C56E33]" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>


<script>
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
        toast: useToast()
      },
      isSubmitting: false
    }
  },

  methods: {
    async submitForm() {
      this.isSubmitting = true
      
      try {
        
        // Simulamos un retraso de red
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mostrar mensaje de éxito
        this.toast.success('Mensaje enviado con éxito. Te responderemos pronto.', {
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
