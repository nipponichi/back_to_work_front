<template>
  <div class="relative mt-4 w-full min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://appwebel.com/assets/es/img/backgrounds/landing/landing.webp')] bg-cover bg-center opacity-40 blur-sm z-0"></div>
    <div class="absolute inset-0 bg-blue-900/60 z-0"></div>
    <main class="relative z-10 max-w-[1600px] mx-auto pt-10 pb-16 px-4 sm:px-6 lg:px-8 text-white">
      <div class="relative mb-10 text-center">
        <h2 class="text-3xl font-bold text-white">Tarifas y Comisiones</h2>
        <p class="text-blue-200 max-w-2xl mx-auto mt-4">
          Conoce cómo WeAgree gestiona las comisiones para garantizar transparencia y profesionalidad en cada proyecto.
        </p>
        <div class="h-1 w-24 bg-blue-800 rounded-full mx-auto mt-4"></div>
      </div>
      <section class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6 mb-12">
        <h3 class="text-xl font-semibold text-blue-200 mb-4">Comisiones Importe fijo</h3>
        <table class="w-full text-sm text-white text-left border border-white/20">
          <thead class="bg-blue-900/70">
            <tr>
              <th class="px-4 py-2">Rango</th>
              <th class="px-4 py-2">Comisión fija</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white/5">
              <td class="px-4 py-2">0€ - 49,99€</td>
              <td class="px-4 py-2">5€</td>
            </tr>
            <tr class="bg-white/10">
              <td class="px-4 py-2">50€ - 119,99€</td>
              <td class="px-4 py-2">10€</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6 mb-12">
        <h3 class="text-xl font-semibold text-blue-200 mb-4">Comisiones Importe porcentual</h3>
        <table class="w-full text-sm text-white text-left border border-white/20">
          <thead class="bg-blue-900/70">
            <tr>
              <th class="px-4 py-2">Rango</th>
              <th class="px-4 py-2">Porcentaje</th>
              <th class="px-4 py-2">Comisión mínima</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white/5">
              <td class="px-4 py-2">120€ - 499,99€</td>
              <td class="px-4 py-2">10%</td>
              <td class="px-4 py-2">12€</td>
            </tr>
            <tr class="bg-white/10">
              <td class="px-4 py-2">500€ - 999,99€</td>
              <td class="px-4 py-2">7%</td>
              <td class="px-4 py-2">50€</td>
            </tr>
            <tr class="bg-white/5">
              <td class="px-4 py-2">1000€ - 4999,99€</td>
              <td class="px-4 py-2">5%</td>
              <td class="px-4 py-2">70€</td>
            </tr>
            <tr class="bg-white/10">
              <td class="px-4 py-2">5000€ o más</td>
              <td class="px-4 py-2">3%</td>
              <td class="px-4 py-2">150€</td>
            </tr>
          </tbody>
        </table>
      </section>
      <div class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
        <h3 class="text-xl font-semibold text-blue-200 mb-4">Ventajas de usar WeAgree</h3>
        <ul class="list-disc list-inside text-blue-100 space-y-2">
          <li>Sin cuotas mensuales. Solo pagas cuando ganas un trabajo.</li>
          <li>Acceso a clientes con necesidades concretas.</li>
          <li>Visibilidad a través de valoraciones y reputación.</li>
        </ul>
      </div>
    </main>
  </div>
</template>
