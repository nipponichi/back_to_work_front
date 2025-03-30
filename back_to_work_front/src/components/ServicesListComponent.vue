<template>
    <div class="flex flex-col">
        <div class="max-w-lg mx-auto p-12 bg-white shadow-lg rounded-lg mt-10">
            <AdverFilters />
            <InputText type="text" v-model="searchQuery" placeholder="Buscar..." />
            <button class="p-4" @click="printMessage">Advert</button>
        </div>
        <AdsFormComponent />
        <div class="card">
          <DataTable 
            :value="filteredAds" 
            paginator 
            :rows="10" 
            dataKey="id" 
            :sortField="sortField" 
            :sortOrder="sortOrder"
            @sort="onSort"
          >
            <template #empty> No ads found. </template>
            <template #loading> Loading ads data. Please wait. </template>
        
            <Column field="id" header="ID" sortable></Column>
            
            <Column field="name" header="Name" sortable>
                <template #body="{ data }">
                    {{ data.name }}
                </template>
            </Column>
            
            <Column field="description" header="Description">
                <template #body="{ data }">
                    {{ data.description }}
                </template>
            </Column>
            
            <Column field="location" header="Location" sortable></Column>
            
            <Column field="due_date" header="Due Date" sortable>
                <template #body="{ data }">
                    {{ formatDate(data.due_date) }}
                </template>
            </Column>
            
            <Column field="is_done" header="Status">
                <template #body="{ data }">
                    <Tag :value="data.is_done ? 'Completed' : 'Pending'" 
                        :severity="data.is_done ? 'success' : 'warning'" />
                </template>
            </Column>
          </DataTable>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import AdverFilters from '../modals/AdverFilters.vue';
  import AdsFormComponent from './AdsFormComponent.vue';
  import InputText from 'primevue/inputtext';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Tag from 'primevue/tag';
  import axios from "axios";
  
  const searchQuery = ref('');
  const loading = ref(true);
  const sortField = ref(null);
  const sortOrder = ref(null);
  const ads = ref([]); // Cambiado a ref para reactividad
  
  const formatDate = (dateString) => {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
  };
  

  onMounted(async () => {
      try {
          const response = await axios.get("http://127.0.0.1:8000/api/ads");
          
          if (response.data.success) {
              ads.value = response.data.data; 
              console.log(ads.value);
          }
          loading.value = false;
      } catch (error) {
          console.error("Error fetching ads:", error);
          loading.value = false;
      }
  });
  
  const filteredAds = computed(() => {
      if (!searchQuery.value) return ads.value;
      
      return ads.value.filter(ad =>
          ad.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          ad.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          ad.location.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
  });
  
  const onSort = (event) => {
      sortField.value = event.sortField;
      sortOrder.value = event.sortOrder;
  };
  </script>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    printMessage() {
        console.log("hola")
    }
  }
}
</script>