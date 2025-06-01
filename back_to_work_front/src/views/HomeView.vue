<template>
 <div class="relative">
    <div class="fixed inset-0 bg-gradient-to-br from-blue-950 to-blue-800 z-0">
      <div class="absolute inset-0 bg-[url('https://appwebel.com/assets/es/img/backgrounds/landing/landing.webp')] bg-cover bg-center opacity-20"></div>
      <div class="absolute inset-0 bg-blue-950/40"></div>
    </div>

    <main class="relative z-10">
      <section class="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto text-center">
          <div class="mb-8 inline-flex bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <span class="text-white font-medium">La solución profesional a tu medida</span>
          </div>
          
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Encuentra al <span class="text-blue-300">profesional perfecto</span><br>
            para tu próximo proyecto
          </h1>
          
          <p class="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Conectamos clientes con los mejores profesionales en cientos de categorías de servicios.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" class="px-8 py-4 bg-white text-blue-800 font-bold rounded-lg hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Buscar profesionales
            </a>
            <a href="#" class="px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white/10 transition-all duration-300">
              Soy profesional
            </a>
          </div>
          
          <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div class="text-3xl font-bold text-white mb-1">5,000+</div>
              <div class="text-blue-200 text-sm">Expertos disponibles</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div class="text-3xl font-bold text-white mb-1">50+</div>
              <div class="text-blue-200 text-sm">Categorías</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div class="text-3xl font-bold text-white mb-1">4.9★</div>
              <div class="text-blue-200 text-sm">Valoración media</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div class="text-3xl font-bold text-white mb-1">100%</div>
              <div class="text-blue-200 text-sm">Pagos seguros</div>
            </div>
          </div>
        </div>

        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      <section class="bg-gray-50 py-28 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            ¿Cómo funciona <span class="text-blue-600">WeAgree</span>?
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div class="group relative bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-80"></div>
              <div class="relative z-10 p-8 h-full flex flex-col">
                <div class="w-20 h-20 mb-6 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 flex items-center justify-center">
                  <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Busca lo que necesitas</h3>
                <p class="text-gray-600 text-lg flex-grow">
                  Tenemos casi de todo: limpieza, clases particulares, estética...
                </p>
                <div class="mt-6 pt-4 border-t border-gray-100 group-hover:border-blue-200 transition-colors duration-300">
                  <span class="text-blue-600 font-medium">Explorar servicios →</span>
                </div>
              </div>
            </div>

            <div class="group relative bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-80"></div>
              <div class="relative z-10 p-8 h-full flex flex-col">
                <div class="w-20 h-20 mb-6 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 flex items-center justify-center">
                  <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Escoge a tu profesional ideal</h3>
                <p class="text-gray-600 text-lg flex-grow">
                  Compara entre cientos de profesionales disponibles y elige al que más te guste.
                </p>
                <div class="mt-6 pt-4 border-t border-gray-100 group-hover:border-blue-200 transition-colors duration-300">
                  <span class="text-blue-600 font-medium">Ver profesionales →</span>
                </div>
              </div>
            </div>

            <div class="group relative bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-80"></div>
              <div class="relative z-10 p-8 h-full flex flex-col">
                <div class="w-20 h-20 mb-6 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 flex items-center justify-center">
                  <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Contrátalo en 1 click</h3>
                <p class="text-gray-600 text-lg flex-grow">
                  Reserva tu servicio y quédate tranquilo con nuestra garantía: tu dinero protegido hasta el final.
                </p>
                <div class="mt-6 pt-4 border-t border-gray-100 group-hover:border-blue-200 transition-colors duration-300">
                  <span class="text-blue-600 font-medium">Cómo funciona →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative py-28 px-4 sm:px-6 lg:px-8">
        <div class="absolute inset-0 bg-blue-900/70 backdrop-blur-sm z-0"></div>
        
        <div class="relative z-10 max-w-7xl mx-auto">
          <div class="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Eres profesional? <br>
                <span class="text-blue-200">Únete a nuestra plataforma</span>
              </h2>
              <p class="text-lg text-blue-100 mb-8">
                Conecta con clientes que necesitan tus servicios y haz crecer tu negocio.
              </p>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-6 w-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-3 text-lg text-white">Acceso a miles de proyectos mensuales</span>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-6 w-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-3 text-lg text-white">Pagos seguros y puntuales</span>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="h-6 w-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-3 text-lg text-white">Soporte profesional dedicado</span>
                </li>
              </ul>
              <button class="mt-8 bg-white text-blue-800 px-8 py-3 rounded-lg font-bold hover:bg-blue-100 transition-all duration-300 shadow-lg hover:scale-105 transform">
                Regístrate como profesional
              </button>
            </div>
            
            <div class="mt-12 lg:mt-0">
              <div class="relative">
                <div class="absolute -inset-2 bg-blue-400/30 rounded-2xl blur-md"></div>
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Profesional trabajando" 
                    class="relative rounded-2xl shadow-2xl w-full h-auto border-2 border-white/20">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-gray-200 py-20">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-800">Nuestros usuarios opinan</h2>
          <p class="text-lg text-gray-600 mt-4">
            Descubre por qué miles de personas confían en WeAgree
          </p>
          
          <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

            <div class="bg-white p-6 rounded-xl shadow-lg">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">A</div>
                <div class="ml-4">
                  <h4 class="font-bold">Ana M.</h4>
                  <div class="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "Encontré a la mejor profesora de matemáticas para mi hijo en solo un día. ¡Increíble servicio!"
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">J</div>
                <div class="ml-4">
                  <h4 class="font-bold">Juan P.</h4>
                  <div class="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "Como electricista, he duplicado mis clientes desde que me uní a WeAgree."
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">M</div>
                <div class="ml-4">
                  <h4 class="font-bold">María L.</h4>
                  <div class="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "La limpieza de mi casa ahora es mucho más fácil con los profesionales de esta plataforma."
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdverFilters />
    </main>
    <footer class="relative bg-gray-900 text-white pt-16 pb-8">

      <div class="absolute top-0 left-0 right-0 h-12 overflow-hidden transform -translate-y-full">
        <svg class="absolute bottom-0 w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="fill-current text-gray-900"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="fill-current text-gray-900"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="fill-current text-gray-900"></path>
        </svg>
      </div>

      <div class="container mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <div>
            <div class="flex items-center mb-6">
              <span class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">WeAgree</span>
            </div>
            <p class="text-gray-400 mb-6">
              Conectamos profesionales con clientes que necesitan sus servicios. Simple, seguro y eficiente.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">
                <span class="sr-only">Instagram</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-white mb-6">Enlaces rápidos</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Inicio</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Servicios</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Profesionales</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Cómo funciona</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Precios</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Testimonios</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-white mb-6">Servicios populares</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Limpieza del hogar</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Clases particulares</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Reparaciones</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Cuidado de niños</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Servicios de belleza</a></li>
              <li><a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Mudanzas</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-white mb-6">Contacto</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <svg class="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span class="text-gray-400">+34 91 597 65 88</span>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span class="text-gray-400">info@weagree.com</span>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="text-gray-400">Calle Reyes Católicos, 123<br>28001 Madrid, España</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 WeAgree. Todos los derechos reservados.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-500 hover:text-blue-400 text-sm transition-colors">Términos de servicio</a>
            <a href="#" class="text-gray-500 hover:text-blue-400 text-sm transition-colors">Política de privacidad</a>
            <a href="#" class="text-gray-500 hover:text-blue-400 text-sm transition-colors">Cookies</a>
            <a href="/contact" class="text-gray-500 hover:text-blue-400 text-sm transition-colors">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>


   
