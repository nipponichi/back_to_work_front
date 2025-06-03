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

    <div v-if="sortedRatings.length" class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      <div
        v-for="(stat, index) in sortedRatings"
        :key="index"
        class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-md transition hover:shadow-lg"
      >
        <div class="flex justify-between items-center text-sm text-blue-200 mb-2">
          <div>
            <span class="font-semibold text-white">
              {{ stat.reviewer?.user_name || 'Usuario anónimo' }}
            </span>
            <span class="ml-2">valoró con</span>
            <span class="text-yellow-400 font-semibold">{{ stat.rating }}/5</span>
          </div>
          <span class="text-xs">{{ formatDate(stat.created_at) }}</span>
        </div>
        <p class="text-blue-100 italic text-sm">“{{ stat.review }}”</p>
      </div>
    </div>

    <div v-else class="text-sm text-blue-200">Este usuario aún no tiene valoraciones.</div>
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

      this.sortedRatings = stats.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
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
    }
  }
}
</script>
