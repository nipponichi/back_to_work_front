<template>
  <div class="p-6 text-black">
    <h1 class="text-2xl font-bold mb-6">Administración de Usuarios</h1>

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
            <Button
            icon="pi pi-pencil"
            class="p-button p-button-sm mr-2"
            @click="editUser(slotProps.data)"
            />
            <Button
            icon="pi pi-trash"
            class="p-button p-button-danger p-button-sm mr-2"
            @click="deleteUser(slotProps.data.id)"
            />
            <Button
            :icon="slotProps.data.is_blocked ? 'pi pi-lock' : 'pi pi-lock-open'"
            class="p-button p-button-warning p-button-sm mr-2"
            @click="toggleBlockUser(slotProps.data)"
            />
            <Button
            icon="pi pi-star"
            class="p-button p-button-help p-button-sm"
            @click="openReviewsDialog(slotProps.data)"
            />
        </template>
        </Column>
    </DataTable>

    <Dialog v-model:visible="editDialogVisible" header="Editar Usuario" :modal="true" class="w-[30rem]">
        <div class="flex flex-col gap-4">
            <div>
            <label class="block mb-1">Email</label>
            <InputText v-model="selectedUser.email" class="w-full" />
            </div>
            <div>
            <label class="block mb-1">Usuario</label>
            <InputText v-model="selectedUser.user_name" class="w-full" />
            </div>
            <div>
            <label class="block mb-1">¿Es Pro?</label>
            <InputText :value="selectedUser.is_pro ? 'Sí' : 'No'" disabled class="w-full bg-gray-300 text-black" />
            </div>
            <div>
                <label class="block mb-1">Rol</label>
                <select v-model="selectedUser.rol" class="w-full px-3 py-2 rounded bg-white text-black">
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>
            </div>
            <div>
                <label class="block mb-1">Imagen</label>
                <div class="w-full flex justify-center">
                    <div class="group relative w-[120px] h-[120px]">
                        <img
                        :src="userImage"
                        @click="addImage"
                        class="cursor-pointer shadow-xl rounded-full border border-white/20 object-cover w-full h-full"
                        alt="Foto de perfil"
                        />

                        <input
                        type="file"
                        ref="fileInput"
                        accept="image/jpeg, image/jpg, image/png"
                        style="display: none"
                        @change="onFileChange"
                        />

                        <div
                        class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer"
                        @click="addImage"
                        >
                        <i class="pi pi-camera text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Cancelar" @click="editDialogVisible = false" />
            <Button label="Guardar" class="p-button-success" @click="saveUser" />
        </template>
    </Dialog>

    <Dialog v-model:visible="reviewsDialogVisible" header="Valoraciones del Usuario" :modal="true" class="w-[50rem]">
    <AdminUserRating 
        :user="selectedUser" 
        @close="reviewsDialogVisible = false" />
    </Dialog>

  </div>
</template>

<script>
import swalService from '../services/swal.js'
import toast from '../services/toast.js'
import UserService from '../services/api/user.service';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import AdminUserRating from '../modals/AdminUserRatingComponent.vue'

export default {
  components: {
    DataTable,
    Column,
    Button,
    Dialog,
    InputText,
    AdminUserRating
  },
  data() {
    return {
      users: [],
      selectedUser: {},
      editDialogVisible: false,
      reviewsDialogVisible: false
    }
  },
  mounted() {
    this.fetchUsers();
  },
  computed: {
  userImage() {
    return this.selectedUser?.image && this.selectedUser.image.trim() !== ''
      ? `${import.meta.env.VITE_IMG_URL}/${this.selectedUser.image}`
      : 'https://cdn-icons-png.flaticon.com/512/11461/11461171.png'
  },
},
  methods: {
    addImage() {
        this.$refs.fileInput.click()
        },

        async onFileChange(event) {
        const file = event.target.files[0]
        if (!file) return

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
        if (!validTypes.includes(file.type)) {
            toast.error('Formato no válido. Solo JPG o PNG')
            return
        }

        const formData = new FormData()
        formData.append('image', file)

        try {
            const response = await UserService.updateForm('users/updateImage', formData, this.selectedUser.id)
            if (response.data.success) {
            this.selectedUser.image = response.data.image
            toast.success('Imagen actualizada correctamente')
            } else {
            toast.error('Error actualizando la imagen')
            }
        } catch (error) {
            console.error('Error al subir imagen:', error)
            toast.error('Error al subir la imagen')
        }
    },

    async openReviewsDialog(user) {
        try {
            const response = await UserService.show('users', user.id);
            this.selectedUser = response.data.data;
            this.reviewsDialogVisible = true;
        } catch (error) {
            console.error('Error al obtener valoraciones:', error);
            toast.error('No se pudieron cargar las valoraciones');
        }
    },
    async toggleBlockUser(user) {
        try {
            if (user.is_blocked) {
            await UserService.show('users/block', user.id);
            user.is_blocked = false;
            toast.success('Usuario desbloqueado');
            } else {
            await UserService.show('users/block', user.id);
            user.is_blocked = true;
            toast.success('Usuario bloqueado');
            }
        } catch (error) {
            toast.error('Error al cambiar el estado del usuario');
        }
    },
    async fetchUsers() {
      try {
        const response = await UserService.get('users');
        this.users = response.data.data;
        console.log(this.users)
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        toast.error('No se pudieron cargar los usuarios');
      }
    },
     
    openNewUserDialog() {
      this.selectedUser = { user_name: '', email: '', phone: '' };
      this.editDialogVisible = true;
    },

    async editUser(user) {
        try {
            const response = await UserService.show('users', user.id);
            this.selectedUser = {
            ...response.data.data,
            rol: response.data.data.roles?.[0]?.name || 'user'
            };
            console.log(this.selectedUser)
            this.editDialogVisible = true;
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            this.toast.error('No se pudo cargar el usuario');
        }
    },

    async saveUser() {
      try {
        if (this.selectedUser.id) {
            const response = await UserService.update('users', this.selectedUser, this.selectedUser.id);
            console.log(response.data.success)
            if (response.data.success) {
                const index = this.users.findIndex(user => user.id === this.selectedUser.id);
                if (index !== -1) {
                    this.users[index] = { ...this.selectedUser };
                    toast.success(response.data.message)
                }
            }
        } else {
          const response = await UserService.set('users', this.selectedUser);
            if (response.data.success) {
                const index = this.users.findIndex(user => user.id === this.selectedUser.id);
                if (index !== -1) {
                    this.users.unshift(response.data.data)
                    this.toast.success(response.data.message)
                }
            }
        }
        this.editDialogVisible = false;

      } catch (error) {
        console.error('Error al guardar usuario:', error);
        toast.error('No se pudo guardar el usuario');
      }
    },

    async deleteUser(id) {
        try {
            const response = await swalService.confirm('¿Desea eliminar este usuario?');
            if (response.isConfirmed) {
                await UserService.delete('users', id);
                this.users = this.users.filter(user => user.id !== id);
                toast.success('Usuario eliminado correctamente');
            }

        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            toast.error('No se pudo eliminar el usuario');
        }
    }
  }
}
</script>
