<template>
  <form @submit.prevent="submitForm" enctype="multipart/form-data" class="max-w-md md:max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <!-- Campo Nombre -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Nombre:</label>
      <input
        type="text"
        v-model="formData.name"
        required
        minlength="3"
        maxlength="50"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
    </div>

    <!-- Campo Location -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Location:</label>
      <input
        type="text"
        v-model="formData.location"
        required
        minlength="3"
        maxlength="50"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      <p v-if="errors.location" class="mt-1 text-sm text-red-600">{{ errors.location }}</p>
    </div>

    <!-- Campo Categoría -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Categoría:</label>
      <select 
        v-model="formData.category_id" 
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione una categoría</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.category }}
        </option>
      </select>
      <p v-if="errors.category_id" class="mt-1 text-sm text-red-600">{{ errors.category_id }}</p>
    </div>

    <!-- Campo Descripción -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Descripción:</label>
      <textarea
        v-model="formData.description"
        required
        minlength="10"
        maxlength="500"
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
    </div>

    <!-- Campo Archivo -->
    <div class="mb-6">
      <label class="block text-gray-700 font-medium mb-2">
        Subir media: 
        <span class="text-sm text-gray-500">(Máx. 5 fotos y 1 video)</span>
      </label>
      
      <div class="flex items-center justify-center w-full">
        <label class="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-md cursor-pointer">
          <div class="flex flex-col items-center justify-center pt-7">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="pt-1 text-sm tracking-wider text-gray-400">Selecciona media</p>
          </div>
          <input 
            type="file" 
            @change="handleFileUpload"
            accept=".jpg,.jpeg,.png,.mp4"
            multiple
            class="opacity-0"
          >
        </label>
      </div>
      
      <p v-if="errors.media" class="mt-1 text-sm text-red-600">{{ errors.media }}</p>
      
      <!-- Mostrar miniaturas -->
      <div v-if="previews.length" class="mt-4">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Archivos seleccionados:</h3>
        <div class="grid grid-cols-3 gap-2">
          <div v-for="(preview, index) in previews" :key="index" class="relative">
            <!-- Miniaturas para imágenes -->
            <img v-if="preview.type.startsWith('image')" :src="preview.url" class="w-full h-24 object-cover rounded border border-gray-200">
            
            <!-- Miniaturas para video -->
            <div v-else class="w-full h-24 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <button 
              @click="removeFile(index)"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>

    <button 
      type="submit" 
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      Enviar
    </button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      formData: {
        name: '',
        description: '',
        category_id: '',
        location: '',
        is_done:'',
        media: [],
      },
      errors: {
        name: '',
        description: '',
        category_id: '',
        location: '',
        is_done:'',
        media: []
      },
      validImageExtensions: ['image/jpeg', 'image/jpg', 'image/png'],
      validVideoExtensions: ['video/mp4'],
      previews: [],
      user:''
    }
  },
  mounted() {
    this.fetchCategories();
    let userStr = localStorage.getItem("user");
    let user2 = JSON.parse(userStr);
    this.user=user2;
    console.log(user2);
  },
  computed: {
    hasVideo() {
      return this.previews.some(file => file.type.startsWith('video/'));
    },
    imageCount() {
      return this.previews.filter(file => file.type.startsWith('image/')).length;
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories");
        if (response.data.success) {
          this.categories = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    handleFileUpload(event) {
      this.errors.media = '';
      const files = Array.from(event.target.files);
      
      // Validar tipos de media
      const invalidFiles = files.filter(file => 
        !this.validImageExtensions.includes(file.type) && 
        !this.validVideoExtensions.includes(file.type)
      );
      
      if (invalidFiles.length > 0) {
        this.errors.media = 'Solo se permiten imágenes JPG, JPEG, PNG o videos MP4';
        return;
      }
      
      // Validar cantidad de videos
      const videoFiles = files.filter(file => this.validVideoExtensions.includes(file.type));
      if (videoFiles.length > 1 || (this.hasVideo && videoFiles.length > 0)) {
        this.errors.media = 'Solo se permite 1 video';
        return;
      }
      
      const imageFiles = files.filter(file => this.validImageExtensions.includes(file.type));
      const totalImages = this.imageCount + imageFiles.length;
      if (totalImages > 5) {
        this.errors.media = 'Máximo 5 fotos permitidas';
        return;
      }
      
      files.forEach(file => {
        if ((this.validImageExtensions.includes(file.type) && this.imageCount < 5) || 
            (this.validVideoExtensions.includes(file.type) && !this.hasVideo)) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previews.push({
              url: e.target.result,
              type: file.type,
              file: file
            });
          };
          reader.readAsDataURL(file);
        }
      });
      
      console.log(this.previews);
    },
    removeFile(index) {
      this.previews.splice(index, 1);
      this.formData.media = this.previews.map(preview => preview.file);
    },
    validateForm() {
      let isValid = true;

      if (this.formData.name.length < 3) {
        this.errors.name = 'El nombre debe tener al menos 3 caracteres';
        isValid = false;
      } else {
        this.errors.name = '';
      }

      if (this.formData.location.length < 3) {
        this.errors.location = 'La localización debe tener al menos 3 caracteres';
        isValid = false;
      } else {
        this.errors.location = '';
      }

      if (!this.formData.category_id) {
        this.errors.category_id = 'Por favor seleccione una categoría';
        isValid = false;
      } else {
        this.errors.category_id = '';
      }

      if (this.formData.description.length < 5) {
        this.errors.description = 'La descripción debe tener al menos 10 caracteres';
        isValid = false;
      } else {
        this.errors.description = '';
      }

      if (this.previews.length === 0) {
        this.errors.media = 'Debe subir al menos un media';
        isValid = false;
      } else {
        this.errors.media = '';
      }
      

      return isValid;
    },

    async submitForm() {
      if (this.validateForm()) {
        const formDataToSend = new FormData();
        
        formDataToSend.append('name', this.formData.name);
        formDataToSend.append('location', this.formData.location);
        formDataToSend.append('is_done', 0);
        formDataToSend.append('category_id', this.formData.category_id);
        formDataToSend.append('description', this.formData.description);
        formDataToSend.append('user_id', this.user.id);
        this.previews.forEach((preview, index) => {
          formDataToSend.append(`media[${index}]`, preview.file);
        });
        

        for (let [key, value] of formDataToSend.entries()) {
          console.log(key, value);
        }

        try {
          const response = await axios.post("http://127.0.0.1:8000/api/ads", formDataToSend);
          console.log(response.data)

        } catch (error) {
          console.error('Error:', error.response?.data || error.message);
          alert('Error: ' + (error.response?.data?.message || error.message));
        }
      }
    }
  }
}
</script>
