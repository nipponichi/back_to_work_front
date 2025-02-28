<template>
    <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
  
      <div class="flex justify-between mb-6">
        <div v-for="(stepName, index) in steps" :key="index" 
          class="text-sm font-semibold"
          :class="currentStep === index ? 'text-blue-600' : 'text-gray-400'">
          {{ stepName }}
        </div>
      </div>
  
      <div v-if="currentStep === 0">
        <h2 class="text-xl font-bold mb-4">Datos Personales</h2>
        <input type="text" v-model="form.firstName" placeholder="Nombre" class="input-field" />
        <input type="text" v-model="form.lastName" placeholder="Apellidos" class="input-field" />
        <input type="email" v-model="form.email" placeholder="Correo Electrónico" class="input-field" />
        <input type="tel" v-model="form.phone" placeholder="Teléfono" class="input-field" />
        <input type="text" v-model="form.province" placeholder="Provincia" class="input-field" />
      </div>
  
      <div v-if="currentStep === 1">
        <h2 class="text-xl font-bold mb-4">Preferencias y Términos</h2>
        <label class="flex items-center space-x-2 mb-2">
          <input type="checkbox" v-model="form.isProfessional" class="form-checkbox h-5 w-5 text-blue-600">
          <span>¿Eres profesional?</span>
        </label>
        <label class="flex items-center space-x-2 mb-2">
          <input type="checkbox" v-model="form.acceptTerms" class="form-checkbox h-5 w-5 text-blue-600">
          <span>Acepto la política de privacidad</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="checkbox" v-model="form.acceptMarketing" class="form-checkbox h-5 w-5 text-blue-600">
          <span>Recibir correos publicitarios</span>
        </label>
      </div>
  
      <div v-if="currentStep === 2">
        <h2 class="text-xl font-bold mb-4">Confirmar Datos</h2>
        <p class="mb-2"><strong>Nombre:</strong> {{ form.firstName }} {{ form.lastName }}</p>
        <p class="mb-2"><strong>Correo:</strong> {{ form.email }}</p>
        <p class="mb-2"><strong>Teléfono:</strong> {{ form.phone }}</p>
        <p class="mb-2"><strong>Provincia:</strong> {{ form.province }}</p>
        <p class="mb-2"><strong>Profesional:</strong> {{ form.isProfessional ? "Sí" : "No" }}</p>
        <p class="mb-2"><strong>Acepta términos:</strong> {{ form.acceptTerms ? "Sí" : "No" }}</p>
        <p><strong>Recibir publicidad:</strong> {{ form.acceptMarketing ? "Sí" : "No" }}</p>
      </div>
  
      <div v-if="currentStep === 3">
        <h2 class="text-xl font-bold mb-4">Crea tu Anuncio</h2>
        
        <div v-if="!form.isProfessional">
          <input type="text" v-model="ad.title" placeholder="Título del Anuncio" class="input-field" />
          <textarea v-model="ad.description" placeholder="Descripción" class="input-field"></textarea>
        </div>
  
        <div v-if="form.isProfessional">
          <input type="text" v-model="ad.businessName" placeholder="Nombre de la Empresa" class="input-field" />
          <input type="text" v-model="ad.businessCategory" placeholder="Categoría del Negocio" class="input-field" />
          <textarea v-model="ad.description" placeholder="Descripción de la Empresa" class="input-field"></textarea>
        </div>
      </div>
  
      <div class="flex justify-between mt-6">
        <button @click="prevStep" :disabled="currentStep === 0"
          class="btn-secondary">
          Anterior
        </button>
        <button @click="nextStep" :disabled="!canProceed"
          class="btn-primary">
          {{ currentStep === steps.length - 1 ? "Finalizar" : "Siguiente" }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from "vue";
  
  const currentStep = ref(0);
  
  const form = ref({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    province: "",
    isProfessional: false,
    acceptTerms: false,
    acceptMarketing: false
  });
  
  const ad = ref({
    title: "",
    description: "",
    businessName: "",
    businessCategory: ""
  });
  
  const steps = ["Datos", "Preferencias", "Confirmación", "Anuncio"];
  
  const canProceed = computed(() => {
    if (currentStep.value === 0) {
      return form.value.firstName && form.value.lastName && form.value.email &&
        form.value.phone && form.value.province;
    } else if (currentStep.value === 1) {
      return form.value.acceptTerms;
    } else if (currentStep.value === 3) {
      return form.value.isProfessional
        ? ad.value.businessName && ad.value.businessCategory && ad.value.description
        : ad.value.title && ad.value.description;
    }
    return true;
  });
  
  const nextStep = () => {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++;
    }
  };
  
  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  };
  
  watch(() => form.value.isProfessional, () => {
    if (currentStep.value > 2) {
      currentStep.value = 2;
    }
  });
  </script>

  