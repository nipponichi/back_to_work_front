<template>
  <div class="space-y-4 text-white">
    <div class="bg-blue-800 h-1">
    </div>
    <div>
      <label class="block text-sm font-semibold mb-1">Motivo</label>
      <textarea v-model="form.reason" rows="4" class="w-full rounded bg-white/10 border border-white/20 text-white p-2"></textarea>
    </div>

    <div>
      <label class="block text-sm font-semibold mb-1">Imágenes (máx 3)</label>

      <label class="inline-flex items-center px-4 py-2 bg-blue-700 text-white text-sm rounded cursor-pointer hover:bg-blue-600 transition">
        <i class="pi pi-upload mr-2"></i> Seleccionar Imágenes
        <input type="file" accept="image/*" multiple @change="handleImages" class="hidden" />
      </label>

      <p v-if="imageError" class="text-red-400 text-xs mt-1">{{ imageError }}</p>

      <div class="mt-2 flex flex-wrap gap-2">
        <div
          v-for="(img, index) in form.images"
          :key="index"
          class="relative w-24 h-24 border border-white/20 rounded overflow-hidden group"
        >
          <img :src="getPreviewUrl(img)" alt="Preview" class="w-full h-full object-cover" />
          <button
            @click="removeImage(index)"
            class="absolute top-0 right-0 cursor-pointer bg-red-600 rounded-full text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition"
            title="Eliminar"
          >
            ×
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-end space-x-2 mt-6">
      <Button label="Cancelar" class="p-button-secondary p-button-sm" @click="closeModal" />
      <Button label="Enviar" class="p-button-sm" @click="submitClaim" :disabled="!form.reason.trim()" />
    </div>
  </div>
</template>


<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import UserService from '../services/api/user.service';
import toast from '../services/toast.js'

export default {
  components: { 
    Dialog, 
    Button,
    toast
  },
  props: {
    receiver: { type: Object, required: true },
    ad_id: { type: Number, default: null },
    bid_id: { type: Number, default: null },
    userstat_id: { type: Number, default: null }
  },
  data() {
    return {
      form: {
        reason: '',
        images: []
      },
      previewUrls: [],
      imageError: '',
      sender: null
    };
  },

  mounted() {
    const userStr = localStorage.getItem('user');
    if (userStr) this.sender = JSON.parse(userStr);
  },
  methods: {
    getPreviewUrl(file) {
      return window.URL.createObjectURL(file);
    },
    closeModal() {
      this.$emit('update:visible', false);
      this.resetForm();
    },
    handleImages(event) {
      this.imageError = '';
      const newFiles = Array.from(event.target.files);


      const totalFiles = [...this.form.images, ...newFiles];

      if (totalFiles.length > 3) {
        this.imageError = 'Máximo 3 imágenes permitidas.';
        return;
      }

      this.form.images = totalFiles;
    },
    async submitClaim() {
      if (!this.sender || !this.receiver) {
        toast.error('Faltan datos del usuario o receptor.');
        return;
      }

      const formData = new FormData();
      formData.append('sender_id', this.sender.id);
      formData.append('receiver_id', this.receiver.id);
      formData.append('reason', this.form.reason);

      if (this.ad_id) formData.append('ad_id', this.ad_id);
      if (this.bid_id) formData.append('bid_id', this.bid_id);
      if (this.userstat_id) formData.append('user_stats_id', this.userstat_id);

      this.form.images.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });

      try {
        const response = await UserService.set('claims', formData);

        if (response.data.success) {
          toast.success('Reclamación enviada correctamente');
          this.closeModal();
          this.$emit('claim-created', response.data.data);
        } else {
          toast.error('Error al enviar la reclamación');
        }
      } catch (e) {
        toast.error('Error del servidor');
      }
    },
    resetForm() {
      this.form = { reason: '', images: [] };
      this.imageError = '';
    },
    
    removeImage(index) {
      this.form.images.splice(index, 1);
    }
  }
};
</script>
