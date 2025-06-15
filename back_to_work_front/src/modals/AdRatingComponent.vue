<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div class="bg-gradient-to-br from-blue-950/80 to-blue-800/80 border border-white/10 text-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
      <h2 class="text-xl font-bold text-blue-200 mb-1 truncate">{{ adData.name }}</h2>
      <h3 class="text-2xl font-bold text-white mb-4">
        <template v-if="sender.is_pro">
          Valora a {{ receiver.user_name }} como cliente
        </template>
        <template v-else>
          Valora el trabajo de {{ receiver.user_name }}
        </template>
      </h3>

      <div class="flex flex-wrap gap-1 mb-4 bg-transparent">
        <button
          v-for="star in 5"
          :key="star"
          @click="rating = star"
          @mouseover="hoverRating = star"
          @mouseleave="hoverRating = 0"
          class="text-4xl focus:outline-none bg-transparent"
        >
          <span :class="(star <= hoverRating || (!hoverRating && star <= rating)) ? 'text-yellow-400' : 'text-blue-800'">★</span>
        </button>
      </div>

      <label class="block mb-2 font-medium text-blue-200">Comentario:</label>
      <textarea
        v-model="review"
        rows="4"
        class="w-full bg-white/10 border border-white/20 text-white placeholder-blue-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Escribe tu opinión sobre el anuncio..."
      ></textarea>

      <div class="flex justify-end space-x-2">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-white/10 text-blue-200 hover:bg-white/20 border border-white/20 rounded-lg transition"
        >
          Cancelar
        </button>
        <button
          @click="submitRating"
          :disabled="isIncomplete || submitting"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import userService from '../services/api/user.service'
import toast from '../services/toast.js'

export default {
  components() {

  },
  props: {
    adData: {
      type: Object,
      required: true
    },
    sender: {
      type: Object,
      required: true
    },
    receiver: {
      type: Object,
      required: true
    }
  },
  mounted(){
    console.log(this.adData)
    console.log(this.sender)
    console.log(this.receiver)
  },
  data() {
    return {
      hoverRating: 0,
      rating: 0,
      review: '',
      submitting: false,
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    }
  },
  computed: {
    isIncomplete() {
      return this.customerCare === 0 || this.review.trim() === ''
    }
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },

    async submitRating() {
      if (this.isIncomplete || this.submitting) return
      this.submitting = true
      try {
        const response = await userService.set('userstats', {
          ad_id: this.adData.id,
          rating: this.rating,
          sender_id: this.sender.id,
          receiver_id: this.receiver.id,
          review: this.review,
        })

        if (response.data.success) {
          this.user?.is_pro ? toast.success('¡Valoración enviada con éxito!') : ''
          this.$emit('rating-submitted', response.data.data)
          setTimeout(() => this.$emit('close'), 1500)
        }

      } catch (error) {
        console.error('Error al enviar la valoración:', error)
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

