<template>
  <div class="relative">
    <div class="fixed inset-0 bg-gradient-to-br from-[#FFF2E0] to-[#F4C7A8] z-0">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
      <div class="absolute inset-0 bg-white/40"></div>
    </div>

    <main class="relative z-10">
      <section class="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto text-center">
          <div class="mb-8 inline-flex bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-[#E0A070]">
            <span class="text-[#6A351E] font-medium">La solución profesional a tu medida</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-[#6A351E] leading-tight mb-6">
            Encuentra al <span class="text-[#E07B23]">profesional perfecto</span><br>
            para tu próximo proyecto
          </h1>

          <p class="text-xl text-[#A85B2D] max-w-3xl mx-auto mb-10">
            Conectamos clientes con los mejores profesionales en cientos de categorías de servicios.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" class="px-8 py-4 bg-[#E07B23] text-white font-bold rounded-lg hover:bg-[#B85F1B] transition-all duration-300 transform hover:scale-105 shadow-lg">
              Buscar profesionales
            </a>
            <a href="#" class="px-8 py-4 bg-transparent text-[#E07B23] font-bold rounded-lg border-2 border-[#E07B23] hover:bg-[#FFF2E0] transition-all duration-300">
              Soy profesional
            </a>
          </div>

          <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div class="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-[#E0A070] shadow">
              <div class="text-3xl font-bold text-[#6A351E] mb-1">5,000+</div>
              <div class="text-[#A85B2D] text-sm">Expertos disponibles</div>
            </div>
            <div class="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-[#E0A070] shadow">
              <div class="text-3xl font-bold text-[#6A351E] mb-1">50+</div>
              <div class="text-[#A85B2D] text-sm">Categorías</div>
            </div>
            <div class="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-[#E0A070] shadow">
              <div class="text-3xl font-bold text-[#6A351E] mb-1">4.9★</div>
              <div class="text-[#A85B2D] text-sm">Valoración media</div>
            </div>
            <div class="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-[#E0A070] shadow">
              <div class="text-3xl font-bold text-[#6A351E] mb-1">100%</div>
              <div class="text-[#A85B2D] text-sm">Pagos seguros</div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white py-28 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-center text-[#6A351E] mb-16">
            ¿Cómo funciona <span class="text-[#E07B23] font-semibold">WeAgree</span>?
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div v-for="(step, index) in steps" :key="index" ref="cards" class="card group relative bg-[#FFF8F0] rounded-2xl shadow-lg overflow-hidden transition-all duration-700 ease-out transform opacity-0 translate-y-10 hover:-translate-y-2 hover:shadow-2xl" :style="{ transitionDelay: (index * 200) + 'ms' }">
              <div class="relative z-10 p-8 h-full flex flex-col">
                <div class="w-16 h-16 mb-6 rounded-xl bg-[#FFF2E0] group-hover:bg-[#F4C7A8] transition-colors duration-300 flex items-center justify-center">
                  <span v-html="step.icon" class="w-8 h-8 text-[#6A351E]"></span>
                </div>
                <h3 class="text-xl font-semibold text-[#6A351E] mb-3">{{ step.title }}</h3>
                <p class="text-[#A85B2D] text-base flex-grow">{{ step.description }}</p>
                <div class="mt-6 pt-4 border-t border-[#E0A070] group-hover:border-[#E07B23] transition-colors duration-300">
                  <span class="text-[#6A351E] font-medium text-sm tracking-wide uppercase">{{ step.cta }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative py-28 px-4 sm:px-6 lg:px-8">
        <div class="absolute inset-0 bg-[#6A351E]/90 backdrop-blur-sm z-0"></div>
        <div class="relative z-10 max-w-7xl mx-auto">
          <div class="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div class="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Eres profesional? <br>
                <span class="text-[#FFF2E0]">Únete a nuestra plataforma</span>
              </h2>
              <p class="text-lg text-[#FFF2E0] mb-8">
                Conecta con clientes que necesitan tus servicios y haz crecer tu negocio.
              </p>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-6 w-6 text-[#F4C185]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-3 text-lg text-white">Acceso a miles de proyectos mensuales</span>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-6 w-6 text-[#F4C185]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-3 text-lg text-white">Pagos seguros y puntuales</span>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-6 w-6 text-[#F4C185]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-3 text-lg text-white">Soporte profesional dedicado</span>
                </li>
              </ul>
              <button class="mt-8 bg-white text-[#6A351E] px-8 py-3 rounded-lg font-bold hover:bg-[#FFF2E0] transition-all duration-300 shadow-lg hover:scale-105 transform">
                Regístrate como profesional
              </button>
            </div>
            <div class="mt-12 lg:mt-0">
              <div class="relative">
                <div class="absolute -inset-2 bg-[#E07B23]/30 rounded-2xl blur-md"></div>
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Profesional trabajando" class="relative rounded-2xl shadow-2xl w-full h-auto border-2 border-white/20">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative py-20 px-4 sm:px-6 lg:px-8">
        <div class="absolute inset-0 bg-[#F3E8D5]/50"></div>
        <div class="relative max-w-7xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-[#6A351E] mb-6">
            Nuestros usuarios opinan
          </h2>
          <p class="text-lg text-[#A85B2D] mb-12">
            Descubre por qué cientos de clientes confían en WeAgree
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="(testimonial, idx) in testimonialsList" :key="idx" ref="testimonials" class="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-[#E0A070] transform hover:-translate-y-2 transition duration-300 opacity-0 rotate-y-10 translate-x-5">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-[#F4C185] rounded-full flex items-center justify-center text-[#E07B23] font-bold text-lg">
                  {{ testimonial.initial }}
                </div>
                <div class="ml-4 text-left">
                  <h4 class="font-semibold text-[#6A351E]">{{ testimonial.name }}</h4>
                  <div class="flex text-yellow-400 text-sm">★★★★★</div>
                </div>
              </div>
              <p class="italic text-[#6A351E]">
                "{{ testimonial.text }}"
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
<footer class="relative bg-[#4B3621] text-[#F4EDE4] pt-16 pb-8">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <div>
        <div class="flex items-center mb-6">
          <span class="text-2xl font-bold bg-gradient-to-r from-[#C56E33] to-[#7A4E2E] bg-clip-text text-transparent">WeAgree</span>
        </div>
        <p class="text-[#E6D8C3] mb-6">
          Conectamos profesionales con clientes que necesitan sus servicios. Simple, seguro y eficiente.
        </p>
        <div class="flex space-x-4">
            <a href="#" class="text-[#E6D8C3] hover:text-[#E07B23] transition"><i class="pi pi-facebook"></i></a>
            <a href="#" class="text-[#E6D8C3] hover:text-[#E07B23] transition"><i class="pi pi-instagram"></i></a>
            <a href="#" class="text-[#E6D8C3] hover:text-[#E07B23] transition"><i class="pi pi-linkedin"></i></a>
        </div>
      </div>

<div>
  <h3 class="text-lg font-semibold text-[#F4EDE4] mb-6">Enlaces rápidos</h3>
  <ul class="space-y-3">
    <li><i class="pi pi-home mr-2"></i><a href="#" class="text-[#D8C4A3] hover:text-[#E07B23] transition">Inicio</a></li>
    <li><i class="pi pi-briefcase mr-2"></i><a href="#" class="text-[#D8C4A3] hover:text-[#E07B23] transition">Servicios</a></li>
    <li><i class="pi pi-users mr-2"></i><a href="#" class="text-[#D8C4A3] hover:text-[#E07B23] transition">Profesionales</a></li>
    <li><i class="pi pi-comments mr-2"></i><a href="#" class="text-[#D8C4A3] hover:text-[#E07B23] transition">Testimonios</a></li>
  </ul>
</div>

<div>
  <h3 class="text-lg font-semibold text-[#F4EDE4] mb-6">Servicios populares</h3>
  <ul class="space-y-3">
    <li><a href="#" class="text-[#D8C4A3] hover:text-[#C56E33] transition-colors">Limpieza del hogar</a></li>
    <li><a href="#" class="text-[#D8C4A3] hover:text-[#C56E33] transition-colors">Clases particulares</a></li>
    <li><a href="#" class="text-[#D8C4A3] hover:text-[#C56E33] transition-colors">Reparaciones</a></li>
    <li><a href="#" class="text-[#D8C4A3] hover:text-[#C56E33] transition-colors">Cuidado de niños</a></li>
    <li><a href="#" class="text-[#D8C4A3] hover:text-[#C56E33] transition-colors">Servicios de belleza</a></li>
    <li><a href="#" class="text-[#D8C4A3] hover:text-[#C56E33] transition-colors">Mudanzas</a></li>
  </ul>
</div>

<div>
  <h3 class="text-lg font-semibold text-[#F4EDE4] mb-6">Contacto</h3>
  <ul class="space-y-3">
    <li><i class="text-[#D8C4A3] pi pi-phone mr-2"></i>Tel: +34 91 597 65 88</li>
    <li><i class="text-[#D8C4A3] pi pi-envelope mr-2"></i>Email: info@weagree.com</li>
    <li><i class="text-[#D8C4A3] pi pi-map-marker mr-2"></i>Dirección: Calle Reyes Católicos, 123, Madrid</li>
  </ul>
</div>

    </div>

    <div class="border-t border-[#3A2B1A] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p class="text-[#D8C4A3] text-sm mb-4 md:mb-0">
        © 2025 WeAgree. Todos los derechos reservados.
      </p>
      <div class="flex space-x-6">
        <a href="#" class="text-[#D8C4A3] hover:text-[#C56E33] text-sm transition-colors">Términos de servicio</a>
        <a href="#" class="text-[#D8C4A3] hover:text-[#C56E33] text-sm transition-colors">Política de privacidad</a>
        <a href="#" class="text-[#D8C4A3] hover:text-[#C56E33] text-sm transition-colors">Cookies</a>
        <a href="/contact" class="text-[#D8C4A3] hover:text-[#C56E33] text-sm transition-colors">Contacto</a>
      </div>
    </div>
  </div>
</footer>

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
