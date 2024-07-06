<template>
  <div class="relative h-screen overflow-hidden">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-gray-800 flex flex-col transition-all duration-300 fixed h-full z-10',
        isSidebarOpen ? 'w-64' : 'w-16',
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Cabecera del Sidebar -->
        <div class="p-3 bg-gray-900 flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Perfil"
            class="w-10 h-10 rounded-full"
            :class="{ 'mr-3': isSidebarOpen }"
          />
          <h1 class="text-sm font-bold text-white" v-if="isSidebarOpen">
            Mi App
          </h1>
        </div>
        <nav class="flex-grow my-0">
          <ul class="space-y-2 px-2">
            <li>
              <RouterLink
                to="/"
                class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-gray-300 hover:text-white no-underline"
              >
                <i
                  class="fas fa-home w-6 h-6"
                  :class="{ 'mr-3': isSidebarOpen }"
                ></i>
                <span class="text-lg" v-if="isSidebarOpen">Inicio</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/home"
                class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-gray-300 hover:text-white no-underline"
              >
                <i
                  class="fas fa-cog w-6 h-6"
                  :class="{ 'mr-3': isSidebarOpen }"
                ></i>
                <span class="text-lg" v-if="isSidebarOpen">Home</span>
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Footer del Sidebar -->
        <div class="p-2 bg-gray-900 mt-auto">
          <div
            class="flex items-center mb-0"
            :class="{ 'justify-center': !isSidebarOpen }"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              class="w-10 h-10 rounded-full"
              :class="{ 'mr-3': isSidebarOpen }"
            />
            <div v-if="isSidebarOpen">
              <p class="font-semibold text-white">Juan Josue</p>
              <p class="text-sm text-gray-400">Administrador</p>
            </div>
          </div>
          <button
            v-if="isSidebarOpen"
            class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mt-2"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <!-- Botón para mostrar/ocultar sidebar -->
      <button
        @click="toggleSidebar"
        class="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full focus:outline-none"
      >
        <svg
          :class="{ 'rotate-180': !isSidebarOpen }"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </aside>

    <!-- Main Content -->
    <main class="overflow-y-auto p-2 h-full ml-16">
      <slot />
    </main>

    <!--Sombra-->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-5"
      @click="toggleSidebar"
    ></div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
      crossorigin: "anonymous",
      referrerpolicy: "no-referrer",
    },
  ],
});
</script>