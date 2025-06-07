<template>
  <div class="p-6 text-black">
    <h1 class="text-2xl font-bold mb-4">Administración de Anuncios</h1>

    <DataTable :value="ads" dataKey="id" paginator rows="10" class="text-white">
      <Column field="id" header="ID" sortable />
      <Column field="name" header="Nombre" sortable />
      <Column field="description" header="Descripción" sortable />
      <Column field="location" header="Ubicación" sortable />
      <Column field="due_date" header="Fecha Límite">
        <template #body="slotProps">
          {{ new Date(slotProps.data.due_date).toLocaleDateString() }}
        </template>
      </Column>
      <Column field="category.category" header="Categoría" />
      <Column field="user.id" header="Publicado por (ID)" />
      <Column header="Acciones">
        <template #body="slotProps">
            <div class="flex items-center space-x-2">
            <Button
                icon="pi pi-pencil"
                class="p-button-sm"
                @click="editAd(slotProps.data)"
            />
            <Button
                icon="pi pi-trash"
                class="p-button-danger p-button-sm"
                @click="deleteAd(slotProps.data.id)"
            />
            <Button
                :icon="slotProps.data.is_verified ? 'pi pi-check' : 'pi pi-times'"
                :class="[
                'p-button-sm',
                slotProps.data.is_verified
                    ? 'p-button-success'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                ]"
                @click="verifyAd(slotProps.data.id)"
                :title="slotProps.data.is_verified ? 'Marcar como no verificado' : 'Verificar anuncio'"
            />
            </div>
        </template>
      </Column>
    </DataTable>
        <Dialog
        :visible="editDialogVisible"
        @update:visible="val => editDialogVisible = val"
        header="Editar Anuncio"
        :modal="true"
        class="w-[30rem]"
        >
      <div class="flex flex-col gap-4 text-black">
        <div>
          <label class="block mb-1">Nombre</label>
          <InputText v-model="selectedAd.name" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">Descripción</label>
          <InputText v-model="selectedAd.description" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">Ubicación</label>
          <InputText v-model="selectedAd.location" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">Fecha Límite</label>
          <InputText type="date" v-model="selectedAd.due_date" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">Categoría</label>
          <select
            v-model="selectedAd.category_id"
            class="w-full px-4 py-2 rounded border border-gray-300"
          >
            <option disabled value="">Selecciona una categoría</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.category }}
            </option>
          </select>
        </div>
        <div v-if="selectedAd?.pictures?.length" class="relative w-full max-w-xl mx-auto mt-6">
        <div class="overflow-hidden rounded-lg border border-white/10">
            <img
            :src="baseImgUrl + selectedAd.pictures[currentImageIndex].path"
            class="w-full h-auto object-cover transition duration-300"
            />
        </div>
        <div class="flex justify-between mt-2">
            <button
            @click="prevImage"
            class="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            :disabled="currentImageIndex === 0"
            >
            Anterior
            </button>
            <button
            @click="nextImage"
            class="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            :disabled="currentImageIndex >= selectedAd.pictures.length - 1"
            >
            Siguiente
            </button>
        </div>

        <div class="flex justify-center mt-4 space-x-4">
            <button
            @click="deleteCurrentImage"
            class="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
            >
            Eliminar imagen
            </button>

            <label class="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer hover:bg-blue-700 transition">
            Cambiar imagen
            <input type="file" accept="image/*" @change="handleImageUpload" class="hidden" />
            </label>
        </div>
        <div class="flex items-center space-x-2 mt-2">
            <input
                type="checkbox"
                id="pro_is_done"
                v-model="selectedAd.pro_is_done"
                class="accent-blue-600 w-5 h-5"
            />
            <label for="pro_is_done" class="text-sm">El profesional ha marcado como hecho</label>
        </div>
        <div class="flex items-center space-x-2">
            <input
                type="checkbox"
                id="customer_is_done"
                v-model="selectedAd.customer_is_done"
                class="accent-blue-600 w-5 h-5"
            />
            <label for="customer_is_done" class="text-sm">El cliente ha marcado como hecho</label>
        </div>
        <div class="flex items-center space-x-2">
            <input
                type="checkbox"
                id="is_verified"
                v-model="selectedAd.is_verified"
                class="accent-blue-600 w-5 h-5"
            />
            <label for="pro_is_done" class="text-sm">Anuncio verificado</label>
        </div>
        </div>
      </div>

      <template #footer>
        <Button label="Cancelar" @click="editDialogVisible = false" />
        <Button label="Guardar" class="p-button-success" @click="saveAdChanges" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import swalService from '../services/swal.js'
