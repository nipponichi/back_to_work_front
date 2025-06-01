<template>
  <div class="p-6 bg-white/5 backdrop-blur-lg rounded-2xl shadow-md">
    <span v-if="adData?.pro_is_done === 1 && adData?.customer_is_done !== 1" class="text-yellow-600">
      <i class="pi pi-info-circle"></i> Esperando confirmación del cliente
    </span>
    <span v-else-if="adData?.pro_is_done === 1 && adData?.customer_is_done === 1" class="text-green-600">
      <i class="pi pi-check-circle"></i> Trabajo completado
    </span>

    <div v-if="adData" class="p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center text-white">{{ adData.name }}</h2>
      <p class="mt-4 text-white">{{ adData.description }}</p>
      <p class="mt-2 text-white">Categoría: {{ adData.category_name }}</p>
      <p class="mt-2 text-white">Ubicación: {{ adData.location }}</p>

      <div v-if="adData?.pictures && adData?.pictures?.length > 0" class="mt-4">
        <h3 class="font-medium text-white mb-2">
          Imágenes del anuncio ({{ adData.pictures.length }}):
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div v-for="(picture, index) in adData.pictures" :key="picture.id" class="relative">
            <img 
              :src="baseImgUrl + picture.path" 
              :alt="'Imagen ' + (index + 1) + ' - ' + adData.name"
              class="w-full h-32 object-cover rounded-lg border border-gray-200 hover:shadow-md cursor-pointer"
              @click="openLightbox(index)"
            >
            <span class="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              {{ index + 1 }}/{{ adData.pictures.length }}
            </span>
          </div>
        </div>

        <div 
          v-if="lightbox.isOpen" 
          class="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4"
          @click.self="lightbox.isOpen = false"
        >
          <button
            @click="lightbox.isOpen = false"
            class="absolute top-6 right-6 text-white bg-gray-800 text-4xl z-[10000] hover:bg-gray-600 transition-colors focus:outline-none"
            aria-label="Cerrar lightbox"
          >
            &times;
          </button>

          <div class="relative w-full max-w-6xl h-full flex items-center justify-center">
            <img 
              :src="baseImgUrl + adData.pictures[lightbox.currentIndex].path" 
              class="max-h-[90vh] max-w-full object-contain"
              :alt="'Imagen ' + (lightbox.currentIndex + 1) + ' de ' + adData.name"
            >
            <button
              @click.stop="prevImage"
              class="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-gray-700 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center transition-all"
              aria-label="Imagen anterior"
            >
              &larr;
            </button>
            <button
              @click.stop="nextImage"
              class="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-gray-700 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center transition-all"
              aria-label="Imagen siguiente"
            >
              &rarr;
            </button>
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-lg px-4 py-2 rounded-full">
              Imagen {{ lightbox.currentIndex + 1 }} de {{ adData.pictures.length }}
            </div>
          </div>
        </div>
      </div>

      <div v-else class="mt-4 text-gray-500">
        Este anuncio no tiene imágenes
      </div>
    </div>

    <div v-if="user?.is_pro && bids.length === 0" class="p-8 bg-white rounded-2xl shadow-xl border border-gray-200 text-center">
      <h3 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        Este anuncio todavía no tiene ofertas
      </h3>
      <p class="text-gray-600 mb-6">
        ¡Sé el primero en hacer una propuesta o chatea con el cliente si tienes alguna duda!
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button
          @click="toggleBidGrid"
          class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
        >
          <i class="pi pi-plus-circle mr-2"></i> Hacer una oferta
        </button>
        <button
          @click="openChat(adData.user)"
          class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
        >
          <i class="pi pi-comments mr-2"></i> Chatear con el cliente
        </button>
      </div>
    </div>
    <div v-if="bids.length > 0" class="flex flex-col mt-6 sm:flex-row justify-center gap-4">
      <button
          @click="toggleBidGrid"
          class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
        >
          <i class="pi pi-plus-circle mr-2"></i> Hacer una oferta
        </button>
        <button
          @click="openChat(adData.user)"
          class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
        >
          <i class="pi pi-comments mr-2"></i> Chatear con el cliente
        </button>
    </div>

<div v-if="showBidGrid" class="mt-6">
  <div class="overflow-x-auto bg-blue-900 shadow-md rounded-md">
    <table class="min-w-full text-sm">
      <tbody>
        <tr v-if="showNewBidRow" class="border-b">
          <td>
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

