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
          <option value="arte">Arte</option>
          <option value="tecnologia">Tecnología</option>
          <option value="educacion">Educación</option>
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
  
      <button type="submit">Enviar</button>
    </form>
  </template>
  
  <script>
   import axios from "axios";
  export default {
    data() {
      return {
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
    async mounted(){
     //await fetchAdsCategories();
     await this.fetchAdsCategories();

    },
    methods: {
      async fetchAdsCategories(){
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/categories");
        
          console.log(response.data.data);
          /*
          if (response.data.success) {
              categories.value = response.data.data; 
              console.log(ads.value);
          }
          loading.value = false;
          */
      } catch (error) {
          console.error("Error fetching categories:", error);
          //loading.value = false;
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
      submitForm() {
        if (this.validateForm()) {
          // Crear FormData para enviar archivos
          const formData = new FormData();
          formData.append('nombre', this.formData.nombre);
          formData.append('categoria', this.formData.categoria);
          formData.append('descripcion', this.formData.descripcion);
          formData.append('archivo', this.formData.archivo);
  
          // Aquí iría la llamada a tu API
          console.log('Datos a enviar:', Object.fromEntries(formData));
          alert('Formulario válido, listo para enviar!');
          
          // Ejemplo con axios:
          /*
          axios.post('/api/submit', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            console.log('Respuesta:', response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
          */
        }
      }
    }
  }
  </script>