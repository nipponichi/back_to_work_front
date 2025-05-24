<template>
  <div class="space-y-6">

<div v-if="adData" class="p-6 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold text-center text-gray-700">{{ adData.name }}</h2>
  <p class="mt-4 text-gray-600">{{ adData.description }}</p>
  <p class="mt-2 text-gray-600">Categoría: {{ adData.category_id }}</p>
  <p class="mt-2 text-gray-600">Ubicación: {{ adData.location }}</p>

  <!-- Bloque de imágenes CORREGIDO -->
  <div v-if="adData.pictures?.length" class="mt-4">
    <h3 class="font-medium text-gray-700 mb-2">
      Imágenes del anuncio ({{ adData.pictures.length }}):
    </h3>
    
    <!-- Grid de imágenes -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div v-for="(picture, index) in adData.pictures" :key="picture.id" class="relative">
        <!-- Imagen principal -->
        <img 
          :src="baseImgUrl + picture.path" 
          :alt="'Imagen ' + (index + 1) + ' - ' + adData.name"
          class="w-full h-32 object-cover rounded-lg border border-gray-200 hover:shadow-md cursor-pointer"
          @click="openLightbox(index)"
        >
        
        <!-- Indicador de posición (opcional) -->
        <span class="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {{ index + 1 }}/{{ adData.pictures.length }}
        </span>
      </div>
    </div>
  </div>
  <div 
    v-if="lightbox.isOpen" 
    class="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4"
    @click.self="lightbox.isOpen = false"
  >
    <!-- Botón de cerrar - más grande y visible -->
    <button
      @click="lightbox.isOpen = false"
      class="absolute top-6 right-6 text-white bg-gray-800 text-4xl z-[10000] hover:bg-gray-600 transition-colors focus:outline-none"
      aria-label="Cerrar lightbox"
    >
      &times;
    </button>
    
    <!-- Contenedor principal centrado -->
    <div class="relative w-full max-w-6xl h-full flex items-center justify-center">
      <!-- Imagen -->
      <img 
        :src="baseImgUrl + adData.pictures[lightbox.currentIndex].path" 
        class="max-h-[90vh] max-w-full object-contain"
        :alt="'Imagen ' + (lightbox.currentIndex + 1) + ' de ' + adData.name"
      >
      
      <!-- Botón anterior -->
      <button
        @click.stop="prevImage"
        class="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-gray-700 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center transition-all"
        aria-label="Imagen anterior"
      >
        &larr;
      </button>
      
      <!-- Botón siguiente -->
      <button
        @click.stop="nextImage"
        class="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-gray-700 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center transition-all"
        aria-label="Imagen siguiente"
      >
        &rarr;
      </button>
      
      <!-- Contador de imágenes -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-lg px-4 py-2 rounded-full">
        Imagen {{ lightbox.currentIndex + 1 }} de {{ adData.pictures.length }}
      </div>
    </div>
  </div>
  <div v-else class="mt-4 text-gray-500">
    Este anuncio no tiene imágenes
  </div>

  <!-- Información del usuario -->
  <div class="mt-4 pt-4 border-t border-gray-200">
    <h3 class="font-medium text-gray-700">Publicado por:</h3>
    <p class="text-gray-600">{{ adData.user.name }} ({{ adData.user.user_name }})</p>
    <p class="text-gray-600">{{ adData.user.phone }}</p>
  </div>
