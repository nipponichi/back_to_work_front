<template>
  <div class="p-6 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
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

        <div>
          <label class="block text-sm font-medium text-white mb-2">Provincia</label>
          <select
            v-model="user.province"
            class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-200"
          >
            <option disabled value="">Selecciona provincia</option>
            <option v-for="province in provinces" :key="province.id" :value="province">
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
        @click="updateUser"
        class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      >
        Guardar Cambios
      </button>
    </div>
  </div>
</template>


  
  <script>
  import UserService from '../services/api/user.service';
  import Select from 'primevue/select';
  import { useToast } from 'vue-toastification';
  
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    components: {
      Select
    },
    data() {
      return {
        provinces: [],
        categories: [],
        loggedInUser: null,
        showBidGrid: false,
        showNewBidRow: false,
        isSubmitting: false,
        toast: useToast(),
        password2: null,
      };
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
      async fetchProvinces() {
        try {
          const response = await UserService.get("provinces");
          this.provinces = response.data.data;
        } catch (error) {
          console.error('Error fetching provinces:', error);
          this.toast.error('Error loading provinces');
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
        this.toast.error('La contraseña no puede estar vacía');
        return;
      }

      if (this.user.password !== this.password2) {
        this.toast.error('Las contraseñas no coinciden');
        return;
      }


      if (this.user.password.length < 4) {
        this.toast.error('La contraseña debe tener al menos 4 caracteres');
        return;
      }
      console.log(this.user);
        
        try {
          const response = await UserService.update("users", this.user, this.user.id);
          if (response.data.success) {
            this.toast.success('User updated successfully');
            this.$emit('updateUser', this.user);
          } else {
            this.toast.error('Error updating user');
          }
        } catch (error) {
          console.error('Error updating user:', error);
          this.toast.error('Error updating user');
        } finally {
          this.isSubmitting = false;
        }
      }
    }
  };
  </script>