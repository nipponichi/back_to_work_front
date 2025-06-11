<template>
  <div>
    <div id="card-element" class="border border-gray-300 rounded-md p-3"></div>
    <button @click="confirmPayment">Pagar</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe('pk_test_51RXPDKQSwku8ZQDd51UxYJex7PuSdt8Yvx0RkmJ9rERhvrFUyY8105XdTFB1bvrD3EtxN9Kp6eJInDQIE5oUt6Kv00GQioJ1zG')     

const clientSecret = ref(null)
const stripe = ref(null)
const elements = ref(null)
const cardElement = ref(null)

onMounted(async () => {
  stripe.value = await stripePromise
  elements.value = stripe.value.elements()
  cardElement.value = elements.value.create('card')
  cardElement.value.mount('#card-element')

  // Obtener el client_secret desde tu backend
  const { data } = await axios.post('http://localhost:8000/api/create-payment-intent', {
    amount: 5000 // céntimos
  })
  clientSecret.value = data.clientSecret
})

const confirmPayment = async () => {
  const { error, paymentIntent } = await stripe.value.confirmCardPayment(clientSecret.value, {
    payment_method: {
      card: cardElement.value
    }
  })

  if (error) {
    console.error('❌ Error al confirmar el pago:', error.message)
  } else if (paymentIntent.status === 'succeeded') {
    console.log('✅ Pago completado con éxito:', paymentIntent)
    // Aquí puedes emitir evento, cerrar modal, etc.
  }
}
</script>