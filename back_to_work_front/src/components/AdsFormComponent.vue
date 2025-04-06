<template>
  <form @submit.prevent="submitForm" enctype="multipart/form-data">
    <!-- Campo Nombre -->
    <div>
      <label>Nombre:</label>
      <input 
        type="text" 
        v-model="formData.name" 
        required 
        minlength="3" 
        maxlength="50"
      >
      <p v-if="errors.name">{{ errors.name }}</p>
    </div>

    <!-- Campo Location -->
    <div>
      <label>Location:</label>
      <input 
        type="text" 
        v-model="formData.location" 
        required 
        minlength="3" 
        maxlength="50"
      >
      <p v-if="errors.location">{{ errors.location }}</p>
    </div>

    <!-- Campo Categoría -->
    <div>
      <label>Categoría:</label>
      <select v-model="formData.category_id" required>
        <option value="">Seleccione una categoría</option>
        <option 
          v-for="category in categories" 
          :key="category.id" 
          :value="category.id"
        >
          {{ category.category }}
        </option>
      </select>
      <p v-if="errors.category_id">{{ errors.category_id }}</p>
    </div>

    <!-- Campo Descripción -->
    <div>
      <label>Descripción:</label>
      <textarea 
        v-model="formData.description" 
        required 
        minlength="10" 
        maxlength="500"
      ></textarea>
      <p v-if="errors.description">{{ errors.description }}</p>
    </div>

    <!-- Campo Archivo -->
    <div class="bg-yellow-500 cursor-pointer">
      <label>Subir foto (JPEG, JPG, PNG) o video (MP4):</label>
      <input 
        type="file" 
        ref="fileInput"
        @change="handleFileUpload" 
        accept=".jpg,.jpeg,.png,.mp4" 
        multiple
      >
      <p v-if="errors.archivo">{{ errors.archivo }}</p>
    </div>

    <button class="bg-blue-500 rounded cursor-pointer py-2 px-4" type="submit">Enviar</button>
  </form>
</template>

<script>
import axios from 'axios';
import { EventBus } from './event-bus.js';

export default {
  data() {
    return {
      categories: [],
      formData: {
        name: '',
        description: '',
        category_id: '',
        location: '',
        is_done:'',
        archivo: null
      },
      errors: {
        name: '',
        description: '',
        category_id: '',
        location: '',
        is_done:'',
        archivo: ''
      },
      validExtensions: ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4']
    }
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories");
        if (response.data.success) {
          this.categories = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    handleFileUpload(event) {
      this.formData.archivo = event.target.files[0];
    },
    validateForm() {
      let isValid = true;

      if (this.formData.name.length < 3) {
        this.errors.name = 'El nombre debe tener al menos 3 caracteres';
        isValid = false;
      } else {
        this.errors.name = '';
      }

      if (this.formData.location.length < 3) {
        this.errors.location = 'La localización debe tener al menos 3 caracteres';
        isValid = false;
      } else {
        this.errors.location = '';
      }

      if (!this.formData.category_id) {
        this.errors.category_id = 'Por favor seleccione una categoría';
        isValid = false;
      } else {
        this.errors.category_id = '';
      }

      if (this.formData.description.length < 10) {
        this.errors.description = 'La descripción debe tener al menos 10 caracteres';
        isValid = false;
      } else {
        this.errors.description = '';
      }

      // Validación del archivo
      /*
      if (!this.formData.archivo) {
        this.errors.archivo = 'Por favor suba un archivo';
        isValid = false;
      } else if (!this.validExtensions.includes(this.formData.archivo.type)) {
        this.errors.archivo = 'Formato de archivo no válido. Use JPG, JPEG, PNG o MP4';
        isValid = false;
      } else {
        this.errors.archivo = '';
      }
      */

      return isValid;
    },
    async submitForm() {
      console.log('Enviando formulario...');

      if (this.validateForm()) {
        const formDataToSend = new FormData();
        formDataToSend.append('name', this.formData.name);
        formDataToSend.append('description', this.formData.description);
        formDataToSend.append('category_id', this.formData.category_id);
        formDataToSend.append('location', this.formData.location);
        formDataToSend.append('is_done', '0');
        formDataToSend.append('user_id', EventBus.userId);

        if (this.formData.archivo) {
        formDataToSend.append('media', this.formData.archivo);
        }

        // Debug: mostrar contenido del FormData
        console.log('Contenido del FormData:');
        for (let [key, value] of formDataToSend.entries()) {
          console.log(`${key}:`, value);
        }

        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/ads",
            formDataToSend,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );

          if (response.data.success) {
            alert('Anuncio creado con éxito!');
            // Reset form
            this.formData = {
              name: '',
              description: '',
              category_id: '',
              location: '',
              archivo: null
            };
            this.$refs.fileInput.value = '';
          }
        } catch (error) {
          console.error('Error al enviar el formulario:', error);
          alert('Hubo un error al enviar el formulario');
        }
      }
    }
  }
}
</script>
