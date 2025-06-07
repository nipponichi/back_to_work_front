<template>
  <div class="p-6 text-white">
    <h1 class="text-2xl font-bold mb-4">Administración de Usuarios</h1>

    <Button label="Añadir Usuario" icon="pi pi-plus" class="mb-4" @click="openNewUserDialog" />

    <DataTable :value="users" dataKey="id" paginator rows="10" sortable responsiveLayout="scroll">
      <Column field="id" header="ID" sortable/>
      <Column field="user_name" header="Usuario" sortable/>
      <Column field="email" header="Email" sortable/>
      <Column field="phone" header="Teléfono" sortable/>
      <Column field="provinces.name" header="Provincia" sortable/>
      <Column field="is_pro" header="¿Es Pro?" sortable>
        <template #body="slotProps">
          <span>{{ slotProps.data.is_pro ? 'Sí' : 'No' }}</span>
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="mr-2" @click="editUser(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-danger" @click="deleteUser(slotProps.data.id)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="editDialogVisible" header="Editar Usuario" :modal="true" class="w-[30rem]">
      <div class="flex flex-col gap-4">
        <div>
          <label class="block mb-1">Usuario</label>
          <InputText v-model="selectedUser.user_name" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">Email</label>
          <InputText v-model="selectedUser.email" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">Teléfono</label>
          <InputText v-model="selectedUser.phone" class="w-full" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancelar" @click="editDialogVisible = false" />
        <Button label="Guardar" class="p-button-success" @click="saveUser" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import UserService from '../services/api/user.service';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

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
      users: [],
      selectedUser: {},
      editDialogVisible: false
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await UserService.get('users');
        this.users = response.data.data;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    },
    openNewUserDialog() {
      this.selectedUser = { user_name: '', email: '', phone: '' };
      this.editDialogVisible = true;
    },
    editUser(user) {
      this.selectedUser = { ...user };
      this.editDialogVisible = true;
    },
    async saveUser() {
      try {
        if (this.selectedUser.id) {
          await UserService.update('users', this.selectedUser, this.selectedUser.id);
        } else {
          await UserService.set('users', this.selectedUser);
        }
        this.editDialogVisible = false;
        this.fetchUsers();
      } catch (error) {
        console.error('Error al guardar usuario:', error);
      }
    },
    async deleteUser(id) {
      try {
        await UserService.delete('users', id);
        this.fetchUsers();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  }
}
</script>
