<template>
    <div class="flex flex-col">
        <div class="max-w-lg mx-auto p-12 bg-white shadow-lg rounded-lg mt-10">
            <AdverFilters />
            <InputText type="text" v-model="searchQuery" placeholder="Buscar..." />
            <button 
            @click="openCreateAdModal = true" 
            class="py-2 px-4 bg-amber-500 rounded text-white cursor-pointer hover:bg-amber-600 transition-colors"
          >
            Advert
          </button>
        </div>
        <div class="card">
            <DataTable
            ref="dt"
            :value="filteredAds"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
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
        <div class="custom-dialog-red">

        <Dialog
            v-model:visible="openCreateAdModal"
            header="Gestionar correos con adjuntos"
            :modal="true"
        >
            <CreateAdFormModal />
        </Dialog>
    </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AdverFilters from '../modals/AdverFilters.vue';
import CreateAdFormModal from './CreateAdFormModal.vue';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import axios from "axios";
import { watch } from 'vue';

const searchQuery = ref('');
const loading = ref(true);
const sortField = ref(null);
const sortOrder = ref(null);
const ads = ref([]);
const categories = ref([]);
const openCreateAdModal = ref(false); 

const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

watch(openCreateAdModal, (newValue) => {
  console.log("Estado del modal:", newValue);
});

onMounted(async () => {
    await fetchCategories()
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

const fetchCategories = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories");
        if (response.data.success) {
            // Assuming you have a categories ref to store the data
            categories.value = response.data.data;
            console.log(categories.value);
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

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