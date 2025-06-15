<template>
  <div class="p-4 sm:p-6 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 max-w-full sm:max-w-3xl mx-auto">
    <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
      Crear Anuncio
    </h2>

    <form @submit.prevent="submitForm" enctype="multipart/form-data" class="space-y-5 sm:space-y-6">

      <div>
        <label class="block text-sm font-medium text-white mb-1 sm:mb-2">Título del Anuncio</label>
        <input
          type="text"
          v-model="ad.name"
          placeholder="Ej: Necesito un electricista urgente"
          class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-400">{{ errors.name }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-white mb-1 sm:mb-2">Descripción</label>
        <textarea
          v-model="ad.description"
          placeholder="Describe los detalles del proyecto..."
          rows="4"
          class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
        ></textarea>
        <p v-if="errors.description" class="mt-1 text-sm text-red-400">{{ errors.description }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label class="block text-sm font-medium text-white mb-1 sm:mb-2">Categoría</label>
          <select
            v-model="ad.category_id"
            class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
          >
            <option value="" disabled>Selecciona una categoría</option>
            <option v-for="category in categories" :key="category.id" :value="category.id" class="bg-blue-900 text-white">
              {{ category.category }}
            </option>
          </select>
          <p v-if="errors.category_id" class="mt-1 text-sm text-red-400">{{ errors.category_id }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-white mb-1 sm:mb-2">Provincia</label>
          <select
            v-model="ad.location"
            class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
          >
            <option value="" disabled>Selecciona una provincia</option>
            <option v-for="province in provinces" :key="province.id" :value="province.name" class="bg-blue-900 text-white">
              {{ province.name }}
            </option>
          </select>
          <p v-if="errors.location" class="mt-1 text-sm text-red-400">{{ errors.location }}</p>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-white mb-1 sm:mb-2">Fecha de entrega (opcional)</label>
        <input
          type="date"
          v-model="ad.due_date"
          class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
        />
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
        <button
          type="button"
          @click="$refs.fileInput.click()"
          class="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
        <i class="pi pi-plus mr-2 text-blue-300 text-xl"></i>
          Subir archivos
        </button>
        <span class="text-sm text-blue-200">(Máx. 5 fotos y 1 video, opcional)</span>
      </div>

      <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        accept=".jpg,.jpeg,.png,.mp4"
        multiple
        class="hidden"
      />
      <p v-if="errors.media" class="mt-1 text-sm text-red-400">{{ errors.media }}</p>

      <div v-if="previews.length" class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <div v-for="(preview, index) in previews" :key="index" class="relative group rounded overflow-hidden border border-white/20">
          <img v-if="preview.type.startsWith('image')" :src="preview.url" class="w-full h-24 sm:h-28 object-cover" />
          <div v-else class="w-full h-24 sm:h-28 bg-white/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <button
            @click="removeFile(index)"
            class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            title="Eliminar"
          >
            ×
          </button>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
          Publicar Anuncio
        </button>
      </div>
    </form>
    <Teleport to="body">
      <div v-if="showVerificationDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div class="bg-gradient-to-br from-blue-950 to-blue-800 text-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 text-center border border-white/20">
            <h3 class="text-xl font-bold mb-4">Anuncio enviado para revisión</h3>
            <p class="mb-6 text-blue-200">
              Tu anuncio ha sido enviado correctamente y será revisado por un administrador en la mayor brevedad posible. Estará oculto para otros usuarios hasta que sea aprobado.
            </p>
            <button
              @click="showVerificationDialog = false"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Entendido
            </button>
          </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import UserService from '../services/api/user.service';
import { useToast } from 'vue-toastification';

export default {
  props: {
    categories: { type: Array, required: true },
  },
  data() {
    return {
      provinces: [],
      ad: { name: '', description: '', category_id: '', location: '', due_date: '' },
      previews: [],
      errors: { name: '', description: '', category_id: '', location: '', media: '' },
      validImageExtensions: ['image/jpeg', 'image/jpg', 'image/png'],
      validVideoExtensions: ['video/mp4'],
      user: null,
      toast: useToast(),
      showVerificationDialog: false,
    };
  },
  async mounted() {
    await this.fetchProvinces();
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
    console.log(this.user)
  },
  computed: {
    hasVideo() {
      return this.previews.some(file => file.type.startsWith('video/'));
    },
    imageCount() {
      return this.previews.filter(file => file.type.startsWith('image/')).length;
    },
  },
  methods: {
    async fetchProvinces() {
      try {
        const response = await UserService.get('provinces');
        this.provinces = response.data.data;
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    },
    handleFileUpload(event) {
      this.errors.media = '';
      const files = Array.from(event.target.files);

      const invalidFiles = files.filter(file =>
        !this.validImageExtensions.includes(file.type) && !this.validVideoExtensions.includes(file.type)
      );

      if (invalidFiles.length > 0) {
        this.errors.media = 'Solo se permiten imágenes JPG, JPEG, PNG o videos MP4';
        return;
      }

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
        const reader = new FileReader();
        reader.onload = e => {
          this.previews.push({ url: e.target.result, type: file.type, file: file });
        };
        reader.readAsDataURL(file);
      });
    },
    removeFile(index) {
      this.previews.splice(index, 1);
    },

    validateForm() {
      let isValid = true;

      if (this.ad.name.trim().length < 3) {
        this.errors.name = 'El título debe tener al menos 3 caracteres';
        isValid = false;
      } else {
        this.errors.name = '';
      }

      if (this.ad.description.trim().length < 10) {
        this.errors.description = 'La descripción debe tener al menos 10 caracteres';
        isValid = false;
      } else {
        this.errors.description = '';
      }

      if (!this.ad.category_id) {
        this.errors.category_id = 'Por favor seleccione una categoría';
        isValid = false;
      } else {
        this.errors.category_id = '';
      }

      if (!this.ad.location) {
        this.errors.location = 'Por favor seleccione una provincia';
        isValid = false;
      } else {
        this.errors.location = '';
      }

      this.errors.media = '';

      return isValid;
    },

    async submitForm() {
      if (!this.validateForm()) return;

      const formDataToSend = new FormData();
      formDataToSend.append('name', this.ad.name);
      formDataToSend.append('description', this.ad.description);
      formDataToSend.append('category_id', parseInt(this.ad.category_id)); 
      formDataToSend.append('location', this.ad.location);
      formDataToSend.append('is_done', 0);
      if (this.ad.due_date) {
        formDataToSend.append('due_date', this.ad.due_date);
      }
      
      if (this.user) {
        formDataToSend.append('user_id', this.user.id);
      }

      this.previews.forEach((preview, index) => {
        formDataToSend.append(`media[${index}]`, preview.file);
      });

      try {
        const response = await UserService.set('ads', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data.success) {
          this.toast.success('Anuncio creado con éxito!');

          this.resetForm();
          this.showVerificationDialog = true;
          setTimeout(() => {
            this.showVerificationDialog = false;
            const ad = {
              ...response.data.data,
              user: this.user,
            };
            this.$emit('created', ad);
          }, 7000);
        } else {
          this.toast.error('Hubo un problema al crear el anuncio');
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        this.toast.error('Error al enviar el formulario');
      }
    },
    resetForm() {
      this.ad = { name: '', description: '', category_id: '', location: '', due_date: '' };
      this.previews = [];
      this.errors = { name: '', description: '', category_id: '', location: '', media: '' };
    },
  },
};
</script>

