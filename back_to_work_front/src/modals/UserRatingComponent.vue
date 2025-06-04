<template>
  <div class="bg-blue-950/50 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-4xl mx-auto border border-white/10 text-white">
    <div class="flex flex-col sm:flex-row sm:justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-white mb-2">
          Valoraciones de {{ user?.user_name || 'Usuario' }}
        </h2>
        <p class="text-sm text-blue-200">
          Media general:
          <span class="text-yellow-400 font-bold">{{ averageRating.toFixed(1) }}</span> / 5
          ({{ user.user_stat.length }} valoraciones)
        </p>

        <div class="flex space-x-1 mt-2 text-lg">
          <span
            v-for="i in 5"
            :key="i"
            class="relative w-5 h-5 inline-block"
          >
            <span class="absolute inset-0 text-blue-800 select-none">★</span>
            <span
              v-if="i <= Math.floor(averageRating)"
              class="absolute inset-0 text-yellow-400 select-none"
            >★</span>
            <span
              v-else-if="i - averageRating <= 0.5"
              class="absolute inset-0 overflow-hidden text-yellow-400 select-none"
              style="width: 40%; display: inline-block;"
            >★</span>
          </span>
        </div>
      </div>
    </div>

    <hr class="border-white/20 mb-4" />

    <template v-if="sortedRatings.length">
      <div
        v-for="(stat, index) in sortedRatings" :key="index"
        class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-md transition hover:shadow-lg"
      >
        <div v-if="user.id === loggedUser.id" class="mt-3 text-right">
            <button
                @click="reportReview(stat)"
                class="text-red-400 hover:text-red-600 transition bg-transparent  rounded-full text-sm inline-flex items-center"
                title="Reportar reseña"
            >
                <i class="pi pi-exclamation-triangle mr-1"></i>
            </button>
        </div>

        <div class="flex justify-between items-center text-sm text-blue-200 mb-2">
          <div>
            <div v-if="stat.ad?.name" class="text-base text-blue-300 mb-1">
                <span class="text-white font-semibold">{{ stat.ad.name }}</span>
            </div>
            <div class="mb-1">
              <span class="font-semibold text-white">
                {{ stat.reviewer?.user_name || 'Usuario anónimo' }}
              </span>
              <span class="ml-2">:</span>
              <span class="inline-flex ml-1 space-x-1 text-lg">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="relative w-4 h-4 inline-block"
                >
                  <span class="absolute inset-0 text-blue-800 select-none">★</span>
                  <span
                    v-if="i <= Math.floor(stat.rating)"
                    class="absolute inset-0 text-yellow-400 select-none"
                  >★</span>
                  <span
                    v-else-if="i - stat.rating <= 0.5"
                    class="absolute inset-0 overflow-hidden text-yellow-400 select-none"
                    style="width: 40%; display: inline-block;"
                  >★</span>
                </span>
              </span>
            </div>

          </div>

          <span class="text-xs">{{ formatDate(stat.created_at) }}</span>
        </div>

        <p class="text-blue-100 italic text-sm mt-2">“{{ stat.review }}”</p>
      </div>
    </template>

    <template v-else>
      <div class="text-sm text-blue-200">Este usuario aún no tiene valoraciones.</div>
    </template>
  </div>
</template>

<script>
import UserService from '../services/api/user.service'

export default {
  name: 'UserFeedbackPanel',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      sortedRatings: []
    }
  },
  computed: {
    averageRating() {
      if (!this.user.user_stat.length) return 0
      const total = this.user.user_stat.reduce((sum, s) => sum + s.rating, 0)
      return total / this.user.user_stat.length
    }
  },
async mounted() {
  try {
    let userStr = localStorage.getItem("user");
    this.loggedUser = JSON.parse(userStr);
    const stats = [...this.user.user_stat]

    for (let stat of stats) {
      try {
        const response = await UserService.show('users', stat.pro_id)
        stat.reviewer = response.data.data
      } catch (error) {
        console.warn(`No se pudo cargar el usuario con id ${stat.pro_id}`, error)
        stat.reviewer = null
      }
    }

    for (let stat of stats) {
      try {
        const response = await UserService.show('ads', stat.ad_id)
        stat.ad = response.data.data
      } catch (error) {
        console.warn(`No se pudo cargar el anuncio con id ${stat.ad_id}`, error)
        stat.ad = null
      }
    }

    this.sortedRatings = stats
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)

  } catch (error) {
    console.error('Error procesando valoraciones:', error)
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

    reportReview(stat) {
        console.log('Reporte enviado para:', stat)
        alert(`Se ha reportado la reseña de ${stat.reviewer?.user_name || 'anónimo'}.`)
    }
  }
}
</script>
