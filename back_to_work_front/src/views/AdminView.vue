<template>
  <div>
    <div class="flex space-x-4 mt-24 ml-12">
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        @click="currentTable = 'users'"
      >
        Usuarios
      </button>
      <button
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        @click="currentTable = 'ads'"
      >
        Anuncios
      </button>
      <button
        class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        @click="currentTable = 'claims'"
      >
        Incidencias
      </button>
    </div>

    <div class="mt-6">
      <AdminUserList v-if="currentTable === 'users'" />
      <AdminAdList v-if="currentTable === 'ads'" />
      <AdminClaimList v-if="currentTable === 'claims'" />
    </div>
  </div>
</template>

<script>
import AdminUserList from '../components/AdminUserList.vue'
import AdminAdList from '../components/AdminAdList.vue'
import AdminClaimList from '../components/AdminClaimList.vue'

export default {
  components: {
    AdminUserList,
    AdminAdList,
    AdminClaimList,
  },
  data() {
    return {
      currentTable: 'users',
    }
  },
}
</script>
