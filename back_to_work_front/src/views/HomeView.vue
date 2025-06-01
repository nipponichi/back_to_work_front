<template>
  <div class="relative">
    <div class="fixed inset-0 bg-gradient-to-br from-[#F4EDE4] to-[#E8DCCB] z-0">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
      <div class="absolute inset-0 bg-white/60"></div>
    </div>

    <main class="relative z-10">
      <section class="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto text-center">
          <div class="mb-8 inline-flex bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full border border-[#D6C9B3]">
            <span class="text-[#7A4E2E] font-medium">La solución profesional a tu medida</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-[#7A4E2E] leading-tight mb-6">
            Encuentra al <span class="text-[#C56E33]">profesional perfecto</span><br>
            para tu próximo proyecto
          </h1>

          <p class="text-xl text-[#A38D7C] max-w-3xl mx-auto mb-10">
            Conectamos clientes con los mejores profesionales en cientos de categorías de servicios.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" class="px-8 py-4 bg-[#C56E33] text-white font-bold rounded-lg hover:bg-[#A35429] transition-all duration-300 transform hover:scale-105 shadow-lg">
              Buscar profesionales
            </a>
            <a href="#" class="px-8 py-4 bg-transparent text-[#C56E33] font-bold rounded-lg border-2 border-[#C56E33] hover:bg-[#F4EDE4] transition-all duration-300">
              Soy profesional
            </a>
          </div>

          <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div class="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#D6C9B3] shadow">
              <div class="text-3xl font-bold text-[#7A4E2E] mb-1">5,000+</div>
              <div class="text-[#A38D7C] text-sm">Expertos disponibles</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#D6C9B3] shadow">
              <div class="text-3xl font-bold text-[#7A4E2E] mb-1">50+</div>
              <div class="text-[#A38D7C] text-sm">Categorías</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#D6C9B3] shadow">
              <div class="text-3xl font-bold text-[#7A4E2E] mb-1">4.9★</div>
              <div class="text-[#A38D7C] text-sm">Valoración media</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#D6C9B3] shadow">
              <div class="text-3xl font-bold text-[#7A4E2E] mb-1">100%</div>
              <div class="text-[#A38D7C] text-sm">Pagos seguros</div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white py-28 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-center text-black mb-16">
            ¿Cómo funciona <span class="text-gray-700 font-semibold">WeAgree</span>?
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div
              v-for="(step, index) in steps"
              :key="index"
              ref="cards"
              class="card group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 ease-out transform opacity-0 translate-y-10 hover:-translate-y-2 hover:shadow-2xl"
              :style="{ transitionDelay: (index * 200) + 'ms' }"
            >
              <div class="relative z-10 p-8 h-full flex flex-col">
                <div class="w-16 h-16 mb-6 rounded-xl bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center">
                  <span v-html="step.icon" class="w-8 h-8 text-black"></span>
                </div>
                <h3 class="text-xl font-semibold text-black mb-3">{{ step.title }}</h3>
                <p class="text-gray-600 text-base flex-grow">{{ step.description }}</p>
                <div class="mt-6 pt-4 border-t border-gray-200 group-hover:border-gray-300 transition-colors duration-300">
                  <span class="text-black font-medium text-sm tracking-wide uppercase">{{ step.cta }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative py-20 px-4 sm:px-6 lg:px-8">
        <div class="absolute inset-0 bg-[#F3E8D5]/50"></div>
        <div class="relative max-w-7xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-[#7A4E2E] mb-6">
            Nuestros usuarios opinan
          </h2>
          <p class="text-lg text-[#A97A50] mb-12">
            Descubre por qué cientos de clientes confían en WeAgree
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="(testimonial, idx) in testimonialsList"
              :key="idx"
              ref="testimonials"
              class="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-[#D6C9B3] transform hover:-translate-y-2 transition duration-300 opacity-0 rotate-y-10 translate-x-5"
            >
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-[#EED4B9] rounded-full flex items-center justify-center text-[#C56E33] font-bold text-lg">
                  {{ testimonial.initial }}
                </div>
                <div class="ml-4 text-left">
                  <h4 class="font-semibold text-[#7A4E2E]">{{ testimonial.name }}</h4>
                  <div class="flex text-yellow-400 text-sm">★★★★★</div>
                </div>
              </div>
              <p class="italic text-[#7A4E2E]">
                "{{ testimonial.text }}"
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "WeAgreeSteps",
  data() {
    return {
      steps: [
        {
          title: "Busca lo que necesitas",
          description: "Encuentra servicios como limpieza, clases o estética sin complicaciones.",
          cta: "Explorar",
          icon: `
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>`,
        },
        {
          title: "Elige a tu profesional",
          description: "Compara opciones, lee reseñas y escoge con confianza.",
          cta: "Ver opciones",
          icon: `
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>`,
        },
        {
          title: "Contrata con confianza",
          description: "Reserva en un clic. Tu dinero protegido hasta completar el servicio.",
          cta: "Empezar",
          icon: `
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M5 13l4 4L19 7" />
            </svg>`,
        },
      ],
      testimonialsList: [
        { initial: "A", name: "Ana M.", text: "Encontré a la mejor profesora para mi hijo en solo un día. ¡Increíble servicio!" },
        { initial: "J", name: "Juan P.", text: "Como electricista, he duplicado mis clientes desde que me uní a WeAgree." },
        { initial: "M", name: "María L.", text: "La limpieza de mi casa es más fácil con los profesionales de esta plataforma." },
      ],
    };
  },
  mounted() {
    const cards = this.$refs.cards;
    const testimonials = this.$refs.testimonials;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (Array.isArray(cards)) {
      cards.forEach((card) => observer.observe(card));
    } else if (cards) {
      observer.observe(cards);
    }

    const testimonialObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("testimonial-animate-in");
          testimonialObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (Array.isArray(testimonials)) {
      testimonials.forEach((testimonial) => testimonialObserver.observe(testimonial));
    } else if (testimonials) {
      testimonialObserver.observe(testimonials);
    }
  },
};
</script>

<style scoped>
.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.testimonial-animate-in {
  opacity: 1 !important;
  transform: rotateY(0deg) translateX(0) !important;
}

[ref="testimonials"] {
  opacity: 0;
  transform: rotateY(10deg) translateX(20px);
  transition: all 0.8s ease-out;
}
</style>
