<template>
  <div class="space-y-6">
    <!-- Detalle del anuncio -->
    <div v-if="adData" class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700">{{ adData.name }}</h2>
      <p class="mt-4 text-gray-600">{{ adData.description }}</p>
      <p class="mt-2 text-gray-600">Categoría: {{ adData.category_id }}</p>
      <p class="mt-2 text-gray-600">Ubicación: {{ adData.location }}</p>
      <p v-if="adData.due_date" class="mt-2 text-gray-600">Fecha de finalización: {{ adData.due_date }}</p>
    </div>

    <!-- Grid de nueva puja -->
    <div v-if="showBidGrid" class="mt-6">
      <div class="overflow-x-auto bg-white shadow-md rounded-md">
        <table class="min-w-full text-sm">
          <tbody>
            <tr v-if="showNewBidRow" class="border-b">
              <td class="px-6 py-3">{{ loggedInUser ? loggedInUser.name : 'Usuario no logado' }}</td>
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

    <!-- Pujas existentes -->
    <div v-if="bids.length > 0" class="mt-6">
      <h3 class="text-lg font-semibold mb-4">Pujas</h3>
      <div class="overflow-x-auto bg-white shadow-md rounded-md">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-6 py-3 text-left">Usuario</th>
              <th class="px-6 py-3 text-left">Monto</th>
              <th class="px-6 py-3 text-left">Descripción</th>
              <th class="px-6 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bid in bids" :key="bid.id" class="border-b">
              <td class="px-6 py-3">{{ bid.user?.name || 'Desconocido' }}</td>
              <td class="px-6 py-3">{{ bid.bid }}</td>
              <td class="px-6 py-3">{{ bid.description }}</td>
              <td class="px-6 py-3 space-x-2">
                <template v-if="loggedInUser && bid.user && bid.user.id === loggedInUser.id">
                  <button @click="removeBid(bid.id)" class="text-red-500 hover:text-red-700">
                    Eliminar
                  </button>
                </template>
                <button @click="goToPayment(bid)" class="text-blue-500 hover:text-blue-700">
                  ✅
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Botones -->
    <div class="mt-6 text-center">
      <button
        @click="toggleBidGrid"
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {{ showBidGrid ? 'Cerrar Pujas' : 'Pujar' }}
      </button>
      <button
        @click="chat"
        class="ml-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Chatear
      </button>
    </div>

    <!-- Modal de SimulatedPayment -->
    <div v-if="showPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 relative w-[90%] max-w-md">
        <!-- Botón de cierre (aspa) -->
        <button @click="showPaymentModal = false" class="absolute top-2 right-2 text-gray-600 hover:text-black text-lg">
          &times;
        </button>

        <!-- Componente SimulatedPayment con evento close para cerrar modal -->
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

export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  components: {
  },
  data() {
    return {
      adData: null,
      bids: [],
      newBid: {
        bid: null,
        description: ''
      },
      loggedInUser: null,
      showBidGrid: false,
      showNewBidRow: false,
      isSubmitting: false,
      showPaymentModal: false,
      selectedBid: null
    };
  },
  async mounted() {
    window.addEventListener('message', this.receiveMessage);
    await this.fetchAdData();
    await this.fetchLoggedInUser();
    await this.fetchBids();
  },

  beforeUnmount() {
    window.removeEventListener('message', this.receiveMessage);
  },
  methods: {
  
    async receiveMessage(event) {
  // Validar origen (ajustar para producción)
  if (event.origin !== 'http://localhost:5174') return;

  const data = event.data;

  if (data && data.PaymentOK === true && data.offerId) {
    console.log(`Pago OK recibido para la puja: ${data.offerId}`);

    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/offers/${data.offerId}/mark-paid`);

      if (res.data.success) {
        await this.fetchBids(); // Refrescar lista de pujas
        this.$emit('close-ad-detail');   // Emitir evento para cerrar modal de detalles
      } else {
        console.warn('El servidor no confirmó el pago como exitoso.');
      }
    } catch (error) {
      console.error('Error actualizando el estado de pago:', error);
      // Opcional: mostrar notificación al usuario
    }
  }
},
goToPayment(bid) {
  console.log("AQUI");
  const externalUrl = 'http://localhost:5174/payment';
  if (externalUrl.startsWith('http://localhost')) {
    const newWindow = window.open(externalUrl, '_blank');

    setTimeout(() => {
      newWindow.postMessage({
        bid: {
          id: bid.id,
          amount: bid.bid
        }
      }, 'http://localhost:5174'); // Debe ser la URL de origen exacta o '*'
    }, 500);
  }
},

    async fetchAdData() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/ads/${this.id}`);
        if (res.data.success) {
          this.adData = res.data.data;
        }
      } catch (err) {
        console.error("Error al obtener el anuncio:", err);
      }
    },
    async fetchLoggedInUser() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        this.loggedInUser = user;
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
      if (this.showBidGrid) {
        this.showNewBidRow = false;
        this.showBidGrid = false;
      } else {
        this.showNewBidRow = true;
        this.showBidGrid = true;
      }
    },
    async submitNewBid() {
      if (!this.newBid.bid || !this.newBid.description) return;

      this.isSubmitting = true;

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/offers', {
          bid: this.newBid.bid,
          description: this.newBid.description,
          ad_id: this.adData.id,
          user_id: this.loggedInUser.id,
          is_valid: true
        });

        if (response.data.success) {
          const newBid = response.data.data;
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
        const response = await axios.delete(`http://127.0.0.1:8000/api/offers/${bidId}`);
        if (response.data.success) {
          this.bids = this.bids.filter(bid => bid.id !== bidId);
        }
      } catch (err) {
        console.error("Error al eliminar puja:", err);
      }
    },
    chat() {
      alert('Función de chat no implementada aún');
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
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
