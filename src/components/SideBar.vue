<template>
    <div>
      <!-- Toggle button for mobile -->
    <button @click="toggleMenu" class="lg:hidden fixed top-4 left-4 z-20 bg-[#2492d1] text-white p-2 rounded-md">
      <MenuIcon v-if="!isOpen" />
      <XIcon v-else />
    </button>
      <!-- Sidebar -->
      <div :class="[
        'fixed left-0 top-0 bottom-0 z-10 w-64 bg-white text-[#2492d1] transition-transform duration-300 ease-in-out transform shadow-lg flex flex-col',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]">
        <div class="flex-grow flex flex-col">
          <!-- Logo -->
          <div class="p-4 text-2xl font-bold text-center border-b border-[#2492d1]">
            {{ appName }}
          </div>
  
          <!-- Navigation -->
          <nav class="flex-grow py-4">
            <a v-for="item in menuItems" :key="item.name" :href="item.href" class="flex items-center px-6 py-3 text-[#2492d1] border border-[#2492d1] rounded-md mx-2 mb-2 hover:bg-[#2492d1] hover:text-white transition-colors duration-200">
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              {{ item.name }}
            </a>
          </nav>
  
          <!-- User info -->
          <div class="p-4 border-t border-[#2492d1]">
            <div class="flex items-center">
              <img :src="'/babyoda.png'" :alt="userName" class="w-20 h-20 rounded-full mr-3 border-2 border-[#2492d1]" />
              <div>
                <p class="font-semibold">{{ userName }}</p>
                <p class="text-sm text-gray-600">{{ userRole }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { HomeIcon, ChartBarIcon, FileTextIcon, UsersIcon, SettingsIcon, MenuIcon, XIcon } from 'lucide-vue-next'
  // Añadimos el nombre del componente
  const __name = 'SideBar'
  const props = defineProps({
    appName: {
      type: String,
      default: 'EpiDemidata'
    },
    menuItems: {
      type: Array,
      default: () => [
        { name: 'Enfermedaes', icon: HomeIcon, href: '/' },
        { name: 'Enfermedades', icon: ChartBarIcon, href: '/estadisticas' },
        { name: 'Reportes', icon: FileTextIcon, href: '/reportes' },
        { name: 'Usuarios', icon: UsersIcon, href: '/usuarios' },
        { name: 'Configuración', icon: SettingsIcon, href: '/configuracion' },
      ]
    },
    userName: {
      type: String,
      default: 'John Doe'
    },
    userRole: {
      type: String,
      default: 'Invitado'
    }
  })
  
  const isOpen = ref(false)
  
  const toggleMenu = () => {
    isOpen.value = !isOpen.value
  }


  </script>