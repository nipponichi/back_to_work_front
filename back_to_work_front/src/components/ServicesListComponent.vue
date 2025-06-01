<template>
<div class="relative w-full max-w-7xl min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 my-20 rounded-2xl mx-auto">

    <div class="fixed inset-0 bg-[url('https://appwebel.com/assets/es/img/backgrounds/landing/landing.webp')] bg-cover bg-center opacity-10"></div>
    <div class="fixed inset-0 bg-blue-950/40"></div>

    <main class="relative z-10 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="relative mb-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-white inline-block relative z-10">Servicios</h2>
      <div class="absolute bottom-0 left-0 w-full h-1 bg-blue-900 rounded-full"></div>
    </div>

      <div class="max-w-7xl min-w-full">

        <div v-if="!user?.is_pro || !ads.length === 0" class="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8 mb-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div class="text-center sm:text-left">
            <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">Publica un anuncio</h1>
            <p class="text-blue-200 max-w-md">Describe tu proyecto y empieza a recibir propuestas de profesionales cualificados hoy mismo.</p>
          </div>
          <button 
            @click="openCreateAdModal = true" 
            class="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
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
              <label class="block text-blue-200 text-sm mb-1">Provincia</label>
              <select 
                v-model="selectedProvince"
                class="w-full px-3 py-3 bg-white/5 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
              >
                <option value="" class="text-gray-900">Toda España</option>
                <option 
                  v-for="location in provinces"
                  :key="location.id"
                  :value="location.name"
                  class="text-gray-900"
                >
                  {{ location.name }}
                </option>
              </select>
            </div>

            <div class="flex-grow lg:max-w-xs">
              <label class="block text-blue-200 text-sm mb-1">Categoria</label>
              <select 
                v-model="selectedCategory"
                class="w-full px-3 py-3 bg-white/5 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
              >
                <option value="" class="text-gray-900">Todas las categorías</option>
                <option 
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  class="text-gray-900"
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

        <div v-else class="w-full rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <DataTable
            :value="filteredAds"
            :paginator="true"
            :rows="10"
            sortMode="multiple"
            dataKey="id"
            :rowClassName="rowClassName"
            tableClass="min-w-full table-fixed"
            class="text-white cursor-pointer w-full"
            @row-click="onRowClick"
          >
            <Column
              field="name"
              header="Nombre"
              sortable
              headerClass="bg-blue-900/50 text-white font-bold"
              bodyClass="align-middle px-2 py-3 text-blue-900 font-semibold w-1/4"
              style="width: 25%"
            />

            <Column
              header="Descripción"
              sortable
              headerClass="bg-blue-900/50 text-white font-bold hidden sm:table-cell"
              bodyClass="align-middle px-2 py-3 text-blue-900 truncate hidden sm:table-cell w-1/4"
              style="width: 25%"
            >
              <template #body="slotProps">
                <p class="truncate">{{ slotProps.data.description }}</p>
              </template>
            </Column>

            <Column
              header="Categoría"
              sortable
              headerClass="bg-blue-900/50 text-white font-bold"
              bodyClass="align-middle px-2 py-3 text-blue-900 w-1/6"
              style="width: 15%"
            >
              <template #body="slotProps">
                <span class="inline-block px-4 py-1 rounded-full text-sm font-medium bg-blue-900/50 text-white">
                  {{ getCategoryName(slotProps.data.category_id) }}
                </span>
              </template>
            </Column>

            <Column
              header="Ubicación"
              sortable
              headerClass="bg-blue-900/50 text-white font-bold hidden sm:table-cell"
              bodyClass="align-middle px-2 py-3 text-blue-900 truncate hidden sm:table-cell w-1/6"
              style="width: 15%"
            >
              <template #body="slotProps">
                <div class="flex items-center truncate">
                  <svg class="w-4 h-4 mr-1 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>{{ slotProps.data.location }}</span>
                </div>
              </template>
            </Column>

            <Column
              header="Fecha Límite"
              sortable
              headerClass="bg-blue-900/50 text-white font-bold hidden sm:table-cell"
              bodyClass="align-middle px-2 py-3 text-blue-900 hidden sm:table-cell w-1/6"
              style="width: 15%"
            >
              <template #body="slotProps">
                <div class="flex flex-col">
                  <span>{{ formatDate(slotProps.data.due_date) }}</span>
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
              header="Estado"
              sortable
              headerClass="bg-blue-900/50 text-white font-bold"
              bodyClass="align-middle px-2 py-3 text-center w-1/6"
              style="width: 15%"
            >
              <template #body="slotProps">
                <span
                  :class="slotProps.data.pro_is_done 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'"
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                >
                  {{ slotProps.data.pro_is_done ? 'Completado' : 'Pendiente' }}
                </span>
              </template>
            </Column>
            <Column
              header="Acciones"
              headerClass="bg-blue-900/50 text-white font-bold"
              bodyClass="align-middle px-2 py-3 text-center w-1/12"
              style="width: 10%"
            >
<template #body="slotProps">
  <button
    @click="deleteAd(slotProps.data.id)"
    class="w-8 h-8 flex items-center justify-center rounded-full bg-red-600/20 hover:bg-red-600 group transition cursor-pointer"
    title="Eliminar anuncio"
  >
    <i class="pi pi-trash text-red-500 text-base transition group-hover:text-white"></i>
  </button>
</template>

            </Column>
          </DataTable>
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
  <div class="flex items-end justify-center max-h-12 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
    onRowClick(event) {
      this.selectedId = event.data.id;
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
      return rowData.pro_is_done ? 'bg-green-900/10' : '';
    }
  }
};
</script>
