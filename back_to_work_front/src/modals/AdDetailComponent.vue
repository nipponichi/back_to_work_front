<template>
  <div class="space-y-6">
    <!-- Detalle del anuncio -->
    <div v-if="adData" class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700">{{ adData.name }}</h2>
      <p class="mt-4 text-gray-600">{{ adData.description }}</p>
      <p class="mt-2 text-gray-600">Categoría: {{ adData.category_id }}</p>
      <p class="mt-2 text-gray-600">Ubicación: {{ adData.location }}</p>
      <p class="mt-2 text-gray-600" v-if="adData.due_date">Fecha de finalización: {{ adData.due_date }}</p>
    </div>

    <!-- Grid de Pujas -->
    <div v-if="showBidGrid" class="mt-6">
      <div class="overflow-x-auto bg-white shadow-md rounded-md">
        <table class="min-w-full text-sm">
          <tbody>
            <!-- Fila vacía para nueva puja -->
            <tr class="border-b">
              <td class="px-6 py-3">Nuevo Usuario</td>
              <td class="px-6 py-3">
                <input v-model="newBid.bid" type="number" class="px-3 py-2 border border-gray-300 rounded-md" placeholder="Monto" />
              </td>
              <td class="px-6 py-3">
                <input v-model="newBid.description" type="text" class="px-3 py-2 border border-gray-300 rounded-md" placeholder="Descripción" />
              </td>
              <td class="px-6 py-3">
                <button @click="submitNewBid" class="text-green-500 hover:text-green-700">
                  Añadir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pujas -->
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
            <!-- Mostrar pujas existentes -->
            <tr v-for="(bid, index) in bids" :key="bid.id" class="border-b">
              <td class="px-6 py-3">{{ bid.user.name }}</td> <!-- Nombre del usuario -->
              <td class="px-6 py-3">{{ bid.bid }}</td> <!-- Monto de la puja -->
              <td class="px-6 py-3">{{ bid.description }}</td> <!-- Descripción -->
              <td class="px-6 py-3">
                <!-- Mostrar acciones solo si el usuario logado es el que hizo la puja -->
                <template v-if="loggedInUser && bid.user.id === loggedInUser.id">
                  <button @click="removeBid(bid.id)" class="text-red-500 hover:text-red-700">
                    Eliminar
                  </button>
                </template>
                <!-- Si no es el mismo usuario, no mostramos nada -->
                <template v-else>
                  <!-- Celda vacía en lugar de las acciones -->
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Botones Pujar y Chatear debajo del grid de pujas -->
    <div class="mt-6 text-center">
      <button 
        @click="toggleBidGrid"
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        {{ showBidGrid ? 'Cerrar Pujas' : 'Pujar' }}
      </button>
      <button 
        @click="chat"
        class="ml-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
        Chatear
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserService from '../services/api/user.service'; // Para obtener el usuario logado

export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      adData: null, // Aquí guardamos los datos del anuncio
      categories: [],
      bids: [], // Array para las pujas
      newBid: { bid: '', description: '' }, // Datos para una nueva puja
      loggedInUser: null, // Usuario logado
      bidsLoaded: false, // Flag para evitar recargar pujas
      showBidGrid: false, // Inicialmente el grid está oculto
    };
  },
  async mounted() {
    await this.fetchAdData();
    await this.fetchCategories();
    await this.fetchLoggedInUser(); // Obtener el usuario logado
    await this.fetchBids(); // Obtener las pujas del anuncio
  },
  methods: {
    async fetchAdData() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ads/${this.id}`);
        if (response.data.success) {
          this.adData = response.data.data; // Guardamos los detalles del anuncio
        }
      } catch (error) {
        console.error("Error fetching ad data:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        if (response.data.success) {
          this.categories = response.data.data; // Guardamos las categorías
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchLoggedInUser() {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Obtenemos el usuario logado desde el localStorage
        this.loggedInUser = user; // Guardamos el usuario logado
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    },
    async fetchBids() {
      if (this.bidsLoaded) return; // Evitar recargar las pujas si ya se cargaron
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/offers/ad/${this.id}`);
        if (response.data.success) {
          this.bids = response.data.data; // Guardamos las pujas
          this.bidsLoaded = true; // Marcamos que las pujas se han cargado
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    },
    toggleBidGrid() {
      this.showBidGrid = !this.showBidGrid; // Alternar la visibilidad del grid
    },
    submitNewBid() {
      const data = {
        bid: this.newBid.bid,
        description: this.newBid.description,
        ad_id: this.id,
        user_id: this.loggedInUser.id, // Usamos el user_id logado
        is_valid: true,
      };

      axios.post('http://127.0.0.1:8000/api/offers', data)
        .then((response) => {
          if (response.data.success) {
            this.bids.push(response.data.data); // Añadimos la nueva puja al listado
            this.newBid = { bid: '', description: '' }; // Limpiamos los campos del formulario
          }
        })
        .catch(error => {
          console.error("Error adding new bid:", error);
        });
    },
    removeBid(bidId) {
      axios.delete(`http://127.0.0.1:8000/api/offers/${bidId}`)
        .then((response) => {
          if (response.data.success) {
            this.bids = this.bids.filter(bid => bid.id !== bidId);
          }
        })
        .catch(error => {
          console.error("Error deleting bid:", error);
        });
    },
    chat() {
      // Función para manejar la lógica de chat (puedes implementarla más tarde)
      alert('Función de chat no implementada aún');
    }
  }
};
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1/1;
}
</style>
