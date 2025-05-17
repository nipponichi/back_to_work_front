<template>
    <div class="payment-container">
      <h2 class="text-xl font-semibold mb-4">Simulación de Pago</h2>
  
      <div class="mb-4">
        <label class="block mb-1 font-medium">Número de tarjeta:</label>
        <input
          v-model="cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          class="w-full px-3 py-2 border border-gray-300 rounded"
          maxlength="19"
        />
      </div>
  
      <div class="mb-4">
        <label class="block mb-1 font-medium">Monto a pagar (€):</label>
        <input
          v-model="amount"
          type="number"
          min="0"
          step="0.01"
          class="w-full px-3 py-2 border border-gray-300 rounded"
          readonly
        />
      </div>
  
      <button
        @click="simulatePayment"
        :disabled="loading"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Procesando...' : 'Simular Pago' }}
      </button>
  
      <p v-if="successMessage" class="mt-4 text-green-600 font-semibold">{{ successMessage }}</p>
      <p v-if="errorMessage" class="mt-4 text-red-600 font-semibold">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps } from 'vue'
  
  const props = defineProps({
    bid: {
      type: Object,
      required: true,
    }
  })
  
  const cardNumber = ref('')
  const amount = ref(null)
  const successMessage = ref('')
  const errorMessage = ref('')
  const loading = ref(false)
  
  // Cargar el monto desde el bid recibido
  watch(
    () => props.bid,
    (newBid) => {
      if (newBid?.bid) {
        amount.value = newBid.bid
      }
    },
    { immediate: true }
  )
  
  const validTestCards = ['4242424242424242', '4111111111111111']
  
  const simulatePayment = () => {
    successMessage.value = ''
    errorMessage.value = ''
    loading.value = true
  
    setTimeout(() => {
      loading.value = false
  
      const cardSanitized = cardNumber.value.replace(/\s+/g, '')
  
      if (!cardSanitized || !amount.value) {
        errorMessage.value = '❌ Debes ingresar una tarjeta válida y un monto.'
        return
      }
  
      if (!validTestCards.includes(cardSanitized)) {
        errorMessage.value =
          '❌ La tarjeta ingresada no es válida en esta simulación.'
        return
      }
  
      successMessage.value = `✅ ¡Pago simulado exitosamente por ${amount.value.toFixed(2)} €!`
      cardNumber.value = ''
      amount.value = null
    }, 1500)
  }
  </script>
  
  <style scoped>
  .payment-container {
    max-width: 400px;
    margin: 0 auto;
  }
  </style>
  