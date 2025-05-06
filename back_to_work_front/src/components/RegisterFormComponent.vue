<template>
  <div class="min-h-screen bg-white pt-44 pb-12 px-4 sm:px-6 lg:px-8">

    <div class="max-w-md mx-auto bg-gray-200 p-8 rounded-xl shadow-lg border border-gray-100 min-h-[500px]">
      
      <div class="flex justify-between mb-8">
        <div v-for="(stepName, index) in steps" :key="index" 
          class="text-sm font-semibold px-2 pb-1 border-b-2"
          :class="currentStep === index ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-transparent'">
          {{ stepName }}
        </div>
      </div>

      <div v-if="currentStep === 0" class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800">Datos Personales</h2>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" v-model="form.firstName" placeholder="John" class="w-1/2 p-2 rounded border border-gray-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Apellidos</label>
            <input type="text" v-model="form.lastName" placeholder="Doe" class="w-1/2 p-2 rounded border border-gray-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"  />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input type="email" v-model="form.email" placeholder="johndoe@mail.com" class="w-1/2 p-2 rounded border border-gray-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"  />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" v-model="form.phone" placeholder="654987321" class="w-1/2 p-2 rounded border border-gray-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"  />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Province</label>
            <Select v-model="form.province" editable :options="provinces" optionLabel="name" :optionValue="(province) => province" placeholder="Select a province" class="w-full md:w-56" />
          </div>
      </div>

      <div v-else-if="currentStep === 1" class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800">Preferencias</h2>
        <div class="flex justify-between">
          <label class="block mb-2 text-sm font-medium text-gray-700">¿Eres profesional?</label>
          <input type="checkbox" v-model="form.is_pro" />
        </div>
        <div class="flex justify-between">
          <label class="block mb-2 text-sm font-medium text-gray-700">Acepto términos y condiciones</label>
          <input type="checkbox" v-model="form.acceptTerms" />
        </div>
        <div class="flex justify-between">
          <label class="block mb-2 text-sm font-medium text-gray-700">Acepto recibir marketing</label>
          <input type="checkbox" v-model="form.acceptMarketing" />
        </div>
      </div>

      <div v-else-if="currentStep === 2" class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800">Confirmación</h2>
        <p>Por favor, revisa tus datos antes de continuar.</p>
        <ul class="list-disc pl-5">
          <li>Nombre: {{ form.name }}</li>
          <li>Email: {{ form.email }}</li>
          <li>Teléfono: {{ form.phone }}</li>
          <li>Provincia: {{ form.province.name }}</li>
          <li>¿Eres profesional?: {{ form.is_pro ? "Sí" : "No" }}</li>
          <li>¿Aceptas términos y condiciones?: {{ form.acceptTerms ? "Sí" : "No" }}</li>
          <li>¿Aceptas recibir marketing?: {{ form.acceptMarketing ? "Sí" : "No" }}</li>
        </ul>
      </div>
      <!-- poner componente formulario crear anuncio -->

      <AdsFormComponent v-if="currentStep === 3" :categories="categories" :ad="ad" />

<!--       <div v-else-if="currentStep === 3" class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800"> {{ !form.is_pro ? "Anuncio" : "Categoria" }} </h2>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Título</label>
          <input type="text" v-model="ad.title" placeholder="Título del anuncio" class="w-1/2 p-2 rounded border border-gray-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Descripción</label>
          <textarea v-model="ad.description" placeholder="Descripción del anuncio" class="w-full p-2 rounded border border-gray-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"></textarea>
        </div>
        <div v-if="form.is_pro">
          <label class="block mb-2 text-sm font-medium text-gray-700">Nombre del negocio</label>
          <input type="text" v-model="ad.businessName" placeholder="Nombre del negocio" class="w-full p-2 rounded border border-gray-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
        </div>
        <div v-if="form.is_pro">
          <label class="block mb-2 text-sm font-medium text-gray-700">Categoría del negocio</label>
          <input type="text" v-model="ad.businessCategory" placeholder="Categoría del negocio" class="w-full p-2 rounded border border-gray-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
        </div>
      </div> -->

      <div class="mt-auto pt-6 flex justify-between border-t border-gray-200">
        <button 
          @click="prevStep" 
          :disabled="currentStep === 0"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        <button 
          @click="nextStep" 
          :disabled="!canProceed"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {{ currentStep === steps.length - 1 ? "Finalizar" : "Siguiente" }}
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>
import UserService from '../services/api/user.service';
import Select from 'primevue/select';
import AdsFormComponent from '../modals/AdsFormComponent.vue';


export default {
components: {
    Select,
    AdsFormComponent
  },
  data() {
    return {
      provinces: [],
      categories: [],
      currentStep: 0,
      selectedProvince: null,
      selectedCategory: null,
      form: {
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        province: "",
        is_pro: false,
        acceptTerms: false,
        acceptMarketing: false
      },
      ad: {
        title: "",
        description: "",
        businessName: "",
        businessCategory: ""
      },
      steps: ["Datos", "Preferencias", "Confirmación", "Empieza en BTW"]
    };
  },
  components: {   
    Select,
    AdsFormComponent,
  },
  async mounted() {
    await this.fetchProvinces()
    await this.fetchCategories()
  },
  computed: {

    canProceed() {
      if (this.currentStep === 0) {
        return this.form.firstName && this.form.lastName && this.form.email &&
          this.form.phone && this.form.province;
      } else if (this.currentStep === 1) {
        return this.form.acceptTerms;
      } else if (this.currentStep === 3) {
        return this.form.isProfessional
          ? this.ad.businessName && this.ad.businessCategory && this.ad.description
          : this.ad.title && this.ad.description;
      }
      return true;
    }
  },
  methods: {
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
      //try {
      console.log(this.form.province)
        //const response = await UserService.post("users", this.form);
        console.log(this.form)
/*         if (response.data.success) {
          this.$toast.success("User registered successfully");
          this.$router.push("/login");
        } else {
          this.$toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error saving user:', error);
        this.$toast.error("Error saving user");
      } */
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

    'form.is_pro': function() {
      if (this.currentStep > 2) {
        this.currentStep = 2;
      }
    }
  },
  
};
</script>

  