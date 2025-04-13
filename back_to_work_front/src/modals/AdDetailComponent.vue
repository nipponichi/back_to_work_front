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
  </div>

  <div class="mb-4 p-4">
    <div>
      <Button class="bg-amber-500 rounded p-4 mr-4 cursor-pointer hover:bg-amber-200">Pujar</Button>
      <Button class="bg-green-500 rounded p-4 cursor-pointer hover:bg-green-300">Chatear</Button>
    </div>
  </div>
</template>

<script>
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
      categories: []
    }
  },
  async mounted() {
    await this.fetchAdData();
    await this.fetchCategories();
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
    }
  }
}
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1/1;
}
</style>