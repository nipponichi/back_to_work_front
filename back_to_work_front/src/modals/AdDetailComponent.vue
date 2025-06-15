<template>
  <div class="p-6 bg-white/5 backdrop-blur-lg rounded-2xl shadow-md">
    <span v-if="adData?.pro_is_done === 1 && adData?.customer_is_done !== 1" class="text-yellow-600">
      <i class="pi pi-info-circle"></i> Esperando confirmación del cliente
    </span>
    <span v-else-if="adData?.pro_is_done === 1 && adData?.customer_is_done === 1" class="text-green-600">
      <i class="pi pi-check-circle"></i> Trabajo completado
    </span>
    <div class="flex items-center gap-4 border-b border-white/10 pb-4 mb-4">
      <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-600 shadow-md">
        <img
          :src="getUserImage(adData?.user)"
          class="w-full h-full object-cover"
          alt="Usuario"
        />
      </div>
      <div class="flex flex-col">
        <span
          class="text-white font-semibold text-base cursor-pointer flex items-center gap-2"
          @click.stop="openUserstats(adData?.user)"
          title="Ver valoraciones"
        >
          {{ adData?.user?.user_name }}
          <span class="text-sm text-blue-300 bg-white/10 rounded-full px-2 py-0.5 transition hover:bg-white/20">
            ★ {{ adData?.user?.user_stat?.length || 0 }}
          </span>
        </span>
        <span
          v-if="adData?.user?.user_stat?.length"
          class="text-xs mt-1"
          :class="{
            'text-red-400': averageRating(adData?.user) < 3,
            'text-amber-400': averageRating(adData?.user) >= 3 && averageRating(adData?.user) < 4,
            'text-green-400': averageRating(adData?.user) >= 4
          }"
        >
          Feedback {{ averageRating(adData?.user).toFixed(1) }} / 5
        </span>
        <span
          v-else
          class="text-xs text-blue-200 mt-1 italic"
        >
          Aún no tiene valoraciones
        </span>
      </div>
    </div>
    <div v-if="adData" class="p-8 space-y-6">
      <h2 class="text-3xl font-bold text-center text-white">{{ adData.name }}</h2>
      <p class="text-center text-blue-200 text-base">{{ adData.description }}</p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-3">
        <div class="flex-1 px-3 py-2 bg-white/10 rounded-md text-center">
          <p class="text-blue-300 text-xs uppercase tracking-wide">Categoría</p>
          <p class="text-white text-sm font-medium">{{ adData.category_name }}</p>
        </div>
        <div class="flex-1 px-3 py-2 bg-white/10 rounded-md text-center">
          <p class="text-blue-300 text-xs uppercase tracking-wide">Ubicación</p>
          <p class="text-white text-sm font-medium">{{ adData.location }}</p>
        </div>
      </div>
      <div v-if="adData?.pictures?.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <div v-for="(picture, index) in adData.pictures" :key="picture.id"
          class="relative group rounded-lg overflow-hidden border border-white/20"
        >
          <img :src="baseImgUrl + picture.path" :alt="'Imagen ' + (index + 1) + ' - ' + adData.name"
            class="w-full h-28 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer rounded-xl"
            @click="openLightbox(index)"
          />
          <span class="absolute top-1 left-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
            {{ index + 1 }}/{{ adData.pictures.length }}
          </span>
        </div>
      </div>
      <div v-else class="text-blue-200 italic mt-2">
        Este anuncio no tiene imágenes
      </div>
    </div>
    <div v-if="user?.is_pro" class="flex flex-col sm:flex-row justify-center gap-4 mt-6">
      <button
        @click="openChat(adData.user)"
        class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-200"
      >
        <i class="pi pi-comments mr-2"></i> Chatear con el cliente
      </button>
      <button @click="toggleBidGrid"
        class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
      >
        <i class="pi pi-plus-circle mr-2"></i> Hacer una oferta
      </button>
    </div>
    <div v-if="showBidGrid" class="mt-6">
      <div class="overflow-x-auto bg-blue-900 shadow-md rounded-md">
        <table class="min-w-full text-sm">
          <tbody>
            <tr v-if="showNewBidRow" class="border-b">
              <td class="px-2 py-2 w-1/3">
                <input
                  v-model="newBid.bid"
                  type="number"
                  class="w-full px-2 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Monto"
                />
              </td>
              <td class="px-2 py-2 w-1/2">
                <input
                  v-model="newBid.description"
                  type="text"
                  class="w-full px-2 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Descripción"
                />
              </td>
              <td class="px-2 py-2 w-20 text-center">
                <button
                  @click="submitNewBid"
                  class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm transition"
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

    <div v-if="bids.length > 0" class="w-full rounded-lg shadow-xl overflow-hidden border border-white/20 mt-6">
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
          <Column field="user_name" header="Usuario" :sortable="true">
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
                  @click="openClaim(data?.id, data?.user)"
                  title="Reportar problema"
                />
                <Button
                  v-if="data?.is_paid && ((user?.is_pro && !adData?.pro_is_done) || (!user?.is_pro && adData?.pro_is_done && !adData?.customer_is_done))"
                  icon="pi pi-check"
                  class="p-button-text p-button-success hover:bg-green-100"
                  @click="markAsDone(adData.id)"
                  :title="user?.is_pro ? 'Marcar como completado' : 'Confirmar finalización'"
                />
                <Button 
                  v-if="user && data.user && data.user.id === user.id && !data.is_paid"
                  icon="pi pi-trash" 
                  class="p-button-text p-button-danger"
                  title="Eliminar oferta"
                  @click="removeBid(data.id)"
                />
                <Button
                  v-if="(user && data.user && data.user.id === user.id) || (!user.is_pro && (paidbid.id === data.id || !paidbid.id))"
                  icon="pi pi-comment" 
                  class="p-button-text p-button-danger" 
                  @click="openChat(data.user)"
                  title="Iniciar chat"
                />
                <Button 
                  v-if="!user.is_pro && !paidbid.is_paid"
                  icon="pi pi-money-bill" 
                  class="p-button-text p-button-danger"
                  title="Enviar pago"
                  @click="goToPayment(data)"
                />
                <span v-if="data.is_paid" class="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Pagada
                </span>
              </div>
            </template>
          </Column>
      </DataTable>
    </div>

    <div v-else-if="user?.is_pro" class="mt-6 p-8 bg-blue-900/20 rounded-lg text-center">
      <p class="text-white text-xl font-semibold mb-2">Sé el primero en hacer una oferta por este proyecto</p>
      <p class="text-blue-200">Aprovecha la oportunidad de destacar y consigue este trabajo antes que nadie.</p>
    </div>
    <div v-else class="p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 text-center mt-6">
      <div class="flex flex-col items-center space-y-4">
        <div class="w-20 h-20 flex items-center justify-center rounded-full bg-blue-600/20">
          <i class="pi pi-inbox text-4xl text-blue-300"></i>
        </div>
        <h3 class="text-2xl font-semibold text-white">No tienes ofertas todavía</h3>
        <p class="text-blue-200 max-w-md">
          ¡Empezarán a llegar muy pronto!
        </p>
        <RouterLink 
          to="/contact"
          class="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition"
        >
          Contactar soporte
        </RouterLink>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="showChatModal"
        class="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-gradient-to-br from-blue-950/90 to-blue-800/90 rounded-l-xl shadow-xl flex flex-col transition-all duration-300"
        style="pointer-events: auto"
      >
        <div class="flex justify-between items-center px-4 py-3 border-b border-white/10">
          <button @click="showChatModal = false"
                  class="text-red-500 hover:text-red-700 tex-2xl font-bold bg-transparent cursor-pointer focus:outline-none transition">
        <i class="pi pi-caret-right py-4"></i>
          </button>
        </div>

        <div class="p-4 overflow-y-auto flex-1">
          <ChatComponent 
            :ad_id="id"
            :sender="user"
            :receiver="selectedReceiver"
            :roomId="chat-123-456" 
          />
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="isProcessingPayment" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="flex flex-col items-center space-y-4">
          <div class="spinner"></div>
          <span class="text-white text-lg font-semibold">Procesando pago...</span>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
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
          />
          
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
    </Teleport>

    <Teleport to="body">
      <div v-if="openAdRatingModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-gradient-to-br from-blue-950/90 to-blue-800/90 rounded-xl shadow-xl w-full max-w-3xl mx-4">
          <div class="flex justify-between items-center px-6 py-4 border-b border-white/20">
            <h3 class="text-lg leading-6 font-semibold text-white">
              Sobre este usuario
            </h3>
            <button @click="openAdRatingModal = false"
                    class="text-red-500 hover:text-red-700 bg-transparent cursor-pointer focus:outline-none transition">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="p-6 max-h-[80vh] overflow-y-auto">
            <AdRatingComponent :sender="sender" :adData="adData" :receiver="receiver" @rating-submitted="onRatingSubmitted"/>
          </div>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="openClaimModal" class="fixed z-[60] inset-0 overflow-y-auto">
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
              <button @click="openClaimModal = false"
                      class="text-red-500 hover:text-red-700 bg-transparent cursor-pointer focus:outline-none transition">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div class="p-6">
              <ClaimsFormComponent
                :receiver="selectedReceiver"
                :bid_id="selectedBidId"
                @update:visible="openClaimModal = $event"
                @claim-created="onClaimCreated"
              />
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="openUserstatsModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black bg-opacity-70 z-40"></div>
        <div class="relative z-50 bg-gradient-to-br from-blue-950/90 to-blue-800/90 rounded-xl shadow-xl w-full max-w-3xl mx-4">
          <div class="flex justify-between items-center px-6 py-4 border-b border-white/20">
            <h3 class="text-lg leading-6 font-semibold text-white">
              Sobre este usuario
            </h3>
            <button @click="openUserstatsModal = false"
                    class="text-red-500 hover:text-red-700 bg-transparent cursor-pointer focus:outline-none transition">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="p-6 max-h-[80vh] overflow-y-auto">
            <UserRatingComponent :user="selectedUser" />
          </div>
        </div>
      </div>
    </Teleport>
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
import AdRatingComponent from './AdRatingComponent.vue';
import ClaimsFormComponent from './ClaimsFormComponent.vue';
import PaymentForm from '../components/PaymentForm.vue'
import UserRatingComponent from '../modals/UserRatingComponent.vue';