</div>  

  <div v-if="showBidGrid" class="mt-6">
    <div class="overflow-x-auto bg-white shadow-md rounded-md">
      <table class="min-w-full text-sm">
        <tbody>
          <tr v-if="showNewBidRow" class="border-b">
            <td class="px-6 py-3">{{ user ? user.name : 'Usuario no logado' }}</td>
            <td class="px-6 py-3">
              <input v-model="newBid.bid" type="number" class="px-3 py-2 border border-gray-300 rounded-md" placeholder="Monto" />
            </td>
            <td class="px-6 py-3">
              <input v-model="newBid.description" type="text" class="px-3 py-2 border border-gray-300 rounded-md" placeholder="Descripción" />
            </td>
            <td class="px-6 py-3">
              <button
                @click="submitNewBid"
                class="text-green-500 hover:text-green-700"
                :disabled="isSubmitting"
              >
                Añadir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

    <DataTable 
      :value="bids"
      :paginator="true" 
      :rows="10"
      :rowsPerPageOptions="[5,10,25]"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} pujas"
      stripedRows
      responsiveLayout="scroll"
      class="p-datatable-sm shadow-md rounded-md"
    >
      <Column field="user.name" header="Usuario" :sortable="true">
        <template #body="{data}">
          {{ data.user?.name || 'Desconocido' }}
        </template>
      </Column>
      
      <Column field="bid" header="Monto" :sortable="true">
        <template #body="{data}">
          {{ data.bid }} €
        </template>
      </Column>
      
      <Column field="description" header="Descripción" :sortable="true"></Column>
      
      <Column header="Acciones" bodyStyle="text-align:center">
        <template #body="{data}">
          <Button 
            v-if="user && data.user && data.user.id === user.id"
            icon="pi pi-trash" 
            class="p-button-text p-button-danger" 
            @click="removeBid(data.id)"
          />
          <Button
            v-if="user && data.user && data.user.id === user.id || !user.is_pro"
            icon="pi pi-comment" 
            class="p-button-text p-button-danger" 
            @click="openChat(data.user)"
            tooltip="Iniciar"
            tooltipOptions="{ position: 'top' }"
          />
          <Button 
            v-if="!user.is_pro"
            icon="pi pi-money-bill" 
            class="p-button-text p-button-danger" 
            @click="openChat()"
          />
        </template>
      </Column>
    </DataTable>

    <div v-if="user?.is_pro" class="mt-6 text-center">
      <button
        @click="toggleBidGrid"
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {{ showBidGrid ? 'Cerrar Pujas' : 'Pujar' }}
      </button>
      <button
        @click="openChat(data.user)"
        class="ml-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Chatear
      </button>
    </div>
    <Dialog      
        v-model:visible="showChatModal"
        :header="`Chat con ${selectedReceiver?.user_name}`"
        :modal="true"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        headerClass="border-b border-gray-200 p-4 font-semibold text-lg"
        contentClass="p-4"
    >
        <ChatComponent 
            :ad_id="id"
            :sender="user"
            :receiver="selectedReceiver"
            :roomId="chat-123-456" 
        />
    </Dialog>

    <!-- Spinner centrado en overlay -->
    <div v-if="isProcessingPayment" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="flex flex-col items-center space-y-4">
        <div class="spinner"></div>
        <span class="text-white text-lg font-semibold">Procesando pago...</span>
      </div>
    </div>

    <!-- Modal de SimulatedPayment -->
    <div v-if="showPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 relative w-[90%] max-w-md">
        <button @click="showPaymentModal = false" class="absolute top-2 right-2 text-gray-600 hover:text-black text-lg">
          &times;
        </button>
        <SimulatedPayment
          :acceptedBid="selectedBid?.bid"
          @close="showPaymentModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import userService from '../services/api/user.service';
import { useToast } from 'vue-toastification';
import ChatComponent from '../components/ChatComponent.vue';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tooltip from 'primevue/tooltip';
import UserService from '../services/api/user.service';

