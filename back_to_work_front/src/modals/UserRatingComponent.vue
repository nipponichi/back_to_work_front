<template>
  <div class="bg-blue-950/50 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-4xl mx-auto border border-white/10 text-white">
    <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
      <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-800 shadow-md">
        <img :src="getUserImage(user)" alt="Foto usuario" class="w-full h-full object-cover" />
      </div>

      <div class="text-center sm:text-left">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">
          {{ user?.user_name || 'Usuario' }}
        </h2>
        <p class="text-sm text-blue-200 mt-1">
          Media general:
          <span class="text-yellow-400 font-bold text-base">{{ averageRating.toFixed(1) }}</span> / 5
          <span class="text-white">({{ user.user_stat.length }} valoraciones)</span>
        </p>

        <div class="flex justify-center sm:justify-start space-x-1 mt-2 text-xl">
          <span v-for="i in 5" :key="i" class="relative w-6 h-6 inline-block">
            <span class="absolute inset-0 text-blue-800 select-none">★</span>
            <span v-if="i <= Math.floor(averageRating)" class="absolute inset-0 text-yellow-400 select-none">★</span>
            <span v-else-if="i - averageRating <= 0.5" class="absolute inset-0 overflow-hidden text-yellow-400 select-none" style="width: 40%; display: inline-block;">★</span>
          </span>
        </div>
      </div>
    </div>

    <hr class="border-white/20 mb-4" />

    <template v-if="sortedRatings.length">
      <div v-for="(stat, index) in sortedRatings" :key="index" class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-md transition hover:shadow-lg">
        <div v-if="user.id === loggedUser.id" class="mt-3 text-right">
          <button @click="openClaim(stat)" class="text-red-400 hover:text-red-600 transition bg-transparent rounded-full text-sm inline-flex items-center" title="Reportar reseña">
            <i class="pi pi-exclamation-triangle mr-1"></i>
          </button>
        </div>

        <div class="flex justify-between items-center text-sm text-blue-200 mb-2">
          <div>
            <div v-if="stat.ad?.name" class="text-base text-blue-300 mb-1">
              <span class="text-white font-semibold">{{ stat.ad.name }}</span>
            </div>

            <div class="mb-1">
              <span class="font-semibold text-white">{{ stat.reviewer?.user_name || 'Usuario anónimo' }}</span>
              <span class="ml-2">:</span>
              <span class="inline-flex ml-1 space-x-1 text-lg">
                <span v-for="i in 5" :key="i" class="relative w-4 h-4 inline-block">
                  <span class="absolute inset-0 text-blue-800 select-none">★</span>
                  <span v-if="i <= Math.floor(stat.rating)" class="absolute inset-0 text-yellow-400 select-none">★</span>
                  <span v-else-if="i - stat.rating <= 0.5" class="absolute inset-0 overflow-hidden text-yellow-400 select-none" style="width: 40%; display: inline-block;">★</span>
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

    <Teleport to="body">
      <div v-if="openClaimsFormModal" class="fixed z-[60] inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-gradient-to-br from-blue-950/90 to-blue-800/90 
                      rounded-lg text-left overflow-hidden shadow-xl transform transition-all 
                      sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div class="flex justify-between items-center px-6 py-4 border-b border-white/20">
              <h3 class="text-lg leading-6 font-semibold text-white">
                Crear Reclamación
              </h3>
              <button @click="openClaimsFormModal = false"
                      class="text-red-500 hover:text-red-700 bg-transparent cursor-pointer focus:outline-none transition">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div class="p-6">
              <ClaimsFormComponent
                :receiver="selectedReceiver"
                :userstat_id="selectedUserstatId"
                @update:visible="openClaimsFormModal = $event"
                @claim-created="onClaimCreated"
              />
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script>
import UserService from '../services/api/user.service'
import ClaimsFormComponent from './ClaimsFormComponent.vue'

export default {
  components: {
    ClaimsFormComponent
  },
  name: 'UserFeedbackPanel',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      openClaimsFormModal: false,
      selectedReceiver: null,
      selectedUserstatId: null,
      sortedRatings: [],
      loggedUser: null
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
    await this.initialize()
    await this.fetchUserStats()
  },
  methods: {
    getUserImage(user) {
      if (!user || !user.image || user.image.trim() === '') {
        return 'https://cdn-icons-png.flaticon.com/512/11461/11461171.png';
      }
      return `${import.meta.env.VITE_IMG_URL}/${user.image}`;
    },
    async initialize() {
      try {
        const userStr = localStorage.getItem("user");
        this.loggedUser = userStr ? JSON.parse(userStr) : null;

      } catch (error) {
        console.error('Error inicializando componente:', error)
      }
    },
    async fetchUserStats() {
      try {
        const stats = [...this.user.user_stat];

        await Promise.all(stats.map(async (stat) => {
          try {
            const senderRes = await UserService.show('users', stat.sender_id)
            stat.reviewer = senderRes.data.data
          } catch (e) {
            console.warn(`No se pudo cargar el usuario con id ${stat.sender_id}`, e)
            stat.reviewer = null
          }

          try {
            const adRes = await UserService.show('ads', stat.ad_id)
            stat.ad = adRes.data.data
          } catch (e) {
            console.warn(`No se pudo cargar el anuncio con id ${stat.ad_id}`, e)
            stat.ad = null
          }
        }))

        this.sortedRatings = stats.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)
      } catch (error) {
        console.error('Error cargando valoraciones:', error)
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    openClaim(stat) {
      this.selectedReceiver = stat.reviewer;
      this.selectedUserstatId = stat.id;
      console.log(this.selectedReceiver)
      console.log(this.selectedUserstatId)
      this.openClaimsFormModal = true;
    },
    onClaimCreated() {
      this.openClaimsFormModal = false;
    }
  }
}
</script>
