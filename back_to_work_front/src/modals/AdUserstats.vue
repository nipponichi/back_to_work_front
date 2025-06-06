<template>
  <div class="card">
    <DataTable
      :value="userstats"
      :paginator="true"
      :rows="10"
      :rowsPerPageOptions="[5,10,25]"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} estadísticas"
      stripedRows
      responsiveLayout="scroll"
      class="p-datatable-sm"
    >
      <Column field="user_id" header="User" :sortable="true">
        <template #body="{data}">
          <span class="font-medium">{{ data.user.name }}</span>
        </template>
      </Column>

      <Column field="customer_care" header="Valoración" :sortable="true">
        <template #body="{data}">
          <div class="flex items-center">
            <span class="mr-2">{{ data.customer_care }}</span>
            <div class="flex text-yellow-500">
              <i v-for="n in 5" :key="n" 
                 :class="{'pi pi-star-fill': n <= data.customer_care, 'pi pi-star': n > data.customer_care}" 
                 class="text-sm"
              ></i>
            </div>
          </div>
        </template>
      </Column>

      <Column field="review" header="Comentario" :sortable="true">
        <template #body="{data}">
          <span class="line-clamp-2" :title="data.review">{{ data.review }}</span>
        </template>
      </Column>

      <Column field="created_at" header="Fecha" :sortable="true">
        <template #body="{data}">
          {{ formatDate(data.created_at) }}
        </template>
      </Column>

      <template #empty>
        <div class="p-4 text-center text-gray-500">
          No se encontraron estadísticas de usuario
        </div>
      </template>
    </DataTable>
  </div>
</template>
<script>
import UserService from '../services/api/user.service';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  components: {
    DataTable,
    Column

  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      userstats: [],
      users: [],
      categories: [],
      showBidGrid: false,
      bids: [],
      newBid: { bid: '', description: '' },
      bidsLoaded: false,
    };
  },
  async mounted() {
    await this.fetchUserStats();
    await this.fetchUsers();
  },
  methods: {
    async fetchUserStats() {
      try {
        const response = await UserService.show('userstats', this.id);
        this.userstats = response.data.data;
        console.log(this.userstats);
      } catch (error) {
        console.error('Error fetching ad data:', error);
      }
    },

    async fetchUsers() {
      try {
        const userIds = [...new Set(this.userstats.map(stat => stat.user_id))];
        
        this.users = [];
        
        for (const userId of userIds) {
          const response = await UserService.show('users', userId);

            this.userstats.find(stat => stat.user_id === userId).user = response.data.data;
            this.users.push(response.data.data);
          
        }
        
        console.log('Usuarios cargados:', this.userstats);
      } catch (error) {
        console.error('Error fetching user data:', error);

        this.$toast.error('Error al cargar información de usuarios');
      }
    },

    
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
      })
    },
},
}
</script>