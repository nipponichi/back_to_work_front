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
            <!-- Mostrar pujas existentes -->
            <tr v-for="(bid, index) in bids" :key="bid.id" class="border-b">
              <!--<td class="px-6 py-3">{{ bid.userName || `Usuario ${bid.user_id}` }}</td> -->
              <!-- Mostrar nombre de usuario o ID -->
              <td class="px-6 py-3">{{ bid.user_id }}</td>
              <td class="px-6 py-3">{{ bid.bid }}</td> <!-- Monto de la puja -->
              <td class="px-6 py-3">{{ bid.description }}</td> <!-- Descripción -->
              <td class="px-6 py-3">
                <button @click="removeBid(bid.id)" class="text-red-500 hover:text-red-700">
                  Eliminar
                </button>
              </td>
            </tr>
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
      bids: [], // Empezamos con un array vacío para las pujas
      users: [], // Para almacenar los datos de los usuarios
      newBid: { bid: '', description: '' }, // Para manejar la nueva puja
    };
  },
  async mounted() {
    await this.fetchAdData();
    await this.fetchCategories();
    await this.fetchBids(); // Llamada para obtener las pujas
    await this.fetchUsers(); // Llamada para obtener los usuarios
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
          // Asignar las pujas recibidas
          this.bids = response.data.data.map(offer => ({
            id: offer.id,
            user_id: offer.user_id,
            bid: offer.bid,
            description: offer.description
          }));
          console.log("Bids:", this.bids);
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    },
    async fetchUsers() {
      try {
        const userIds = this.bids.map(bid => bid.user_id);
        if (userIds.length > 0) {
          const response = await axios.get(`http://127.0.0.1:8000/api/users`, {
            params: { ids: userIds.join(',') }
          });
          if (response.data.success) {
            this.users = response.data.data;
            this.assignUserNamesToBids();
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    assignUserNamesToBids() {
      this.bids.forEach(bid => {
        const user = this.users.find(user => user.id === bid.user_id);
        if (user) {
          bid.userName = user.name; // Asignar el nombre del usuario a la puja
        }
      });
      console.log("Bids with user names:", this.bids);
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
      if (this.showBidGrid && this.bids.length === 0) {
        this.fetchBids(); // Obtener pujas solo si no se han cargado previamente
      }
    },
    submitNewBid() {
      const data = {
        bid: this.newBid.bid,
        description: this.newBid.description,
        ad_id: this.id, // Anuncio relacionado
        user_id: 1, //user_id actual
        is_valid: true, // Añadir el campo is_valid a true
      };

      console.log(data);

      axios.post('http://127.0.0.1:8000/api/offers', data)
        .then(response => {
          // Añadir la puja localmente
          const newBid = {
            id: response.data.id,
            user_id: 1,
            userName: "Nuevo Usuario", // O el nombre correcto del usuario
            bid: this.newBid.bid,
            description: this.newBid.description
          };
          this.bids.push(newBid); // Añadir a la lista local de pujas
          this.newBid = { bid: '', description: '' }; // Limpiar el formulario
        })
        .catch(error => {
          console.error("Error adding new bid:", error);
        });
    },
    removeBid(bidId) {
      axios.delete(`http://127.0.0.1:8000/api/offers/${bidId}`)
        .then(() => {
          // Eliminar la puja localmente sin recargar toda la lista
          this.bids = this.bids.filter(bid => bid.id !== bidId);
        })
        .catch(error => {
          console.error("Error deleting bid:", error);
        });
    }
  }
};
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1/1;
}
</style>