import toast from '../services/toast.js'
import UserService from '../services/api/user.service';

export default {
  components: {
    DataTable,
    Column,
    Button,
    Dialog,
    InputText
  },
  data() {
    return {
      ads: [],
      categories: [],
      selectedAd: {},
      editDialogVisible: false,
      currentImageIndex: 0,
      baseImgUrl: import.meta.env.VITE_IMG_URL || 'http://localhost:8000/storage/'
    };
  },
  mounted() {
    this.fetchCategories();
    this.fetchAds();
  },
  methods: {
    async fetchAds() {
      try {
        const response = await UserService.get('ads');
        this.ads = response.data.data;
      } catch (error) {
        toast.error('Error al cargar los anuncios');
      }
    },
    async fetchCategories() {
      try {
        const response = await UserService.get('categories');
        this.categories = response.data.data;
      } catch (error) {
        toast.error('Error al cargar las categorías');
      }
    },

    async deleteAd(id) {
      try {
        const confirm = await swalService.confirm('¿Deseas eliminar este anuncio?');
        if (confirm.isConfirmed) {
          await UserService.delete('ads', id);
          this.ads = this.ads.filter(ad => ad.id !== id);
          toast.success('Anuncio eliminado correctamente');
        }
      } catch (error) {
        toast.error('No se pudo eliminar el anuncio');
      }
    },

    editAd(ad) {
        this.selectedAd = {
            ...ad,
            pro_is_done: !!ad.pro_is_done,
            customer_is_done: !!ad.customer_is_done
        };
        this.currentImageIndex = 0;
        if (this.selectedAd.due_date?.includes('T')) {
            this.selectedAd.due_date = this.selectedAd.due_date.split('T')[0];
        }
        this.editDialogVisible = true;
        console.log('editDialogVisible activado:', this.editDialogVisible);
    },

    async saveAdChanges() {
      try {
        const response = await UserService.update('ads', this.selectedAd, this.selectedAd.id);
        if (response.data.success) {
          const index = this.ads.findIndex(ad => ad.id === this.selectedAd.id);
          if (index !== -1) this.ads[index] = { ...this.selectedAd };
          toast.success('Anuncio actualizado correctamente');
          this.editDialogVisible = false;
        }
      } catch (error) {
        toast.error('Error al actualizar el anuncio');
      }
    },

    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },

    nextImage() {
      if (this.currentImageIndex < this.selectedAd.pictures.length - 1) {
        this.currentImageIndex++;
      }
    },

    async deleteCurrentImage() {
        const picture = this.selectedAd.pictures[this.currentImageIndex];
        if (!picture) return;

        try {
            const confirm = await swalService.confirm('¿Eliminar esta imagen?');
            if (!confirm.isConfirmed) return;

            await UserService.delete(`ads/pictures/${picture.id}`);
            this.selectedAd.pictures.splice(this.currentImageIndex, 1);
            if (this.currentImageIndex > 0) this.currentImageIndex--;
            toast.success('Imagen eliminada correctamente');
        } catch (error) {
            toast.error('Error eliminando la imagen');
        }
    },


    async handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('ad_id', this.selectedAd.id);

        try {
            const response = await UserService.postFile('ads/pictures/upload', formData);
            this.selectedAd.pictures.push(response.data.picture);
            toast.success('Imagen subida correctamente');
        } catch (error) {
            toast.error('Error subiendo la imagen');
        }
    },
    
    async verifyAd(id) {
    try {
        const response = await UserService.show('ads/verify', id);

        if (response.data.success) {
        const ad = this.ads.find(ad => ad.id === id);
        if (ad) {
            ad.is_verified = !ad.is_verified;
            toast.success(`Anuncio ${ad.is_verified ? 'verificado' : 'marcado como no verificado'} correctamente`);
        }
        }
    } catch (error) {
        toast.error('Error al cambiar el estado de verificación');
    }
    }




}

}
</script>
