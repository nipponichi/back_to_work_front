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

    <!-- Modal para añadir o editar categoría -->
    <Dialog v-model:visible="addCategoryModal" :header="modalTitle" modal :closable="true" class="w-96" :style="{ transition: 'all 0.3s ease' }">
      <div class="flex flex-col gap-4 p-4">
        <label class="text-gray-800 font-semibold">Category Name:</label>
        <InputText v-model="newCategoryName" placeholder="Enter category name..." />

        <label class="text-gray-800 font-semibold mt-4">Description (max 256 chars):</label>
        <textarea
          v-model="newCategoryDescription"
          placeholder="Enter description..."
          maxlength="256"
          rows="4"
          class="p-2 border rounded-md text-gray-800"
        ></textarea>
        <div class="text-right text-sm text-gray-500">{{ newCategoryDescription.length }}/256</div>

        <div class="flex justify-end gap-4 mt-6">
          <button
            @click="saveCategory"
            :disabled="savingCategory"
            class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <template v-if="savingCategory">
              <span class="loader mr-2"></span> Saving...
            </template>
            <template v-else>
              Save
            </template>
          </button>

          <button
            @click="closeAddCategoryModal"
            :disabled="savingCategory"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
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

const toast = useToast();

// Estados reactivos
const categories = ref([]);
const loadingCategories = ref(true);
const addCategoryModal = ref(false);
const editingCategoryId = ref(null);
const newCategoryName = ref('');
const newCategoryDescription = ref('');
const savingCategory = ref(false);
const modalTitle = ref('Add New Category'); // Título del modal

// Función para obtener las categorías
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

// Función para abrir la modal de edición
const openEditCategoryModal = (category) => {
  newCategoryName.value = category.category;
  newCategoryDescription.value = category.description;
  editingCategoryId.value = category.id;
  modalTitle.value = "Edit Category"; // Cambiar título al editar
  addCategoryModal.value = true;
};

// Función para abrir la modal de agregar
const openAddCategoryModal = () => {
  modalTitle.value = "Add New Category"; // Título al abrir la modal de agregar
  newCategoryName.value = '';
  newCategoryDescription.value = '';
  editingCategoryId.value = null;
  addCategoryModal.value = true;
};

// Función para cerrar la modal
const closeAddCategoryModal = () => {
  addCategoryModal.value = false;
  resetForm();
};

// Función para guardar la categoría (crear o editar)
const saveCategory = async () => {
  if (!newCategoryName.value.trim()) {
    toast.error('Category name cannot be empty');
    return;
  }
  if (newCategoryDescription.value.length > 256) {
    toast.error('Description must be less than 256 characters');
    return;
  }

  const payload = {
    category: newCategoryName.value,
    description: newCategoryDescription.value
  };

  try {
    let response;
    if (editingCategoryId.value) {
      // Si se está editando una categoría existente, usa PUT
      response = await CategoryService.put(`categories/${editingCategoryId.value}`, payload);
      if (response.data.success) {
        toast.success('Category updated successfully!');
      } else {
        toast.error('Failed to update category.');
      }
    } else {
      // Si no se está editando, es una nueva categoría, usa POST
      response = await CategoryService.post('categories', payload);
      if (response.data.success) {
        toast.success('Category added successfully!');
      } else {
        toast.error('Failed to add category.');
      }
    }
    fetchCategories(); // Actualiza la lista de categorías
    closeAddCategoryModal(); // Cierra el modal
  } catch (error) {
    toast.error('Error saving category.');
  }
};

// Función para eliminar la categoría
const deleteCategory = async (categoryId) => {
  try {
    const response = await CategoryService.delete(`categories/${categoryId}`);
    if (response.data.success) {
      toast.success('Category deleted successfully!');
      fetchCategories(); // Actualiza la lista de categorías
    } else {
      toast.error('Failed to delete category.');
    }
  } catch (error) {
    toast.error('Error deleting category.');
  }
};

// Función para restablecer los campos del formulario
const resetForm = () => {
  newCategoryName.value = '';
  newCategoryDescription.value = '';
  editingCategoryId.value = null;
};

onMounted(() => {
  fetchCategories(); // Cargar categorías al montar el componente
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