<template>
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-8">
          <h2 class="text-2xl font-bold text-[#2492d1] mb-6">Datos de Usuario</h2>
          
          <div class="flex flex-col md:flex-row items-center md:items-start mb-8">
            <div class="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8">
              <img :src="'/babyoda.png'" alt="Foto de perfil" class="w-full h-full object-cover" />
            </div>
            <div class="flex-grow">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                  Nombre
                </label>
                <input 
                  id="name" 
                  v-model="user.data.username" 
                  type="text" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#2492d1]"
                  disabled
                >
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                  Correo Electrónico
                </label>
                <input 
                  id="email" 
                  v-model="user.data.email" 
                  type="email" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#2492d1]"
                  disabled
                >
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="role">
                  Rol
                </label>
                <input 
                  id="role" 
                  v-model="user.data.roles[0].name" 
                  type="text" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#2492d1]"
                  disabled
                >
              </div>
            </div>
          </div>
          
          <div class="flex flex-col md:flex-row justify-between items-center">
            <button 
              
              class=" rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0"
            >
              
            </button>
            <button 
              @click="logout" 
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { logout } from '../services/session'
  const user = JSON.parse(localStorage.getItem('user'))
  
  const updateProfile = () => {
    // Aquí iría la lógica para actualizar el perfil del usuario
    console.log('Actualizando perfil:', user.value)
    alert('Perfil actualizado con éxito')
  }
  
  </script>