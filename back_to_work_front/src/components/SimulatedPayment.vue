<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
    <!-- Importe del pago -->
    <p class="text-lg font-semibold text-center text-gray-900 mb-6">
      El importe del pago a efectuar es de {{ paymentAmount }} euros
    </p>

    <!-- Tabs -->
    <div class="flex space-x-3 mb-6 border-b border-gray-200">
      <button
        @click="activeTab = 'card'"
        :class="[
          'flex items-center px-5 py-2 -mb-px border-b-2 font-medium text-sm transition-colors duration-200',
          activeTab === 'card' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M2 4.5A2.5 2.5 0 014.5 2h11A2.5 2.5 0 0118 4.5V6H2V4.5zM2 7h16v8.5a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 15.5V7z"/>
        </svg>
        Tarjeta
      </button>

      <button
        @click="activeTab = 'paypal'"
        :class="[
          'flex items-center px-5 py-2 -mb-px border-b-2 font-medium text-sm transition-colors duration-200',
          activeTab === 'paypal' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'
        ]"
      >
        <svg class="h-5 w-5 mr-2" viewBox="0 0 36 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M19.5 2H13a2 2 0 00-2 1.7L7.8 27.3A1.5 1.5 0 009.3 29H14l1-6h3.8c5.3 0 9.7-3.5 10.7-8.2.6-3.1-.1-5.3-1.8-6.9-1.6-1.5-4.2-1.9-7.2-1.9H19.5zM15.8 19l1.1-7h2.8c1.8 0 3.1.3 3.9 1 .6.5.8 1.3.6 2.3-.4 2-2.4 3.7-5.1 3.7H15.8z"/>
        </svg>
        PayPal
      </button>
    </div>

    <!-- Card Form -->
    <form v-if="activeTab === 'card'" class="space-y-5" @submit.prevent>
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Número de tarjeta</label>
        <div class="relative">
          <input
            type="text"
            class="peer block w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="1234 5678 9012 3456"
            autocomplete="cc-number"
            inputmode="numeric"
            maxlength="19"
          />
          <div class="absolute inset-y-0 right-3 flex items-center space-x-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" class="h-5" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" class="h-5" alt="Mastercard" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Fecha de expiración</label>
          <input
            type="text"
            class="block w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="MM/AA"
            autocomplete="cc-exp"
            maxlength="5"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">CVC</label>
          <input
            type="text"
            class="block w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="123"
            autocomplete="cc-csc"
            inputmode="numeric"
            maxlength="4"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">País</label>
          <select
            class="block w-full rounded-md border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            autocomplete="country"
          >
            <option>United States</option>
            <option>Spain</option>
            <option>Mexico</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Código postal</label>
          <input
            type="text"
            class="block w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="12345"
            autocomplete="postal-code"
          />
        </div>
      </div>
    </form>

    <!-- PayPal Form -->
    <form v-else class="space-y-5" @submit.prevent>
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Email de PayPal</label>
        <input
          type="email"
          class="block w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="you@example.com"
          autocomplete="email"
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Confirmar email</label>
        <input
          type="email"
          class="block w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="you@example.com"
          autocomplete="email"
        />
      </div>

      <p class="text-sm text-gray-500">
        Serás redirigido a PayPal para completar tu compra de forma segura.
      </p>
    </form>

    <!-- Payment Actions -->
    <div class="mt-8 flex justify-between">
      <button
        @click="$emit('close')"
        type="button"
        class="px-5 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition font-semibold"
      >
        Cancelar
      </button>

      <button
        class="px-5 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
        type="submit"
      >
        Pagar {{ paymentAmount }} €
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  acceptedBid: {
    type: Number,
    required: true
  }
})

const activeTab = ref('card')

const paymentAmount = computed(() => {
  return props.acceptedBid <= 100
    ? '1'
    : (props.acceptedBid * 0.01).toFixed(2)
})
</script>