<div class="w-full rounded-2xl shadow-xl overflow-hidden border border-white/20 mt-6">
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
            <span :class="{'font-semibold': data.is_paid}">
              {{ data.user?.name || 'Desconocido' }}
            </span>
          </template>
        </Column>
        
        <Column field="bid" header="Monto" :sortable="true">
          <template #body="{data}">
            <span>
              {{ data.bid }} €
              <i v-if="data.is_paid" class="pi pi-check-circle ml-2"></i>
            </span>
          </template>
        </Column>
        
        <Column field="description" header="Descripción" :sortable="true">
          <template #body="{data}">
            <span>
              {{ data.description }}
            </span>
          </template>
        </Column>
        
        <Column header="Acciones" headerStyle="display:flex; justify-content: center;" bodyClass="text-center">
          <template #body="{data}">
            <div class="flex items-center justify-center space-x-2">
              <Button
                v-if="data.is_paid"
                icon="pi pi-exclamation-triangle"
                class="p-button-text p-button-warn"
                @click="reportWork(data.id)"
                v-tooltip="'Reportar problema'"
              />
              <Button
                v-if="data.is_paid && ((user?.is_pro && adData.pro_is_done !== 1) || (!user?.is_pro && adData.pro_is_done === 1 && adData.customer_is_done !== 1))"
                icon="pi pi-check"
                class="p-button-text p-button-success hover:bg-green-100"
                @click="markAsDone(adData.id)"
                v-tooltip="user?.is_pro ? 'Marcar como completado' : 'Confirmar finalización'"
              />
              <Button 
                v-if="user && data.user && data.user.id === user.id"
                icon="pi pi-trash" 
                class="p-button-text p-button-danger" 
                @click="removeBid(data.id)"
              />
              <Button
                v-if="(user && data.user && data.user.id === user.id) || (!user.is_pro && (paidbid.id === data.id || !paidbid.id))"
                icon="pi pi-comment" 
                class="p-button-text p-button-danger" 
                @click="openChat(data.user)"
                v-tooltip="'Iniciar chat'"
              />
              <Button 
                v-if="!user.is_pro && !paidbid.is_paid"
                icon="pi pi-money-bill" 
                class="p-button-text p-button-danger" 
                @click="goToPayment(data)"
              />
              <span v-if="data.is_paid" class="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                Pagada
              </span>
            </div>
          </template>
        </Column>

        <template #emptymessage>
          <div class="p-4 text-center text-gray-500">
            No hay pujas registradas para este anuncio
          </div>
        </template>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="showRatingModal"
      header="Valora este anuncio"
      :modal="true"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      headerClass="border-b border-gray-200 p-4 font-semibold text-lg"
      contentClass="p-4"
    />

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

    <div v-if="isProcessingPayment" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="flex flex-col items-center space-y-4">
        <div class="spinner"></div>
        <span class="text-white text-lg font-semibold">Procesando pago...</span>
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
      selectedReceiver: null,
      showPaymentModal: false,
      selectedBid: null,
      isProcessingPayment: false,
      categories: [],
      paidbid: {},
    };
  },

  async mounted() {
    window.addEventListener('message', this.receiveMessage);
    await this.fetchCategories();
    await this.fetchAdData();
    await this.fetchUser();
    console.log("antes de pujas")
    await this.fetchBids();


    if (this.adData.pictures && this.adData.pictures.length > 0) {
      console.log('URL de imagen:', import.meta.env.VITE_IMG_URL + this.adData.pictures[0].path);
    } else {
      console.log('No hay imágenes en este anuncio');
    }
  },

  beforeUnmount() {
    window.removeEventListener('message', this.receiveMessage);
  },

  methods: {
    async markAsDone(id) {
      try {
        const response = await userService.set("ad/done", {id: id});
        if (response.data.success) {
          if (this.user?.is_pro) {
            this.adData.pro_is_done = 1;
            this.toast.success("Has marcado este trabajo como completado. Esperando confirmación del cliente.");
          } else {
            this.adData.customer_is_done = 1;
            this.toast.success("Has confirmado la finalización del trabajo.");
          }
          await this.fetchBids();
        }
      } catch (error) {
        console.error("Error al marcar la puja como completada:", error);
        this.toast.error("Error al completar la puja");
      }
    },
    async fetchCategories() {
      try {
        const response = await userService.get("categories");
        if (response.data.success) {
          this.categories = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

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
      console.log(bid)
      this.isProcessingPayment = true;

      const externalUrl = import.meta.env.VITE_PAYMENT_API_URL + '/payment';
      if (externalUrl.startsWith('http://localhost')) {
        const newWindow = window.open(externalUrl, '_blank');

        setTimeout(() => {
          newWindow.postMessage({
            bid: {
              id: bid.id,
              amount: bid.bid
            }
          }, import.meta.env.VITE_PAYMENT_API_URL);
        }, 500);
      }
    },

    async fetchAdData() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/ads/${this.id}`);
        if (res.data.success) {
          this.adData = res.data.data;
          console.log(this.adData)
        if (this.adData.pictures && this.adData.pictures.length > 0) {
          console.log('URL de imagen:', import.meta.env.VITE_IMG_URL + this.adData.pictures[0].path);
        } else {
          console.log('No hay imágenes en este anuncio');
        }

          this.adData.category_name = this.getCategoryName(this.adData.category_id);
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
          this.bids.forEach(bid => {
            console.log(this.bids);
            if (bid.is_paid === 1) {
              this.paidbid = bid;
            }
          });
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
          is_paid: false,
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
.bg-green-50 {
  background-color: rgba(209, 250, 229, 0.5) !important;
  border-left: 4px solid #10b981 !important;
}
</style>