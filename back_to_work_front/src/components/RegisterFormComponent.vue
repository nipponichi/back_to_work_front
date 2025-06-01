<template>
  <div class="relative min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 pt-40">
    <div class="fixed inset-0 bg-[url('https://appwebel.com/assets/es/img/backgrounds/landing/landing.webp')] bg-cover bg-center opacity-10"></div>
    <div class="fixed inset-0 bg-blue-950/40"></div>

    <main class="relative z-10 flex justify-center items-center py-20 px-4 sm:px-6 lg:px-8">
      <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 sm:p-10 max-w-xl w-full">
        <div class="flex justify-between mb-8">
          <div v-for="(stepName, index) in steps" :key="index" 
            class="text-sm font-semibold px-3 py-1 rounded-full transition-colors duration-200"
            :class="currentStep === index ? 'bg-blue-600 text-white shadow' : 'bg-white/20 text-white/70'">
            Paso {{ index + 1 }}
          </div>
        </div>

        <div class="space-y-6">
          <div v-if="currentStep === 0">
            <h2 class="text-xl font-bold text-white mb-4">Datos Usuario</h2>
            <div v-for="field in ['user_name', 'password', 'password2', 'email']" :key="field">
              <label class="block mb-2 text-sm font-medium text-white">{{ field === 'user_name' ? 'Username' : field === 'password2' ? 'Repite Contraseña' : capitalize(field) }} <span class="text-red-400">*</span></label>
              <input 
                :type="field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'"
                v-model="form[field]" 
                :placeholder="field === 'user_name' ? 'JohnCobra' : field === 'email' ? 'johndoe@mail.com' : '••••••'" 
                class="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:outline-none transition" />
            </div>
          </div>

          <div v-else-if="currentStep === 1">
            <h2 class="text-xl font-bold text-white mb-4">Datos Personales</h2>
            <div v-for="field in ['firstName', 'lastName', 'phone']" :key="field">
              <label class="block mb-2 text-sm font-medium text-white">{{ field === 'firstName' ? 'Nombre' : field === 'lastName' ? 'Apellidos' : 'Teléfono' }} <span v-if="field !== 'phone'" class="text-red-400">*</span></label>
              <input 
                type="text"
                v-model="form[field]" 
                :placeholder="field === 'firstName' ? 'John' : field === 'lastName' ? 'Doe' : '654987321'" 
                class="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:outline-none transition" />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-white">Provincia <span class="text-red-400">*</span></label>
              <Select 
                v-model="form.province"
                :options="provinces"
                optionLabel="name"
                placeholder="Selecciona provincia"
                class="w-full text-black" />
            </div>
          </div>

          <div v-else-if="currentStep === 2">
            <h2 class="text-xl font-bold text-white mb-4">Preferencias</h2>
            <div class="space-y-2">
              <label class="flex items-center text-white">
                <input type="checkbox" v-model="form.acceptTerms" class="mr-2 rounded" />
                Acepto términos y condiciones <span class="text-red-400 ml-1">*</span>
              </label>
              <label class="flex items-center text-white">
                <input type="checkbox" v-model="form.acceptMarketing" class="mr-2 rounded" />
                Acepto recibir marketing
              </label>
              <label class="flex items-center text-white">
                <input type="checkbox" v-model="form.is_pro" class="mr-2 rounded" />
                ¿Eres profesional?
              </label>
            </div>
            <div v-if="form.is_pro" class="mt-4">
              <label class="block mb-2 text-sm font-medium text-white">Categorías Pro</label>
              <select 
                v-model="selectedCategory"
                @change="addCategory"
                class="w-full px-3 py-2 rounded bg-white text-sm font-medium text-gray-700 border border-white/20">
                <option value="" disabled selected>Selecciona categorías</option>
                <option v-for="category in availableCategories" :key="category.id" :value="category">
                  {{ category.category }}
                </option>
              </select>
              <div class="flex flex-wrap gap-2 mt-2">
                <span v-for="(category, index) in form.categories" :key="category.id"
                  class="flex items-center px-2 py-1 text-sm font-medium bg-indigo-500 text-white rounded">
                  {{ category.category }}
                  <button @click="removeCategory(index)" class="ml-2 text-xs hover:text-gray-300">✕</button>
                </span>
              </div>
            </div>
          </div>

          <div v-else-if="currentStep === 3">
            <h2 class="text-xl font-bold text-white mb-4">Confirmación</h2>
            <ul class="list-disc list-inside text-white space-y-1">
              <li>Username: {{ form.user_name }}</li>
              <li>Nombre completo: {{ form.firstName }} {{ form.lastName }}</li>
              <li>Email: {{ form.email }}</li>
              <li>Teléfono: {{ form.phone || 'No hay teléfono seleccionado' }}</li>
              <li>Provincia: {{ form.province.name }}</li>
              <li>Profesional: {{ form.is_pro ? 'Sí' : 'No' }}</li>
              <li>Términos: {{ form.acceptTerms ? 'Aceptados' : 'No aceptados' }}</li>
              <li>Marketing: {{ form.acceptMarketing ? 'Sí' : 'No' }}</li>
              <li>Categorías: {{ form.categories.length ? form.categories.map(c => c.category).join(', ') : 'No seleccionadas' }}</li>
            </ul>
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <button 
            v-if="currentStep > 0"
            @click="prevStep"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded transition">
            Anterior
          </button>
          <button 
            @click="nextStep"
            :disabled="!canProceed"
            class="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition disabled:opacity-50">
            {{ currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente' }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
  
<script>
import UserService from '../services/api/user.service';
import Select from 'primevue/select';
import { useToast } from 'vue-toastification';

export default {
components: {
    Select,
  },
  data() {
    return {
      selectedCategory: null,
      provinces: [],
      categories: [],
      currentStep: 0,
      selectedProvince: null,
      selectedCategory: null,
      form: {
        user_name: "",
        name: "",
        firstName: "",
        lastName: "",
        password: "",
        password2: "",
        email: "",
        phone: "",
        province: "",
        province_id: "",
        is_pro: false,
        acceptTerms: false,
        acceptMarketing: false,
        categories: []
      },
      steps: ["1", "2", "3", "4"],
      toast: useToast()
    };
  },
  components: {   
    Select,
  },
  async mounted() {
    await this.fetchProvinces()
    await this.fetchCategories()
  },
  computed: {
    canProceed() {
      if (this.currentStep === 0) {
        return this.form.user_name && this.form.email &&
          this.form.password && this.form.password2 &&
          this.form.password === this.form.password2;
      } else if (this.currentStep === 1) {
        return this.form.firstName && this.form.lastName && 
        this.form.province;
      } else if (this.currentStep === 2) {
        if (this.form.is_pro) {
          return this.form.categories.length > 0;
        }
        return this.form.acceptTerms;
      }
      return true;
    },
    availableCategories() {
      return this.categories.filter(cat => 
        !this.form.categories.some(selected => selected.id === cat.id)
      );
    },
  },
  methods: {
    capitalize(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    addCategory() {
      if (this.selectedCategory && !this.form.categories.some(c => c.id === this.selectedCategory.id)) {
        this.form.categories.push(this.selectedCategory);
        this.selectedCategory = null;
      }
    },
    
    removeCategory(index) {
      this.form.categories.splice(index, 1);
    },
    async fetchProvinces() {
      try {
        const response = await UserService.get("provinces");
        this.provinces = response.data.data;
      } catch (error) {
        console.error('Error fetching provinces:', error);
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

    async saveUser() {
      try {
        this.form.name = `${this.form.firstName} ${this.form.lastName}`
        if (this.form.province && typeof this.form.province === 'object') {
          this.form.province_id = this.form.province.id;
        }
        const response = await UserService.set('users', this.form);
        if (response.data.success) {
          this.toast.success("User registered successfully");
          this.$router.push("/login");
        } else {
          this.toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error saving user:', error);
        this.toast.error("Error saving user");
      }
    },

    nextStep() {
      console.log(this.currentStep)
      console.log(this.steps.length-1)
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      } else if (this.currentStep === this.steps.length - 1) {
        this.saveUser();
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    }
  },
  watch: {
    'form.name': function() {
      this.form.name = `${this.form.firstName} ${this.form.lastName}`;
    },
    
    'form.province':function() {
      console.log(this.form.province)
    },

    'form.is_pro': function(newVal) {
      if (!newVal) {
        this.form.categories = [];
      }
      if (this.currentStep > 3) {
        this.currentStep = 3;
      }
    },
  },
  
};
</script>

  