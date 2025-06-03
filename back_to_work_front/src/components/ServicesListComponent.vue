<template>
<div class="relative w-full max-w-[1600px] min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 my-20 rounded-2xl mx-auto">
  <div class="flex justify-end mb-4 space-x-2"></div>

    <div class="fixed inset-0 bg-[url('https://appwebel.com/assets/es/img/backgrounds/landing/landing.webp')] bg-cover bg-center opacity-10"></div>
    <div class="fixed inset-0 bg-blue-950/40"></div>

    <main class="relative z-10 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="relative mb-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white inline-block relative z-10">{{ user?.is_pro == 1 ? 'Servicios' : 'Proyectos' }}</h2>
        <div class="absolute bottom-0 left-0 w-full h-1 bg-blue-900 rounded-full"></div>
      </div>

      <div class="max-w-7xl min-w-full">
      <button
        @click="switchToCards"
        :class="['px-4 py-2 mr-2 mb-2 rounded-lg font-semibold transition', viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-100']"
      >
      <i class="pi pi-th-large text-blue-300 text-lg"></i>
      </button>
      <button
        @click="switchToList"
        :class="['px-4 py-2 rounded-lg font-semibold transition', viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-100']"
      >
        <i class="pi pi-list text-blue-300 text-lg"></i>
      </button>

        <div v-if="!user?.is_pro || !ads.length === 0" class="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8 mb-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">Publica un anuncio</h1>
            <p class="text-blue-200 max-w-md">Describe tu proyecto y empieza a recibir propuestas de profesionales cualificados hoy mismo.</p>
          </div>
          
          <button 
            @click="openCreateAdModal = true" 
            class="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <i class="pi pi-plus mr-2 text-blue-300 text-xl"></i>
            Crear anuncio
          </button>
        </div>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div class="flex flex-col lg:flex-row flex-wrap gap-4">
          <div class="relative flex-grow lg:max-w-xs">
            <label class="block text-blue-200 text-sm mb-1">Buscador</label>
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="mt-5 pi pi-search text-blue-300 text-lg"></i>
            </div>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar anuncios..."
              class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 text-white placeholder-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200 shadow-sm hover:border-blue-200"
            />
          </div>

            <div class="flex-grow lg:max-w-xs">
              <label class="block text-sm font-medium text-white mb-1 sm:mb-2">Provincia</label>
              <select 
                v-model="selectedProvince"
                class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
              >
                <option value="" class="text-gray-900">Toda España</option>
                <option 
                  v-for="location in provinces"
                  :key="location.id"
                  :value="location.name"
                  class="bg-blue-900 text-white"
                >
                  {{ location.name }}
                </option>
              </select>
            </div>

            <div class="flex-grow lg:max-w-xs">
              <label class="block text-sm font-medium text-white mb-1 sm:mb-2">Categoria</label>
              <select 
                v-model="selectedCategory"
                class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
              >
                <option value="" class="text-gray-900">Todas las categorías</option>
                <option 
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  class="bg-blue-900 text-white"
                >
                  {{ category.category }}
                </option>
              </select>
            </div>

            <div class="flex-grow lg:max-w-xs">
              <label class="block text-blue-200 text-sm mb-1">Desde</label>
              <input 
                type="date" 
                v-model="selectedFromDate"
                class="w-full px-3 py-3 bg-white/5 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
              />
            </div>

            <div class="flex-grow lg:max-w-xs">
              <label class="block text-blue-200 text-sm mb-1">Hasta</label>
              <input 
                type="date" 
                v-model="selectedToDate"
                class="w-full px-3 py-3 bg-white/5 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div v-if="ads.length === 0" class="mt-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 text-center">
          <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">Aún no has publicado un anuncio</h3>
          <p class="text-blue-200 mb-4">¡Publica tu primer anuncio y empieza a recibir ofertas hoy mismo!</p>
          <button 
            @click="openCreateAdModal = true" 
            class="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-800 font-bold rounded-lg hover:bg-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Publicar anuncio
          </button>
        </div>

        <div>
            <div v-if="viewMode === 'list'" class="w-full rounded-lg shadow-xl overflow-hidden border border-white/20 overflow-x-auto">
              <DataTable
                :value="filteredAds"
                :paginator="true"
                :rows="10"
                :rowClassName="rowClassName"
                sortMode="single"
                dataKey="id"
                tableClass="min-w-full table-auto bg-slate-800 text-white"
                class="w-full cursor-pointer"
                @row-click="onRowClick"
              >
                <Column
                  field="name"
                  header="Nombre"
                  sortable
                  headerClass="bg-blue-900/50 text-white font-bold"
                  bodyClass="align-middle px-2 py-3 text-blue-900 font-semibold"
                />

                <Column
                  field="description"
                  header="Descripción"
                  sortable
                  headerClass="bg-blue-900/50 text-white font-bold"
                  bodyClass="align-middle px-2 py-3 text-blue-900 max-w-sm truncate"
                >
                  <template #body="slotProps">
                    <p class="truncate max-w-sm">
                      {{ slotProps.data.description }}
                    </p>
                  </template>
                </Column>

                <Column
                  field="category_id"
                  header="Categoría"
                  sortable
                  headerClass="bg-blue-900/50 text-white font-bold"
                  bodyClass="align-middle px-2 py-3 text-blue-900"
                >
                  <template #body="slotProps">
                    <span class="inline-block px-4 py-1 rounded-full text-sm font-medium bg-blue-900/50 text-white">
                      {{ getCategoryName(slotProps.data.category_id) }}
                    </span>
                  </template>
                </Column>

                <Column
                  field="location"
                  header="Ubicación"
                  sortable
                  headerClass="bg-blue-900/50 text-white font-bold hidden md:table-cell"
                  bodyClass="align-middle px-2 py-3 text-blue-900 truncate hidden md:table-cell"
                >
                  <template #body="slotProps">
                    <div class="flex items-center truncate">
                      <svg class="w-4 h-4 mr-1 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>{{ slotProps.data.location }}</span>
                    </div>
                  </template>
                </Column>

                <Column
                  field="due_date"
                  header="Fecha Límite"
                  sortable
                  headerClass="bg-blue-900/50 text-white font-bold hidden md:table-cell"
                  bodyClass="align-middle px-2 py-3 text-blue-900 hidden md:table-cell"
                >
                  <template #body="slotProps">
                    <div class="flex flex-col">
                      <span>{{ slotProps.data.due_date ? formatDate(slotProps.data.due_date) : "Sin fecha límite" }}</span>
                      <div class="flex space-x-1 mt-1">
                        <span
                          v-if="isDueSoon(slotProps.data.due_date)"
                          class="px-1 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800"
                        >
                          Próximo
                        </span>
                        <span
                          v-if="isOverdue(slotProps.data.due_date)"
                          class="px-1 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"
                        >
                          Atrasado
                        </span>
                      </div>
                    </div>
                  </template>
                </Column>

                <Column
                  v-if="!user?.is_pro"
                  header="Estado"
                  sortable
                  headerClass="bg-blue-900/50 text-white font-bold"
                  bodyClass="align-middle px-2 py-3 text-center"
                >
                  <template #body="slotProps">
                    <span
                      :class="getAdStatusClass(slotProps.data)"
                      class="px-2 py-1 rounded-full text-xs font-semibold"
                    >
                      {{ getAdStatusLabel(slotProps.data) }}
                    </span>
                  </template>
                </Column>

                <Column
                  v-if="!user?.is_pro"
                  header="Acciones"
                  headerClass="bg-blue-900/50 text-white font-bold"
                  bodyClass="align-middle px-2 py-3 text-center"
                >
                  <template #body="slotProps">
                    <button
                      @click="deleteAd(slotProps.data.id)"
                      :disabled="hasPaidOffer(slotProps.data) || slotProps.data.pro_is_done || slotProps.data.customer_is_done"
                      class="w-8 h-8 flex items-center justify-center rounded-full transition cursor-pointer"
                      :class="{
                        'bg-gray-400 cursor-not-allowed': hasPaidOffer(slotProps.data) || slotProps.data.pro_is_done || slotProps.data.customer_is_done,
                        'bg-red-600/20 hover:bg-red-600 group': !(hasPaidOffer(slotProps.data) || slotProps.data.pro_is_done || slotProps.data.customer_is_done)
                      }"
                      :title="(hasPaidOffer(slotProps.data) || slotProps.data.pro_is_done || slotProps.data.customer_is_done) ? 'No se puede eliminar este anuncio' : 'Eliminar anuncio'"
                    >
                      <i class="pi pi-trash"
                        :class="[
                          'text-base transition',
                          hasPaidOffer(slotProps.data) || slotProps.data.pro_is_done || slotProps.data.customer_is_done
                            ? 'text-gray-300'
                            : 'text-red-500 group-hover:text-white'
                        ]"></i>
                    </button>
                  </template>
                </Column>
              </DataTable>
              </div>
                <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div
                    v-for="ad in filteredAds"
                    :key="ad.id"
                    class="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition relative"
                  >
                    <button
                      v-if="!user.is_pro"
                      @click="deleteAd(ad.id)"
                      :disabled="hasPaidOffer(ad) || ad.pro_is_done || ad.customer_is_done"
                      class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition cursor-pointer"
                      :class="{
                        'bg-gray-400 cursor-not-allowed': hasPaidOffer(ad) || ad.pro_is_done || ad.customer_is_done,
                        'bg-red-600/20 hover:bg-red-600 group': !(hasPaidOffer(ad) || ad.pro_is_done || ad.customer_is_done)
                      }"
                      :title="(hasPaidOffer(ad) || ad.pro_is_done || ad.customer_is_done) ? 'No se puede eliminar este anuncio' : 'Eliminar anuncio'"
                    >
                      <i class="pi pi-trash"
                        :class="[
                          'text-base transition',
                          hasPaidOffer(ad) || ad.pro_is_done || ad.customer_is_done
                            ? 'text-gray-300'
                            : 'text-red-500 group-hover:text-white'
                        ]"></i>
                    </button>
                    <h3 class="text-lg font-bold text-white mb-2">{{ ad.name }}</h3>
                    <p class="text-blue-200 mb-2 truncate">{{ ad.description }}</p>
                    <p class="text-sm text-blue-300 mb-2">{{ getCategoryName(ad.category_id) }}</p>
                    <p class="text-sm text-blue-300 mb-4">{{ ad.location }}</p>
                    <button
                      @click="onRowClick({ data: ad })"
                      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition w-full"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>

            </div>
        </div>
    </main>

  <div v-if="openAdDetailModal" class="fixed z-50 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-gradient-to-br from-blue-950/90 to-blue-800/90 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
        <div class="flex justify-between items-center px-6 py-4 border-b border-white/20">
          <h3 class="text-lg leading-6 font-semibold text-white">
            Detalles del proyecto
          </h3>
          <button 
            @click="openAdDetailModal = false"
            class="text-red-500 hover:text-red-700 bg-transparent cursor-pointer focus:outline-none transition"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-6">
          <AdDetailComponent  
            :id="selectedId" 
            @close-ad-detail="openAdDetailModal = false" 
            @payment-success="handlePaymentSuccess"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-if="openCreateAdModal" class="fixed z-50 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-gradient-to-br from-blue-950/90 to-blue-800/90 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
        <div class="flex justify-between items-center px-6 py-4 border-b border-white/20">
          <h3 class="text-lg leading-6 font-semibold text-white">
            Creando nuevo proyecto
          </h3>
          <button 
            @click="openCreateAdModal = false"
            class="text-red-500 hover:text-red-700 bg-transparent cursor-pointer focus:outline-none transition"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button> 
        </div>

        <div class="p-6">
          <AdsFormComponent 
            :categories="categories"
            @created="handleAdCreated" 
            @cancel="openCreateAdModal = false"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-if="showRatingModal" class="fixed z-50 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="px-6 py-4 border-b border-white/20">
          <h3 class="text-lg leading-6 font-semibold text-white">
            Rate the Service
          </h3>
        </div>
        <div class="p-6">
          <AdRatingComponent 
            :adId="adToRate" 
            @close="showRatingModal = false" 
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AdDetailComponent from '../modals/AdDetailComponent.vue';
import AdsFormComponent from "../modals/AdsFormComponent.vue";
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import { useToast } from 'vue-toastification';
import UserService from '../services/api/user.service';
import AdRatingComponent from '../modals/AdRatingComponent.vue';