export default {
  components: {
    ChatComponent,
    Dialog,
    DataTable,
    Button,
    Column,
    Tooltip,
    AdRatingComponent,
    ClaimsFormComponent,
    PaymentForm,
    UserRatingComponent
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      baseImgUrl: import.meta.env.VITE_IMG_URL,
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
      openAdRatingModal: false,
      openClaimModal: false,
      categories: [],
      paidbid: {},
      sender: null,
      receiver: null,
      openUserstatsModal: false,
      selectedUser: null,
      selectedBidId: null,
      baseImgUrl: import.meta.env.VITE_IMG_URL,
    };
  },
  async mounted() {
    //window.addEventListener('message', this.receiveMessage);
    await this.fetchCategories();
    await this.fetchAdData();
    await this.fetchUser();
    await this.fetchBids();

    if (this.adData.pictures && this.adData.pictures.length > 0) {
      console.log('URL de imagen:', import.meta.env.VITE_IMG_URL + this.adData.pictures[0].path);
    } else {
      console.log('No hay imágenes en este anuncio');
    }

  },

  beforeUnmount() {
    //window.removeEventListener('message', this.receiveMessage);
  },

  methods: {
    openUserstats(user) {
      this.selectedUser = user;
      this.openUserstatsModal = true;
    },

    averageRating(user) {
      if (!user?.user_stat?.length) return 0
      const total = user?.user_stat.reduce((sum, s) => sum + s.rating, 0)
      return total / user?.user_stat.length
    },

    getUserImage(user) {
      const fallback = 'https://cdn-icons-png.flaticon.com/512/11461/11461171.png';
      if (!user || !user?.image) return fallback;
      return `${this.baseImgUrl}/${user?.image}`;
    },

    openClaim(bidId, user) {
      this.selectedBidId = bidId
      this.selectedReceiver = user
      this.openClaimModal = true

    },

    onRatingSubmitted(newRating) {
      this.openAdRatingModal = false;
      this.adData.user.user_data;
      console.log(this.adData)
      this.updateUser(newRating);
      this.updateAd(this.adData);
    },

    async markAsDone(id) {
      try {
        const response = await userService.set("ad/done", {id: id});
        if (response.data.success) {
          if (this.user?.is_pro) {
            this.adData.pro_is_done = true;
            this.openAdRatingModal = true;
            this.sender = this.user;
            this.receiver = this.adData.user;
            this.toast.success("Has marcado este trabajo como completado. Esperando confirmación del cliente.");
          } else {
            this.adData.customer_is_done = true;
            this.sender = this.user;
            this.receiver = this.bids.find(bid => bid.ad_id === id)?.user;
            this.openAdRatingModal = true;
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
        const res = await userService.get('categories');
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
        try {
          const res = await axios.post(`http://127.0.0.1:8000/api/offers/${data.bidId}/mark-paid`);

          if (res.data.success) {
            await this.fetchBids();
            
          const resAd = await axios.get(`http://127.0.0.1:8000/api/offers/${data.bidId}/ad`);
          const adId = resAd.data.ad_id;
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

    async goToPayment(bid) {
      this.isProcessingPayment = true;

      try {
        const response = await userService.set('checkout', {
          amount: bid.bid * 100,
          bid_id: bid.id
        });

        window.location.href = response.data.url;
      } catch (error) {
        console.error('Error creando sesión de pago:', error);
        this.toast.error('Error al iniciar el pago');
      } finally {
        this.isProcessingPayment = false;
      }
    },

    async fetchAdData() {
      try {
        const res = await userService.show('ads', this.id);
        if (res.data.success) {
          this.adData = res.data.data;
          console.log(this.adData)
          this.adData.category_name = this.getCategoryName(this.adData.category_id);
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
        const res = await userService.show('offers/ad', this.id);
        if (res.data.success) {
          this.bids = res.data.data;
          this.bids.forEach(bid => {
            if (bid.is_paid) {
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
        const response = await userService.delete('offers', bidId);
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
    },

    updateUser(newRating) {
      this.adData?.user?.user_stat.push(newRating)
      this.$emit('updateUser', this.adData?.user);
    },
    updateAd(adData) {
      this.$emit('updateAd', adData);
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