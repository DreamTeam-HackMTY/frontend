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
          <RouterLink to="/" class="p-4 font-bold text-center border-b border-[#2492d1] flex items-center flex-col">
            <img src="/icon.png" alt="" width="80">
            <p class="text-sm">{{ appName }}</p>
          </RouterLink>
  
          <!-- Navigation -->
          <nav class="flex-grow py-4">
            <RouterLink v-for="item in menuItems" activeClass="active" :key="item.name" :to="item.href" class="flex items-center px-6 py-3 text-[#2492d1] border border-[#2492d1] rounded-md mx-2 mb-2 hover:bg-[#2492d1] hover:text-white transition-colors duration-200">
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              {{ item.name }}
            </RouterLink>
          </nav>
  
          <!-- User info -->
          <div class="p-4 border-t border-[#2492d1]">
            <div class="flex items-center">
              <img :src="'/babyoda.png'" alt="" class="w-20 h-20 rounded-full mr-3 border-2 border-[#2492d1]" />
              <div>
                <p class="font-semibold">{{ user.data.username }}</p>
                <p class="text-sm text-gray-600">{{ user.data.roles[0].name }}</p>
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
  const user = JSON.parse(localStorage.getItem('user'))
  const props = defineProps({
    appName: {
      type: String,
      default: 'EpiDemiData'
    },
    menuItems: {
      type: Array,
      default: () => [  
        { name: 'Enfermedades', icon: ChartBarIcon, href: '/enfermedades' },
        { name: 'Usuarios', icon: UsersIcon, href: '/usuarios' },
        { name: 'Configuración', icon: SettingsIcon, href: '/configuracion' },
      ]
    },
    userName: {
      type: String,
      default: 'Maria García'
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

<style scoped>
.active{
  background-color: #2492d1;
  color: white;
}
</style>