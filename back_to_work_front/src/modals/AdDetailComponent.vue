<template>
  <div class="space-y-6">
    <!-- Nombre -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Nombre:</label>
      <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
        {{ adData.name }}
      </div>
    </div>

    <!-- Location -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Location:</label>
      <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
        {{ adData.location }}
      </div>
    </div>

    <!-- Categoría -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Categoría:</label>
      <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
        {{ getCategoryName(adData.category_id) }}
      </div>
    </div>

    <!-- Descripción -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Descripción:</label>
      <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 whitespace-pre-line">
        {{ adData.description }}
      </div>
    </div>

    <!-- Media -->
    <div class="mb-6" v-if="adData.pictures && adData.pictures.length">
      <label class="block text-gray-700 font-medium mb-2">Fotos:</label>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div v-for="(picture, index) in adData.pictures" :key="index" class="relative">
          <div class="rounded border border-gray-200 overflow-hidden bg-gray-100 aspect-square">
            <img :src="getImageUrl(picture.path)" 
                 class="w-full h-full object-cover"
                 :alt="`Imagen ${index + 1} del anuncio`">
          </div>
        </div>
      </div>
    </div>

    <!-- Estado -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Estado:</label>
      <div class="w-full px-3 py-2">
        <span :class="{
          'px-3 py-1 rounded-full text-sm font-medium': true,
          'bg-green-100 text-green-800': adData.is_done,
          'bg-yellow-100 text-yellow-800': !adData.is_done
        }">
          {{ adData.is_done ? 'Completado' : 'Pendiente' }}
        </span>
      </div>
    </div>

    <!-- Fecha -->
    <div class="mb-4" v-if="adData.due_date">
      <label class="block text-gray-700 font-medium mb-2">Fecha límite:</label>
      <div class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
        {{ formatDate(adData.due_date) }}
      </div>
    </div>

    <!-- Pujas -->
    <div v-if="showBidGrid" class="mt-6">
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
            <tr v-for="(bid, index) in bids" :key="bid.id" class="border-b">
              <td class="px-6 py-3">{{ bid.user_id }}</td> <!-- Asumimos que el campo usuario es 'user_id' -->
              <td class="px-6 py-3">{{ bid.bid }}</td> <!-- Monto de la puja -->
              <td class="px-6 py-3">{{ bid.description }}</td> <!-- Descripción -->
              <td class="px-6 py-3">
                <button @click="removeBid(bid.id)" class="text-red-500 hover:text-red-700">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="addBid" class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Añadir nueva puja
      </button>
    </div>

    <div class="mb-4 p-4">
      <div>
        <Button class="bg-amber-500 rounded p-4 mr-4 cursor-pointer hover:bg-amber-200" @click="toggleBidGrid">Pujar</Button>
        <Button class="bg-green-500 rounded p-4 cursor-pointer hover:bg-green-300">Chatear</Button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserService from '../services/api/user.service';

export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      adData: {
        name: '',
        description: '',
        category_id: '',
        location: '',
        is_done: false,
        due_date: null,
        pictures: []
      },
      categories: [],
      showBidGrid: false,
      bids: [] // Empezamos con un array vacío para las pujas
    };
  },
  async mounted() {
    await this.fetchAdData();
    await this.fetchCategories();
    await this.fetchBids(); // Llamada para obtener las pujas
  },
  methods: {
    async fetchAdData() {
      try {
        const response = await UserService.show(`ads/${this.id}`);
        if (response.data.success) {
          this.adData = response.data.data;
          console.log("Ad data:", this.adData);
        }
      } catch (error) {
        console.error("Error fetching ad data:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await UserService.get("categories");
        if (response.data.success) {
          this.categories = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchBids() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/offers/ad/${this.id}`);
        if (response.data.success) {
          this.bids = response.data.data.map(offer => ({
            id: offer.id,               // Asegurarnos de tener el ID de la puja
            user_id: offer.user_id,      // O como prefieras obtener el nombre de usuario
            bid: offer.bid,             // Monto de la puja
            description: offer.description  // Descripción de la puja
          }));
          console.log("Bids:", this.bids);
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.category : 'Sin categoría';
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    getImageUrl(path) {
      return `${'http://127.0.0.1:8000/storage'}/${path}`;
    },
    toggleBidGrid() {
      this.showBidGrid = !this.showBidGrid;
      if (this.showBidGrid) {
        this.fetchBids(); // Obtener pujas cuando se muestre el grid
      }
    },
    addBid() {
      const newBid = { user: 'Nuevo usuario', amount: 100, description: 'Nueva puja' };

      // Recoger los datos de la puja
      const data = {
        bid: newBid.amount,
        description: newBid.description,
        ad_id: this.id, // ID del anuncio
        user_id: 1, // Este valor debe venir del usuario autenticado
        is_valid: 1 // Asumimos que la puja es válida al añadirla
      };

      // Hacer la petición POST para agregar la nueva puja
      axios.post('http://127.0.0.1:8000/api/offers', data)
        .then(response => {
          if (response.data.success) {
            this.bids.push({
              user: 'Nuevo usuario',
              amount: newBid.amount,
              description: newBid.description
            });
            console.log("Puja añadida con éxito", response.data);
          } else {
            console.error("Error al añadir la puja", response.data);
          }
        })
        .catch(error => {
          console.error("Error al hacer la petición", error);
        });
    },
    async removeBid(bidId) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/offers/${bidId}`);
        if (response.data.success) {
          // Eliminar la puja de la lista local
          this.bids = this.bids.filter(bid => bid.id !== bidId);
          console.log("Puja eliminada con éxito");
        } else {
          console.error("Error al eliminar la puja", response.data);
        }
      } catch (error) {
        console.error("Error al hacer la petición de eliminación", error);
      }
    }
  }
}
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1/1;
}
</style>
