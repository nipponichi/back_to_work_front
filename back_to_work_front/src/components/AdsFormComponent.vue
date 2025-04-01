<template>
  <form @submit.prevent="submitForm" enctype="multipart/form-data">
    <!-- Campo Nombre -->
    <div>
      <label>Nombre:</label>
      <input 
        type="text" 
        v-model="formData.nombre" 
        required 
        minlength="3" 
        maxlength="50"
      >
      <p v-if="errors.nombre">{{ errors.nombre }}</p>
    </div>

    <!-- Campo Categoría -->
    <div>
      <label>Categoría:</label>
      <select v-model="formData.categoria" required>
        <option value="">Seleccione una categoría</option>
        <option 
          v-for="category in categories" 
          :key="category.id" 
          :value="category.id"
        >
          {{ category.category }}
        </option>
      </select>
      <p v-if="errors.categoria">{{ errors.categoria }}</p>
    </div>

    <!-- Campo Descripción -->
    <div>
      <label>Descripción:</label>
      <textarea 
        v-model="formData.descripcion" 
        required 
        minlength="10" 
        maxlength="500"
      ></textarea>
      <p v-if="errors.descripcion">{{ errors.descripcion }}</p>
    </div>

    <!-- Campo Archivo -->
    <div>
      <label>Subir foto (JPEG, JPG, PNG) o video (MP4):</label>
      <input 
        type="file" 
        @change="handleFileUpload" 
        accept=".jpg,.jpeg,.png,.mp4" 
        required
      >
      <p v-if="errors.archivo">{{ errors.archivo }}</p>
    </div>

    <button class="bg-blue-500 rounded cursor-pointer py-2 px-4" type="submit">Enviar</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      formData: {
        nombre: '',
        categoria: '',
        descripcion: '',
        archivo: null
      },
      errors: {
        nombre: '',
        categoria: '',
        descripcion: '',
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
        const response = await axios.get("http://127.0.0.1:8001/api/categories");
        if (response.data.success) {
          this.categories = response.data.data;
          console.log(this.categories[0].category)
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

      // Validar nombre
      if (this.formData.nombre.length < 3) {
        this.errors.nombre = 'El nombre debe tener al menos 3 caracteres';
        isValid = false;
      } else {
        this.errors.nombre = '';
      }

      // Validar categoría
      if (!this.formData.categoria) {
        this.errors.categoria = 'Por favor seleccione una categoría';
        isValid = false;
      } else {
        this.errors.categoria = '';
      }

      // Validar descripción
      if (this.formData.descripcion.length < 10) {
        this.errors.descripcion = 'La descripción debe tener al menos 10 caracteres';
        isValid = false;
      } else {
        this.errors.descripcion = '';
      }

      // Validar archivo
      if (!this.formData.archivo) {
        this.errors.archivo = 'Por favor suba un archivo';
        isValid = false;
      } else if (!this.validExtensions.includes(this.formData.archivo.type)) {
        this.errors.archivo = 'Formato de archivo no válido. Use JPG, JPEG, PNG o MP4';
        isValid = false;
      } else {
        this.errors.archivo = '';
      }

      return isValid;
    },
    async submitForm() {
      if (this.validateForm()) {
        const formDataToSend = new FormData();
        formDataToSend.append('nombre', this.formData.nombre);
        formDataToSend.append('categoria_id', this.formData.categoria);
        formDataToSend.append('descripcion', this.formData.descripcion);
        formDataToSend.append('archivo', this.formData.archivo);

        try {
          const response = await axios.post(
            "http://127.0.0.1:8001/api/ads",
            formDataToSend,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
          
          if (response.data.success) {
            alert('Anuncio creado con éxito!');
            // Reset form after successful submission
            this.formData = {
              nombre: '',
              categoria: '',
              descripcion: '',
              archivo: null
            };
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