export default {
  components: {
    AdDetailComponent,
    AdsFormComponent,
    InputText,
    DataTable,
    Column,
    Tag,
    Dialog,
    AdRatingComponent
  },
  data() {
    return {
      viewMode: 'cards',
      showAdDetailModal: false,
      searchQuery: '',
      loading: true,
      sortField: null,
      sortOrder: null,
      ads: [],
      provinces: [],
      categories: [],
      openCreateAdModal: false,
      openAdDetailModal: false,
      selectedCategory: null,
      statusFilter: null,
      toast: useToast(),
      selectedId: '',
      user: null,
      accessToken: null,
      showRatingModal: false,
      adToRate: null,
      selectedProvince: '',
      selectedCategory: '',
      selectedFromDate: '',
      selectedToDate: '',
    };
  },
computed: {
  filteredAds() {
    return this.ads.filter(ad => {
      const matchesQuery =
        !this.searchQuery ||
        ad.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        ad.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        ad.location.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesLocation =
        !this.selectedProvince || ad.location === this.selectedProvince;


      const matchesCategory =
        !this.selectedCategory || ad.category_id === this.selectedCategory;

      let matchesDueDate = true;
      if (this.selectedFromDate) {
        matchesDueDate = ad.due_date && new Date(ad.due_date) >= new Date(this.selectedFromDate);
      }
      if (matchesDueDate && this.selectedToDate) {
        matchesDueDate = ad.due_date && new Date(ad.due_date) <= new Date(this.selectedToDate);
      }

      return matchesQuery && matchesLocation && matchesCategory && matchesDueDate;
    });
  },
},
mounted: async function() {
  this.accessToken = localStorage.getItem("token");
  let userStr = localStorage.getItem("user");
  this.user = JSON.parse(userStr);
  await this.fetchCategories();
  await this.fetchProvinces();

  if (!this.user?.is_pro && (!this.ads || this.ads.length === 0)) {
    console.log(this.user)
    await this.fetchMyAds();
  } else {
    await this.fetchAds();
  }
},
methods: {
  switchToList() {
    this.viewMode = 'list';
    console.log('Modo cambiado a:', this.viewMode);
  },
  switchToCards() {
    this.viewMode = 'cards';
    console.log('Modo cambiado a:', this.viewMode);
  },
  getAdStatusLabel(ad) {
    if (ad.customer_is_done) {
      return 'Completado';
    }
    if (ad.pro_is_done) {
      return 'En validación';
    }
    if (this.hasPaidOffer(ad)) {
      return 'En curso';
    }
    if (ad.ad_offer && ad.ad_offer.length > 0) {
      return 'En negociación';
    }
    return 'Esperando pujas';
  },

  getAdStatusClass(ad) {
    if (ad.customer_is_done) {
      return 'bg-green-200 text-green-900';
    }
    if (ad.pro_is_done) {
      return 'bg-yellow-200 text-yellow-900';
    }
    if (this.hasPaidOffer(ad)) {
      return 'bg-blue-200 text-blue-900';
    }
    if (ad.ad_offer && ad.ad_offer.length > 0) {
      return 'bg-purple-200 text-purple-900';
    }
    return 'bg-amber-100 text-amber-800';
  },

  hasPaidOffer(ad) {
    return ad.ad_offer && ad.ad_offer.some(offer => offer.is_paid === 1);
  },
  async deleteAd(adId) {
    if (!confirm('¿Estás seguro de que quieres eliminar este anuncio?')) {
      return;
    }

    try {
      const response = await UserService.delete(`ads/${adId}`);
      if (response.data.success) {
        this.ads = this.ads.filter(ad => ad.id !== adId);
        this.toast.success('Anuncio eliminado con éxito');
      } else {
        this.toast.error('No se pudo eliminar el anuncio');
      }
    } catch (error) {
      console.error('Error al eliminar el anuncio:', error);
      this.toast.error('Error al eliminar el anuncio');
    }
  },
    handleAdCreated(newAd) {
      console.log(newAd)
      this.ads.unshift(newAd);
      this.openCreateAdModal = false;
    },
    async fetchProvinces() {
      try {
        const response = await UserService.get("provinces");
        this.provinces = response.data.data;
        console.log(this.provinces)
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    },
    handlePaymentSuccess({ adId }) {
      this.openAdDetailModal = false;
      this.adToRate = adId;
      setTimeout(() => {
        this.toast.success('Pago recibido con éxito');
      }, 300);
    },
    onRowClick(eventOrAd) {
      const adId = eventOrAd.data ? eventOrAd.data.id : eventOrAd.id;
      this.selectedId = adId;
      this.openAdDetailModal = true;
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.category : 'Uncategorized';
    },
    handleFilterChange(filters) {
      this.selectedCategory = filters.category;
      this.statusFilter = filters.status;
    },
    onSort(event) {
      this.sortField = event.sortField;
      this.sortOrder = event.sortOrder;
    },
    async fetchCategories() {
      try {
        const response = await UserService.get("categories");
        if (response.data.success) {
          this.categories = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        this.toast.error("Error al cargar las categorías");
      }
    },
    async fetchAds() {
      try {
        this.loading = true;
        const response = await UserService.get("ads");
        if (response.data.success) {
          this.ads = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
        this.toast.error("Error al cargar los anuncios");
      } finally {
        this.loading = false;
      }
    },
    async fetchMyAds() {
      try {
        this.loading = true;
        const response = await UserService.show("getAdsByUser", this.user.id);
        if (response.data.success) {
          this.ads = response.data.data;
          console.log(this.ads)
        }
      } catch (error) {
        console.error("Error fetching user ads:", error);
        this.toast.error("Error al cargar tus anuncios");
      } finally {
        this.loading = false;
      }
    },

    isDueSoon(dateString) {
      if (!dateString) return false;
      const dueDate = new Date(dateString);
      const today = new Date();
      const diffTime = dueDate - today;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays > 0 && diffDays <= 3;
    },
    isOverdue(dateString) {
      if (!dateString) return false;
      const dueDate = new Date(dateString);
      const today = new Date();
      return dueDate < today;
    },
    rowClassName(rowData) {
      return 'custom-row-class';
    }
  }
};
</script>
<style scoped>
::v-deep(.p-paginator) {
  background-color: #1e293b !important;
  color: white !important;
  border-top: 1px solid #334155;
}
::v-deep(.p-datatable) {
  background-color: #1e293b;
  color: white;
}

::v-deep(.p-datatable .p-datatable-thead > tr > th),
::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
  background-color: #1e293b;
  color: white;
}
</style>
