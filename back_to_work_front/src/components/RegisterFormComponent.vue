<template>
  <div class="relative min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 pt-40">
    <div class="fixed inset-0 bg-[url('https://appwebel.com/assets/es/img/backgrounds/landing/landing.webp')] bg-cover bg-center opacity-10"></div>
    <div class="fixed inset-0 bg-blue-950/40"></div>

    <main class="relative z-10 flex justify-center items-center py-20 px-4 sm:px-6 lg:px-8">
      <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 sm:p-10 max-w-xl w-full">
        
        <div class="max-w-xl mx-auto mb-8">
          <div class="flex pb-3">
            <div class="flex-1"></div>
            <template v-for="(step, index) in steps" :key="index">
              <div class="flex-1">
                <div 
                  :class="[
                    'w-10 h-10 mx-auto rounded-full text-lg flex items-center justify-center',
                    currentStep > index ? 'bg-green-500 text-white' :
                    currentStep === index ? 'bg-blue-600 text-white' :
                    'bg-white border-2 border-gray-300 text-gray-500'
                  ]"
                >
                  <span v-if="currentStep > index">
                    <i class="pi pi-check mt-2 ml-1 text-white"></i>
                  </span>
                  <span v-else>
                    {{ index + 1 }}
                  </span>
                </div>
              </div>
              <div v-if="index < steps.length - 1" class="w-1/6 flex items-center">
                <div class="w-full bg-gray-300 rounded h-1">
                  <div
                    :style="{ width: currentStep > index ? '100%' : currentStep === index ? '50%' : '0%' }"
                    :class="[
                      'h-1 rounded transition-all duration-300',
                      currentStep > index ? 'bg-green-500' :
                      currentStep === index ? 'bg-blue-500' :
                      'bg-gray-300'
                    ]"
                  ></div>
                </div>
              </div>
            </template>
            <div class="flex-1"></div>
          </div>

          <div class="flex text-xs text-center text-white">
            <div v-for="(label, index) in stepLabels" :key="index" class="w-1/4">
              {{ label }}
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div v-if="currentStep === 0">
            <h2 class="text-xl font-bold text-white mb-4">Datos Usuario</h2>

            <div class="w-full flex justify-center mb-6">
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

            <div v-for="field in ['user_name', 'password', 'password2', 'email']" :key="field">
              <label class="block mb-2 text-sm font-medium text-white">
                {{ field === 'user_name' ? 'Username' : field === 'password2' ? 'Repite Contraseña' : capitalize(field) }}
                <span class="text-red-400">*</span>
              </label>
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
            <div class="flex-grow lg:max-w-xl">
              <label class="block text-sm font-medium text-white mb-1 sm:mb-2">Provincia</label>
              <select 
                v-model="form.province"
                class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
              >
                <option disabled value="">Selecciona provincia</option>
                <option 
                  v-for="location in provinces"
                  :key="location.id"
                  :value="location"
                  class="bg-blue-900 text-white"
                >
                  {{ location.name }}
                </option>
              </select>
            </div>
          </div>

          <div v-else-if="currentStep === 2">
            <h2 class="text-xl font-bold text-white mb-4">Preferencias</h2>
            <div class="space-y-3">
              <label class="flex items-center space-x-2 text-white">
                <input type="checkbox" v-model="form.acceptTerms" class="accent-blue-500 w-5 h-5 rounded focus:ring focus:ring-blue-300" />
                <span>Acepto términos y condiciones <span class="text-red-400 ml-1">*</span></span>
              </label>
              <label class="flex items-center space-x-2 text-white">
                <input type="checkbox" v-model="form.acceptMarketing" class="accent-blue-500 w-5 h-5 rounded focus:ring focus:ring-blue-300" />
                <span>Acepto recibir marketing</span>
              </label>
              <label class="flex items-center space-x-2 text-white">
                <input type="checkbox" v-model="form.is_pro" class="accent-blue-500 w-5 h-5 rounded focus:ring focus:ring-blue-300" />
                <span>¿Eres profesional?</span>
              </label>
            </div>
            <div v-if="form.is_pro" class="mt-4">
              <label class="block mb-2 text-sm font-medium text-white">Categorías Pro</label>
              <select 
                v-model="selectedCategory"
                @change="addCategory"
                class="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-200"
              >
                <option value="" disabled selected class="text-gray-900">Selecciona categorías</option>
                <option 
                  v-for="category in availableCategories" 
                  :key="category.id" 
                  :value="category"
                  class="bg-blue-900 text-white"
                >
                  {{ category.category }}
                </option>
              </select>
              <div class="flex flex-wrap gap-2 mt-2">
                <span 
                  v-for="(category, index) in form.categories" 
                  :key="category.id"
                  class="flex items-center px-2 py-1 text-sm font-medium bg-indigo-500 text-white rounded"
                >
                  {{ category.category }}
                  <button 
                    @click="removeCategory(index)" 
                    class="ml-2 text-xs hover:text-gray-300"
                  >✕</button>
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
              <li>Profesional: {{ form.is_pro ? 'Si' : 'No' }}</li>
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
  components: { Select },
  data() {
    return {
      userImageUrl: '',
      imageFile: null,
      selectedCategory: null,
      selectedProvince: null,
      provinces: [],
      categories: [],
      currentStep: 0,
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
      stepLabels: [
        "Datos Usuario",
        "Datos Personales",
        "Preferencias",
        "Confirmación"
      ],
      toast: useToast()
    };
  },
  async mounted() {
    await this.fetchProvinces();
    await this.fetchCategories();
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
    userImage() {
      return this.userImageUrl || 'https://cdn-icons-png.flaticon.com/512/11461/11461171.png';
    },
    availableCategories() {
      return this.categories.filter(cat => 
        !this.form.categories.some(selected => selected.id === cat.id)
      );
    },
  },
  methods: {
    addImage() {
      this.$refs.fileInput.click();
    },
    
    async onFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        this.toast.error('Formato no válido. Solo JPG o PNG');
        return;
      }

      this.imageFile = file;
      this.userImageUrl = URL.createObjectURL(file);
    },

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
        const response = await UserService.get("categories/public");
        this.categories = response.data.data;
        console.log(this.categories)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },

    async saveUser() {
      try {
        console.log(this.selectedProvince)
        this.form.name = `${this.form.firstName} ${this.form.lastName}`;

        const formData = new FormData();

        if (this.form.province && typeof this.form.province === 'object') {
          this.form.province_id = this.form.province.id;
          this.form.province = this.form.province.name;
        }

        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }

        Object.keys(this.form).forEach(key => {
          const value = this.form[key];

          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, JSON.stringify(item));
            });
          } else if (typeof value === 'object' && value !== null) {
            formData.append(key, JSON.stringify(value));
          } else if (typeof value === 'boolean') {
            formData.append(key, value ? 'true' : 'false');
          } else {
            formData.append(key, value);
          }
        });

        const response = await UserService.set('user/public', formData);
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
    selectedProvince(province) {
      console.log(province)
      this.form.province = province.name;
      this.form.province_id = province.id;
    },
    'form.name': function() {
      this.form.name = `${this.form.firstName} ${this.form.lastName}`;
    },
    'form.is_pro': function(newVal) {
      if (!newVal) {
        this.form.categories = [];
      }
    }
  },
};
</script>
