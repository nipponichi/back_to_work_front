<template>
  <div class="p-6 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
    <div class="w-full flex justify-center relative">
      <div class="group relative w-[150px] h-[150px]">
      <img
        :src="userImage"
        @click="addImage"
        class="cursor-pointer shadow-xl rounded-full border-none object-cover w-full h-full"
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
    <h2 class="text-3xl font-bold text-white mb-8 text-center">
      {{ user.user_name || 'Usuario' }}
    </h2>

    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-white mb-2">Nombre</label>
          <input
            type="text"
            v-model="user.name"
            placeholder="Ej: Carlos Ruiz"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white mb-2">Email</label>
          <input
            type="email"
            v-model="user.email"
            placeholder="Ej: ejemplo@email.com"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-white mb-2">Teléfono</label>
          <input
            type="tel"
            v-model="user.phone"
            placeholder="Ej: 654987321"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
          />
        </div>

        <div class="flex-grow lg:max-w-xs">
          <label class="block text-sm font-medium text-white mb-1 sm:mb-2">Provincia</label>
          <select
            v-model="user.province"
            class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
          >
            <option disabled value="" class="text-gray-900">Selecciona provincia</option>
            <option 
              v-for="province in provinces" 
              :key="province.id" 
              :value="province"
              class="bg-blue-900 text-white"
            >
              {{ province.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-blue-100 mb-2">Contraseña</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="user.password"
            placeholder="Mínimo 8 caracteres"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white mb-2">Repetir Contraseña</label>
          <input
            :type="showPassword2 ? 'text' : 'password'"
            v-model="password2"
            placeholder="Confirma tu contraseña"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
          />
        </div>
      </div>
    </div>

    <div class="mt-10 flex justify-end space-x-4">
      <button
        @click="deleteUser"
        class="px-6 py-3 bg-gradient-to-r cursor-pointer from-purple-600 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      >
        Eliminar Cuenta
      </button>
      <button
        @click="updateUser"
        class="px-6 py-3 bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      >
        Guardar Cambios
      </button>
    </div>
  </div>
</template>
 
  <script>
  import UserService from '../services/api/user.service';
  import Select from 'primevue/select';
  import toast from '../services/toast.js'
  
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    components: {
      Select,
      toast
    },
    data() {
      return {
        provinces: [],
        categories: [],
        loggedInUser: null,
        showBidGrid: false,
        showNewBidRow: false,
        isSubmitting: false,
        password2: null,
      };
    },
    computed: {
      userImage() {
        return this.user?.image && this.user.image.trim() !== ''
          ? `${import.meta.env.VITE_IMG_URL}/${this.user.image}`
          : 'https://cdn-icons-png.flaticon.com/512/11461/11461171.png';
      },
    },
    watch: {
      'user.province': {
        handler(newVal) {
          if (newVal) {
            this.user.province_id = newVal.id;
          } else {
            this.user.province_id = null;
          }
        },
        deep: true
      }
    },
    async mounted() {
      await this.fetchProvinces();
      await this.fetchCategories();
      this.userCopy = { ...this.user };
      if (this.user.province_id && this.provinces.length) {
        this.user.province = this.provinces.find(
          p => p.id === this.user.province_id
        );
      }
    },
    methods: {
      
      deleteUser() {
        this.$emit('deleteUser', this.user.id);
      },

      addImage() {
        this.$refs.fileInput.click();
      },

      async onFileChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
          toast.error('Formato no válido. Solo JPG o PNG');
          return;
        }

        const formData = new FormData();
        formData.append('image', file);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
        try {
          const response = await UserService.updateForm('users/updateImage',formData, this.user.id);
          if (response.data.success) {
            this.user.image = response.data.image;
            toast.success('Imagen actualizada correctamente');
            localStorage.setItem('user', JSON.stringify(this.user));
          } else {
            toast.error('Error actualizando la imagen');
          }
        } catch (error) {
          console.error('Error al subir imagen:', error);
          toast.error('Error al subir la imagen');
        }
      },

      async fetchProvinces() {
        try {
          const response = await UserService.get("provinces");
          this.provinces = response.data.data;
        } catch (error) {
          console.error('Error fetching provinces:', error);
          toast.error('Error loading provinces');
        }
      },

      async fetchCategories() {
        try {
          const response = await UserService.get("categories");
          this.categories = response.data.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      async updateUser() {
        if (!this.user.password || this.user.password.trim() === '') {
          toast.error('La contraseña no puede estar vacía');
          return;
        }

        if (this.user.password !== this.password2) {
          toast.error('Las contraseñas no coinciden');
          return;
        }


        if (this.user.password.length < 4) {
          toast.error('La contraseña debe tener al menos 4 caracteres');
          return;
        }
        console.log(this.user);
          
          try {
            const response = await UserService.update("users", this.user, this.user.id);
            if (response.data.success) {
              toast.success('User updated successfully');
              localStorage.setItem('user', JSON.stringify(this.user));
              this.$emit('updateUser', this.user);
            } else {
              toast.error('Error updating user');
            }
          } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error updating user');
          } finally {
            this.isSubmitting = false;
          }
      }
    }
  };
  </script>