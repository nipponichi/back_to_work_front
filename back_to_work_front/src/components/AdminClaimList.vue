<template>
  <div class="p-6 text-black">
    <h1 class="text-2xl font-bold mb-4">Administración de Incidencias</h1>

    <DataTable :value="claims" dataKey="id" paginator :rows="10" class="p-datatable-sm">
      <Column field="id" header="ID" sortable />

      <Column field="user_name" header="Remitente (ID)"
      sortable>
        <template #body="slotProps">
          {{ slotProps.data.sender?.user_name }} ({{ slotProps.data.sender?.id }})
        </template>
      </Column>

      <Column header="Destinatario (ID)"
      field="user_name"
      sortable>
        <template #body="slotProps">
          {{ slotProps.data.receiver?.user_name }} ({{ slotProps.data.receiver?.id }})
        </template>
      </Column>

      <Column header="Origen (ID)"
      sortable>
        <template #body="slotProps">
          <span v-if="slotProps.data.ad">[Anuncio] ({{ slotProps.data.ad.id }})</span>
          <span v-else-if="slotProps.data.bid">[Oferta] ({{ slotProps.data.bid.id }})</span>
          <span v-else-if="slotProps.data.user_stat">[Valoración] ({{ slotProps.data.user_stat.id }})</span>
        </template>
      </Column>

      <Column field="reason" sortable header="Motivo" />
      <Column header="Estado" sortable>
        <template #body="slotProps">
          <span
            class="px-2 py-1 rounded text-white text-sm font-semibold"
            :class="statusClass(slotProps.data.status)"
          >
            {{ slotProps.data.status }}
          </span>
        </template>
      </Column>
      <Column header="Fecha" field="created_at" sortable>
        <template #body="slotProps">
          {{ new Date(slotProps.data.created_at).toLocaleDateString() }}
        </template>
      </Column>

      <Column header="Acciones">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button p-button-sm mr-2" @click="editClaim(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button p-button-danger p-button-sm mr-2" @click="deleteClaim(slotProps.data.id)" />
          <Button icon="pi pi-eye" class="p-button-info p-button-sm mr-2" @click="viewImages(slotProps.data)" v-if="slotProps.data.images?.length" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="imagesDialogVisible" header="Imágenes de la Reclamación" :modal="true" class="w-[40rem]">
      <div class="flex flex-wrap gap-4 justify-start text-black">
        <div v-for="(img, i) in selectedClaimImages" :key="i" class="w-32 h-32 border border-gray-300 rounded overflow-hidden">
          <img :src="getImageUrl(img)" class="w-full h-full object-cover" />
        </div>
      </div>
    </Dialog>

    <Dialog v-model:visible="editDialogVisible" header="Editar Reclamación" :modal="true" class="w-[30rem]">
      <div class="flex flex-col gap-4 text-black">
        <div>
          <label class="block mb-1">Motivo</label>
          <InputText v-model="selectedClaim.reason" class="w-full" />
        </div>

        <div>
          <label class="block mb-1">Estado</label>
          <select v-model="selectedClaim.status" class="w-full px-3 py-2 rounded bg-white text-black">
            <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-1">Notas del admin</label>
          <textarea v-model="selectedClaim.admin_notes" class="w-full px-3 py-2 rounded bg-white text-black"></textarea>
        </div>
      </div>

      <template #footer>
        <Button label="Cancelar" @click="editDialogVisible = false" />
        <Button label="Guardar" class="p-button-success" @click="saveClaim" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import UserService from '../services/api/user.service';
import swalService from '../services/swal';
import toast from '../services/toast';

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
      claims: [],
      selectedClaim: {},
      selectedClaimImages: [],
      editDialogVisible: false,
      imagesDialogVisible: false,
      statuses: ['pending', 'in_review', 'waiting_user', 'resolved', 'rejected', 'escalated'],
      baseImgUrl: import.meta.env.VITE_IMG_URL
    };
  },
  async mounted() {
    await this.fetchClaims();
  },
  methods: {
    statusClass(status) {
      switch (status) {
        case 'pending':
          return 'bg-yellow-500';
        case 'in_review':
          return 'bg-blue-500';
        case 'resolved':
          return 'bg-green-600';
        case 'rejected':
          return 'bg-red-600';
        default:
          return 'bg-gray-500';
      }
    },

    async fetchClaims() {
      try {
        const response = await UserService.get('claims');
        this.claims = response.data.data;
      } catch (error) {
        toast.error('Error al cargar las reclamaciones');
      }
    },
    viewImages(claim) {
      this.selectedClaimImages = claim.images || [];
      this.imagesDialogVisible = true;
    },
    getImageUrl(path) {
      if (!path) return '';
      console.log(this.baseImgUrl)
      return `${this.baseImgUrl + '/' + path}`;
    },
    editClaim(claim) {
      this.selectedClaim = { ...claim };
      this.editDialogVisible = true;
    },

    async saveClaim() {
      try {
        const response = await UserService.update('claims', this.selectedClaim, this.selectedClaim.id);
        if (response.data.success) {
          const index = this.claims.findIndex(c => c.id === this.selectedClaim.id);
          if (index !== -1) {
            this.claims[index] = { ...this.selectedClaim };
          }
          toast.success('Reclamación actualizada correctamente');
          this.editDialogVisible = false;
        }
      } catch (error) {
        toast.error('Error al guardar la reclamación');
      }
    },

    async deleteClaim(id) {
      try {
        const confirm = await swalService.confirm('¿Deseas eliminar esta reclamación?');
        if (confirm.isConfirmed) {
          await UserService.delete('claims', id);
          this.claims = this.claims.filter(claim => claim.id !== id);
          toast.success('Reclamación eliminada correctamente');
        }
      } catch (error) {
        toast.error('No se pudo eliminar la reclamación');
      }
    }
  }
};
</script>