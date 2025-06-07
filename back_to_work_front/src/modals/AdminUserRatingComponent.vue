<template>
    <DataTable :value="localUser.user_stat" dataKey="id" paginator rows="5" class="text-white">
      <Column field="rating" header="Puntuación">
        <template #body="slotProps">
          <InputText v-model="slotProps.data.rating" />
        </template>
      </Column>
      <Column field="review" header="Comentario">
        <template #body="slotProps">
          <InputText v-model="slotProps.data.review" />
        </template>
      </Column>
      <Column field="created_at" header="Fecha">
        <template #body="slotProps">
          {{ new Date(slotProps.data.created_at).toLocaleDateString() }}
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button 
              icon="pi pi-save" 
              class="p-button-success" 
              @click="saveSingleReview(slotProps.data)" 
              title="Guardar cambios"
            />
            <Button 
              icon="pi pi-trash" 
              class="p-button-danger" 
              @click="deleteReview(slotProps.data.id)" 
              title="Eliminar reseña"
            />
          </div>
        </template>
      </Column>
    </DataTable>
</template>

<script>
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import UserService from '../services/api/user.service'
import toast from '../services/toast'

export default {
  name: 'AdminUserRatingComponent',
  components: { Dialog, DataTable, Column, InputText, Button },
  props: {
    user: Object,
    visible: Boolean
  },
  data() {
    return {
      localUser: { ...this.user }
    }
  },
  watch: {
    user(change) {
      this.localUser = { ...change }
    }
  },
  mounted() {
    console.log(this.user)
  },
  methods: {
    async deleteReview(reviewId) {
      try {
        await UserService.delete('userstats', reviewId)
        this.localUser.user_stat = this.localUser.user_stat.filter(r => r.id !== reviewId)
        toast.success('Reseña eliminada')
      } catch (error) {
        toast.error('Error eliminando la reseña')
      }
    },
    async saveSingleReview(review) {
      try {
        const updatedReview = {
          rating: review.rating,
          review: review.review,
          ad_id: review.ad_id
        }
        const response = await UserService.update('userstats', updatedReview, review.id)
        if (response.data.success) {
          toast.success(response.data.message)
        } else {
          toast.error('No se pudo actualizar la reseña')
        }
      } catch (error) {
        console.error(error)
        toast.error(response.data.message)
      }
    }
  }
}
</script>