export default {
  components: {
    ChatComponent,
    Dialog,
    DataTable,
    Button,
    Column,
    Tooltip
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      baseImgUrl: import.meta.env.VITE_IMG_URL || 'http://127.0.0.1:8000/storage/',
      adData: null,
      bids: [],
      newBid: {
        bid: null,
        description: ''
      },
            lightbox: {
        isOpen: false,
        currentIndex: 0
      },
      user: null,
      showBidGrid: false,
      showNewBidRow: false,
      showChatModal: false,
      isSubmitting: false,
      toast: useToast(),
      selectedReceiver: null,,
      showPaymentModal: false,
      selectedBid: null,
      isProcessingPayment: false,
      categories: [] 
    };
  },
  async mounted() {
    window.addEventListener('message', this.receiveMessage);
    await this.fetchAdData();
    await this.fetchUser();
    await this.fetchBids();

      console.log('URL de imagen:', 
    import.meta.env.VITE_IMG_URL + this.adData.pictures[0].path
  );
    await this.fetchCategories();
  },
  beforeUnmount() {
    window.removeEventListener('message', this.receiveMessage);
  },
  methods: {
        openLightbox(index) {
      this.lightbox.currentIndex = index;
      this.lightbox.isOpen = true;
    },
    nextImage() {
      this.lightbox.currentIndex = 
        (this.lightbox.currentIndex + 1) % this.adData.pictures.length;
    },
    prevImage() {
      this.lightbox.currentIndex = 
        (this.lightbox.currentIndex - 1 + this.adData.pictures.length) % this.adData.pictures.length;
    },
    async fetchCategories() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/categories');
        if (res.data.success) {
          this.categories = res.data.data;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.category : 'Uncategorized';
    },
    async receiveMessage(event) {
      if (event.origin !== 'http://localhost:5174') return;

      const data = event.data;

      if (data && data.PaymentOK === true && data.bidId) {
        console.log(`Pago OK recibido para la puja: ${data.bidId}`);

        try {
          const res = await axios.post(`http://127.0.0.1:8000/api/offers/${data.bidId}/mark-paid`);

          if (res.data.success) {
            await this.fetchBids();
            

          //Se obtiene el adId asociado al bidId y se pasa al padre
          const resAd = await axios.get(`http://127.0.0.1:8000/api/offers/${data.bidId}/ad`);
          const adId = resAd.data.ad_id;
          console.log('El valor de adId es:', adId);
          console.log('Emitiendo evento payment-success con adId:', adId);
          this.$emit('payment-success', { adId });
          this.$emit('close-ad-detail');

          } else {
            console.warn('El servidor no confirmó el pago como exitoso.');
          }
        } catch (error) {
          console.error('Error actualizando el estado de pago:', error);
        } finally {
          this.isProcessingPayment = false;
        }
      }
    },

    goToPayment(bid) {
      this.isProcessingPayment = true;

      const externalUrl = 'http://localhost:5174/payment';
      if (externalUrl.startsWith('http://localhost')) {
        const newWindow = window.open(externalUrl, '_blank');

        setTimeout(() => {
          newWindow.postMessage({
            bid: {
              id: bid.id,
              amount: bid.bid
            }
          }, 'http://localhost:5174');
        }, 500);
      }
    },

    async fetchAdData() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/ads/${this.id}`);
        if (res.data.success) {
          this.adData = res.data.data;
          console.log("Anuncio obtenido:", this.adData);
        }
      } catch (err) {
        console.error("Error al obtener el anuncio:", err);
      }
    },
    async fetchUser() {
      try {
        const userStr = localStorage.getItem("user");
        this.user = JSON.parse(userStr);
      } catch (err) {
        console.error("No se pudo obtener el usuario:", err);
      }
    },
    async fetchBids() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/offers/ad/${this.id}`);
        if (res.data.success) {
          this.bids = res.data.data;
        }
      } catch (err) {
        console.error("Error al obtener pujas:", err);
      }
    },
    toggleBidGrid() {
      this.showBidGrid = !this.showBidGrid;
      this.showNewBidRow = this.showBidGrid;
    },
    async submitNewBid() {
      if (!this.newBid.bid || !this.newBid.description) return;

      this.isSubmitting = true;

      try {
        const response = await userService.set('offers', {
          bid: this.newBid.bid,
          description: this.newBid.description,
          ad_id: this.adData.id,
          user_id: this.user.id,
          is_valid: true
        });

        if (response.data.success) {
          const newBid = response.data.data;
          this.toast.success('Puja enviada con éxito');
          if (!newBid.user) {
            await this.fetchBids();
          } else {
            this.bids.unshift(newBid);
          }
          this.newBid = { bid: null, description: '' };
          this.showNewBidRow = false;
          this.showBidGrid = false;
        }
      } catch (error) {
        console.error("Error al añadir la puja:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async removeBid(bidId) {
      try {
        const response = await userService.delete(`http://127.0.0.1:8000/api/offers/${bidId}`);
        if (response.data.success) {
          this.bids = this.bids.filter(bid => bid.id !== bidId);
          this.toast.success('Puja eliminada con éxito');
        }
      } catch (err) {
        console.error("Error al eliminar puja:", err);
      }
    },
    async openChat(receiver) {
      if (this.user.is_pro) {
        this.selectedReceiver = this.adData.user;
      } else {
        this.selectedReceiver = receiver;

      }
      this.showChatModal = true;
    },
    openPaymentModal(bid) {
      this.selectedBid = bid;
      this.showPaymentModal = true;
    },
    closePaymentModal() {
      this.showPaymentModal = false;
      this.selectedBid = null;
    }
  }
};
</script>

<style scoped>
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #3b82f6;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>