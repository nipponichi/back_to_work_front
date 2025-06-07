<template>
  <div>
    <div class="flex space-x-4 mt-24">
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" @click="currentTable = 'users'">Usuarios</button>
        <!-- <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="currentTable = 'ads'">Anuncios</button> -->
    </div>

    <div>
      <AdminUserList/>
     <!--  <AdminAdsList v-if="currentTable === 'ads'" /> -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AdminUserList from '../components/AdminUserList.vue'
//import AdminAdsList from '../components/AdminAdsList.vue'
export default {
    components: {
        AdminUserList,
        //AdminAdsList
    },
    data() {
        return {
            user: ''
        }
    },
}
</script>