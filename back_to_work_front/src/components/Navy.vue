<template>
    <nav class="bg-gray-800 p-4">
      <ul class="flex space-x-4">
        <li>
          <RouterLink to="/" class="text-white">
            🏠 Inicio
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="text-white">
            ℹ️ Acerca de
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/services" class="text-white">
            🛠️ Servicios
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" class="text-white">
            📞 Contacto
          </RouterLink>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style>
  /* Puedes agregar estilos adicionales aquí si lo deseas */
  </style>
  