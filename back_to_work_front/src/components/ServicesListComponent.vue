<template>
<div class="relative w-full max-w-7xl min-h-screen bg-gradient-to-br from-[#F4EDE4] to-[#E8DCCB] my-20 rounded-2xl mx-auto">

    <div class="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
    <div class="fixed inset-0 bg-white/50"></div>

    <main class="relative z-10 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="relative mb-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-[#7A4E2E] inline-block relative z-10">{{ user?.is_pro == 1 ? 'Servicios' : 'Proyectos' }}</h2>
      <div class="absolute bottom-0 left-0 w-full h-1 bg-[#C56E33] rounded-full"></div>
    </div>

    <div class="max-w-7xl min-w-full">

      <div v-if="!user?.is_pro || !ads.length === 0" class="bg-white/70 backdrop-blur-sm rounded-2xl border border-[#D6C9B3] p-6 sm:p-8 mb-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div class="text-center sm:text-left">
          <h1 class="text-2xl sm:text-3xl font-bold text-[#7A4E2E] mb-2">Publica un anuncio</h1>
          <p class="text-[#A38D7C] max-w-md">Describe tu proyecto y empieza a recibir propuestas de profesionales cualificados hoy mismo.</p>
        </div>
        <button 
          @click="openCreateAdModal = true" 
          class="flex items-center px-6 py-3 bg-[#C56E33] text-white font-semibold rounded-lg hover:bg-[#A35429] transition duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Crear anuncio
        </button>
      </div>

      <div class="bg-white/70 backdrop-blur-sm rounded-2xl border border-[#D6C9B3] p-6 mb-8">
        <div class="flex flex-col lg:flex-row flex-wrap gap-4">
          <div class="relative flex-grow lg:max-w-xs">
            <label class="block text-[#7A4E2E] text-sm mb-1">Buscador</label>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar anuncios..."
              class="w-full pl-10 pr-4 py-3 bg-white/50 border border-[#D6C9B3] text-[#7A4E2E] rounded-lg focus:ring-2 focus:ring-[#C56E33] focus:border-[#C56E33] outline-none"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="mt-5 pi pi-search text-[#C56E33] text-lg"></i>
            </div>
          </div>

          <div class="flex-grow lg:max-w-xs">
            <label class="block text-[#7A4E2E] text-sm mb-1">Provincia</label>
            <select 
              v-model="selectedProvince"
              class="w-full px-3 py-3 bg-white/50 border border-[#D6C9B3] text-[#7A4E2E] rounded-lg focus:ring-2 focus:ring-[#C56E33] focus:border-[#C56E33] outline-none"
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
            <label class="block text-[#7A4E2E] text-sm mb-1">Categoría</label>
            <select 
              v-model="selectedCategory"
              class="w-full px-3 py-3 bg-white/50 border border-[#D6C9B3] text-[#7A4E2E] rounded-lg focus:ring-2 focus:ring-[#C56E33] focus:border-[#C56E33] outline-none"
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
            <label class="block text-[#7A4E2E] text-sm mb-1">Desde</label>
            <input 
              type="date" 
              v-model="selectedFromDate"
              class="w-full px-3 py-3 bg-white/50 border border-[#D6C9B3] text-[#7A4E2E] rounded-lg focus:ring-2 focus:ring-[#C56E33] focus:border-[#C56E33] outline-none"
            />
          </div>

          <div class="flex-grow lg:max-w-xs">
            <label class="block text-[#7A4E2E] text-sm mb-1">Hasta</label>
            <input 
              type="date" 
              v-model="selectedToDate"
              class="w-full px-3 py-3 bg-white/50 border border-[#D6C9B3] text-[#7A4E2E] rounded-lg focus:ring-2 focus:ring-[#C56E33] focus:border-[#C56E33] outline-none"
            />
          </div>
        </div>
      </div>

      <div v-if="ads.length === 0" class="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#D6C9B3] p-6 text-center">
        <h3 class="text-xl sm:text-2xl font-bold text-[#7A4E2E] mb-2">Aún no has publicado un anuncio</h3>
        <p class="text-[#A38D7C] mb-4">¡Publica tu primer anuncio y empieza a recibir ofertas hoy mismo!</p>
        <button 
          @click="openCreateAdModal = true" 
          class="inline-flex items-center justify-center px-6 py-3 bg-[#C56E33] text-white font-bold rounded-lg hover:bg-[#A35429] transition duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Publicar anuncio
        </button>
      </div>
      <div class="w-full rounded-2xl border border-[#D6C9B3] overflow-hidden">
        <DataTable
          :value="filteredAds"
          :paginator="true"
          :rows="10"
          sortMode="multiple"
          dataKey="id"
          :rowClassName="rowClassName"
          tableClass="min-w-full table-auto bg-white/70 backdrop-blur-sm"
          class="text-[#7A4E2E] cursor-pointer w-full"
          @row-click="onRowClick"
        >
          <Column
            field="name"
            header="Nombre"
            sortable
            headerClass="bg-[#F4EDE4] text-[#7A4E2E] font-semibold"
            bodyClass="align-middle px-2 py-3"
          />

          <Column
            header="Descripción"
            sortable
            headerClass="bg-[#F4EDE4] text-[#7A4E2E] font-semibold"
            bodyClass="align-middle px-2 py-3 max-w-sm truncate"
          >
            <template #body="slotProps">
              <p class="truncate max-w-sm">
                {{ slotProps.data.description }}
              </p>
            </template>
          </Column>

          <Column
            header="Categoría"
            sortable
            headerClass="bg-[#F4EDE4] text-[#7A4E2E] font-semibold"
            bodyClass="align-middle px-2 py-3"
          >
            <template #body="slotProps">
              <span class="inline-block px-4 py-1 rounded-full text-xs font-medium bg-[#EED4B9] text-[#7A4E2E]">
                {{ getCategoryName(slotProps.data.category_id) }}
              </span>
            </template>
          </Column>

          <Column
            header="Ubicación"
            sortable
            headerClass="bg-[#F4EDE4] text-[#7A4E2E] font-semibold hidden md:table-cell"
            bodyClass="align-middle px-2 py-3 truncate hidden md:table-cell"
          >
            <template #body="slotProps">
              <div class="flex items-center truncate">
                <svg class="w-4 h-4 mr-1 text-[#C56E33]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            header="Fecha Límite"
            sortable
            headerClass="bg-[#F4EDE4] text-[#7A4E2E] font-semibold hidden md:table-cell"
            bodyClass="align-middle px-2 py-3 hidden md:table-cell"
          >
            <template #body="slotProps">
              <div class="flex flex-col">
                <span>{{ formatDate(slotProps.data.due_date) }}</span>
                <div class="flex space-x-1 mt-1">
                  <span
                    v-if="isDueSoon(slotProps.data.due_date)"
                    class="px-1 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800"
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
            headerClass="bg-[#F4EDE4] text-[#7A4E2E] font-semibold"
            bodyClass="align-middle px-2 py-3 text-center"
          >
            <template #body="slotProps">
              <span
                :class="getAdStatusClass(slotProps.data)"
                class="px-2 py-1 rounded-full text-xs font-semibold bg-[#EED4B9] text-[#7A4E2E]"
              >
                {{ getAdStatusLabel(slotProps.data) }}
              </span>
            </template>
          </Column>

          <Column
            v-if="!user?.is_pro"
            header="Acciones"
            headerClass="bg-[#F4EDE4] text-[#7A4E2E] font-semibold"
            bodyClass="align-middle px-2 py-3 text-center"
          >
            <template #body="slotProps">
              <button
                @click="deleteAd(slotProps.data.id)"
                :disabled="hasPaidOffer(slotProps.data) || slotProps.data.pro_is_done || slotProps.data.customer_is_done"
                class="w-8 h-8 flex items-center justify-center rounded-full transition"
                :class="{
                  'bg-gray-300 cursor-not-allowed': hasPaidOffer(slotProps.data) || slotProps.data.pro_is_done || slotProps.data.customer_is_done,
                  'bg-[#C56E33]/20 hover:bg-[#C56E33]': !(hasPaidOffer(slotProps.data) || slotProps.data.pro_is_done || slotProps.data.customer_is_done)
                }"
                :title="(hasPaidOffer(slotProps.data) || slotProps.data.pro_is_done || slotProps.data.customer_is_done) ? 'No se puede eliminar este anuncio' : 'Eliminar anuncio'"
              >
                <i class="pi pi-trash"
                  :class="[
                    'text-base transition',
                    hasPaidOffer(slotProps.data) || slotProps.data.pro_is_done || slotProps.data.customer_is_done
                      ? 'text-gray-500'
                      : 'text-[#C56E33] hover:text-white'
                  ]"></i>
              </button>
            </template>
          </Column>
        </DataTable>
      </div>

    </div>
    </main>
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
