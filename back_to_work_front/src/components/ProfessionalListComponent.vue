<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <!-- BLOQUE DE CATEGORÍAS -->
    <div class="max-w-6xl mx-auto mt-12">
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Available Categories</h2>
          <button @click="openAddCategoryModal" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg">
            <i class="pi pi-plus"></i> Add
          </button>
        </div>

        <DataTable
          :value="categories"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :loading="loadingCategories"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories"
          class="p-datatable-lg cursor-pointer bg-white custom-datatable"
          tableStyle="min-width: 30rem"
        >
          <template #empty>
            <div class="p-6 text-center text-gray-800 text-lg bg-white">
              No categories found.
            </div>
          </template>

          <template #loading>
            <div class="p-6 text-center text-gray-800 text-lg bg-white">
              <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-amber-500 mb-3"></div>
              <p class="text-lg">Loading categories...</p>
            </div>
          </template>

          <Column field="category" header="Category Name"
            headerClass="font-bold text-gray-800 bg-white p-4 text-left text-xl"
            bodyClass="p-4 bg-white">
            <template #body="{ data }">
              <span class="text-gray-800 text-lg">{{ data.category }}</span>
            </template>
          </Column>

          <Column field="description" header="Description"
            headerClass="font-bold text-gray-800 bg-white p-4 text-left text-xl"
            bodyClass="p-4 bg-white">
            <template #body="{ data }">
              <span class="text-gray-600 text-base">{{ data.description }}</span>
            </template>
          </Column>

          <Column header="Actions"
            headerClass="font-bold text-gray-800 bg-white p-4 text-center text-xl"
            bodyClass="p-4 bg-white text-center">
            <template #body="{ data }">
              <button @click="openEditCategoryModal(data)" class="text-blue-600 hover:text-blue-800 mx-2">
                <i class="pi pi-pencil"></i>
              </button>
              <button @click="deleteCategory(data.id)" class="text-red-600 hover:text-red-800 mx-2">
                <i class="pi pi-trash"></i>
              </button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <!-- NUEVO BLOQUE DE USUARIOS -->
    <div class="max-w-6xl mx-auto mt-12">
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Users</h2>
        </div>

        <DataTable
          :value="users"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :loading="loadingUsers"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          class="p-datatable-lg cursor-pointer bg-white custom-datatable"
          tableStyle="min-width: 30rem"
        >
          <template #empty>
            <div class="p-6 text-center text-gray-800 text-lg bg-white">
              No users found.
            </div>
          </template>

          <template #loading>
            <div class="p-6 text-center text-gray-800 text-lg bg-white">
              <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-amber-500 mb-3"></div>
              <p class="text-lg">Loading users...</p>
            </div>
          </template>

          <Column field="name" header="User Name"
            headerClass="font-bold text-gray-800 bg-white p-4 text-left text-xl"
            bodyClass="p-4 bg-white">
            <template #body="{ data }">
              <span class="text-gray-800 text-lg">{{ data.name }}</span>
            </template>
          </Column>

          <Column field="email" header="Email"
            headerClass="font-bold text-gray-800 bg-white p-4 text-left text-xl"
            bodyClass="p-4 bg-white">
            <template #body="{ data }">
              <span class="text-gray-600 text-base">{{ data.email }}</span>
            </template>
          </Column>

          <Column header="Actions"
            headerClass="font-bold text-gray-800 bg-white p-4 text-center text-xl"
            bodyClass="p-4 bg-white text-center">
            <template #body="{ data }">
              <!-- Icono para bloqueo -->
              <button @click="showBlockToast" class="text-gray-600 hover:text-gray-800 mx-2">
                <i class="pi pi-lock"></i>
              </button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <!-- Modal para añadir o editar usuario -->
    <!-- (Este bloque no se modifica) -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import CategoryService from '../services/api/category.service';
import UserService from '../services/api/user.service';

const toast = useToast();

// Estados reactivos para categorías
const categories = ref([]);
const loadingCategories = ref(true);
const addCategoryModal = ref(false);
const newCategoryName = ref('');
const newCategoryDescription = ref('');
const savingCategory = ref(false);
const modalTitle = ref('Add New Category');

// Estados reactivos para usuarios
const users = ref([]);
const loadingUsers = ref(true);

// Función para obtener categorías
const fetchCategories = async () => {
  try {
    const response = await CategoryService.get('categories');
    if (response.data.success) {
      categories.value = response.data.data;
    } else {
      toast.error('Failed to fetch categories.');
    }
  } catch (error) {
    toast.error('Error fetching categories.');
  } finally {
    loadingCategories.value = false;
  }
};

// Función para obtener usuarios
const fetchUsers = async () => {
  try {
    const response = await UserService.get('users');
    if (response.data.success) {
      users.value = response.data.data;
    } else {
      toast.error('Failed to fetch users.');
    }
  } catch (error) {
    toast.error('Error fetching users.');
  } finally {
    loadingUsers.value = false;
  }
};

// Función para eliminar usuario
const deleteUser = async (userId) => {
  try {
    const response = await UserService.delete(`users/${userId}`);
    if (response.data.success) {
      toast.success('User deleted successfully!');
      fetchUsers(); // Actualiza la lista de usuarios
    } else {
      toast.error('Failed to delete user.');
    }
  } catch (error) {
    toast.error('Error deleting user.');
  }
};

// Función para mostrar el toast de bloqueo no implementado
const showBlockToast = () => {
  toast.info('Bloqueo no implementado todavía');
};

// Cargar categorías y usuarios al montar el componente
onMounted(() => {
  fetchCategories(); // Cargar categorías
  fetchUsers(); // Cargar usuarios
});
</script>

<style scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #f59e0b;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
