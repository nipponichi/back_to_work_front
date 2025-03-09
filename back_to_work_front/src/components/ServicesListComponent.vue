<template>
  <div class="flex flex-col">
      <div class="max-w-lg mx-auto p-12 bg-white shadow-lg rounded-lg mt-10">
          <AdverFilters />
          <InputText type="text" v-model="searchQuery" placeholder="Buscar..." />
      </div>

      <div class="card">
          <DataTable 
              :value="filteredCustomers" 
              paginator :rows="10" 
              dataKey="id" 
              :loading="loading"
              :sortField="sortField" 
              :sortOrder="sortOrder"
              @sort="onSort"
          >
              <template #empty> No customers found. </template>
              <template #loading> Loading customers data. Please wait. </template>

              <Column field="name" header="Name" sortable>
                  <template #body="{ data }">
                      {{ data.name }}
                  </template>
              </Column>

              <Column field="country.name" header="Country" sortable>
                  <template #body="{ data }">
                      <div class="flex items-center gap-2">
                          <img :src="data.country.flag" alt="flag" style="width: 24px" />
                          <span>{{ data.country.name }}</span>
                      </div>
                  </template>
              </Column>

              <Column field="representative.name" header="Agent" sortable>
                  <template #body="{ data }">
                      <div class="flex items-center gap-2">
                          <img :alt="data.representative.name" :src="data.representative.image" style="width: 32px" />
                          <span>{{ data.representative.name }}</span>
                      </div>
                  </template>
              </Column>

              <Column field="status" header="Status" sortable>
                  <template #body="{ data }">
                      <Tag :value="data.status" />
                  </template>
              </Column>

              <Column field="verified" header="Verified" sortable>
                  <template #body="{ data }">
                      <i class="pi" :class="{ 'pi-check-circle text-green-500': data.verified, 'pi-times-circle text-red-400': !data.verified }"></i>
                  </template>
              </Column>
          </DataTable>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AdverFilters from '../modals/AdverFilters.vue';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

const searchQuery = ref('');
const loading = ref(true);
const sortField = ref(null);
const sortOrder = ref(null);

const customers = ref([]);

onMounted(() => {
  setTimeout(() => {
      customers.value = [
          { id: 1, name: "John Doe", country: { name: "USA", flag: "https://primefaces.org/cdn/primevue/images/flag/united_states.png" }, representative: { name: "Amy Elsner", image: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" }, status: "new", verified: true },
          { id: 2, name: "Jane Smith", country: { name: "Germany", flag: "https://primefaces.org/cdn/primevue/images/flag/germany.png" }, representative: { name: "Anna Fali", image: "https://primefaces.org/cdn/primevue/images/avatar/annafali.png" }, status: "qualified", verified: false },
          { id: 3, name: "Carlos López", country: { name: "Spain", flag: "https://primefaces.org/cdn/primevue/images/flag/spain.png" }, representative: { name: "Ivan Magalhaes", image: "https://primefaces.org/cdn/primevue/images/avatar/ivanmagalhaes.png" }, status: "proposal", verified: true },
      ];
      loading.value = false;
  }, 1500);
});

const filteredCustomers = computed(() => {
  let filtered = [...customers.value];

  if (searchQuery.value) {
      filtered = filtered.filter(customer =>
          customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          customer.country.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          customer.representative.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          customer.status.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
  }

  return filtered;
});

</script>
