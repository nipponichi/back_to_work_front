<template>
  <div class="p-6 bg-white/5 rounded-2xl border border-white/10 text-white shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Listado de Incidencias</h2>

    <DataTable :value="claims" dataKey="id" paginator :rows="10" class="p-datatable-sm rounded-2xl">
      <Column field="id" header="ID" sortable />

      <Column header="Destinatario">
        <template #body="slotProps">
          {{ slotProps.data.receiver?.user_name }}
        </template>
      </Column>

        <Column header="Origen">
            <template #body="slotProps">
                <span v-if="slotProps.data?.ad">
                [Anuncio] {{ slotProps.data.ad.name }} ({{ slotProps.data.ad.id }})
                </span>
                <span v-else-if="slotProps.data?.bid">
                [Oferta] ({{ slotProps.data.bid.id }})
                </span>
                <span v-else-if="slotProps.data?.user_stat">
                [Valoración] ({{ slotProps.data.user_stat.id }})
                </span>
                <span v-else>-</span>
            </template>
        </Column>

      <Column field="reason" header="Motivo" />
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
      <Column header="Fecha">
        <template #body="slotProps">
          {{ new Date(slotProps.data.created_at).toLocaleDateString() }}
        </template>
      </Column>

<!--       <Column header="Acciones">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button p-button-sm mr-2" @click="editClaim(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button p-button-danger p-button-sm mr-2" @click="deleteClaim(slotProps.data.id)" />
        </template>
      </Column> -->
    </DataTable>
  </div>
</template>
<script>
import UserService from '../services/api/user.service';
import Toast from '../services/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
 export default {
    components: {
       UserService,
       Toast,
       DataTable,
       Column
    },
    data () {
        return {
            claims: []
        }
    },
    mounted() {
        this.fetchClaims()
    },
    methods: {
        async fetchClaims() {
            try {
                const response = await UserService.get('claims');
                if (response.data.success) {
                this.claims = response.data.data;
                } else {
                Toast.error('No se pudo obtener el listado de reclamaciones');
                }
            } catch (error) {
                Toast.error('Error al cargar las reclamaciones');
                console.error(error);
            }
        },
        statusClass(status) {
            switch (status) {
                case 'pending':
                return 'bg-yellow-500';
                case 'in_review':
                return 'bg-blue-500';
                case 'resolved':
                return 'bg-green-500';
                case 'rejected':
                return 'bg-red-500';
                default:
                return 'bg-gray-500';
            }
        }
    }
 }
</script>
<style scoped>
  ::v-deep(.p-paginator) {
    background-color: #1e293b !important;
    color: white !important;
    border-top: 1px solid #334155;
  }
  ::v-deep(.p-datatable) {
    background-color: #1e293b;
    color: white;
  }

  ::v-deep(.p-datatable .p-datatable-thead > tr > th),
  ::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
    background-color: #1e293b;
    color: white;
  }
</style>