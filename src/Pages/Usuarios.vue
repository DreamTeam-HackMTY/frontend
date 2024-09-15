<template>
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-[#2492d1]">Tabla de Usuarios</h2>
        <button
          @click="openAddUserModal"
          class="bg-[#2492d1] hover:bg-[#1c74a5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar Usuario
        </button>
      </div>
      <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Usuario
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rol
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <img class="w-full h-full rounded-full" :src="'/arturito.jpg'" alt="" />
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ user.username }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ user.email }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                >
                  <span
                    aria-hidden
                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                  ></span>
                  <span class="relative">{{ user.role.name }}</span>
                </span>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                  @click="editUser(user)"
                  class="text-[#2492d1] hover:text-[#1c74a5] mr-2"
                >
                  Editar
                </button>
                <button
                  @click="deleteUser(user.id)"
                  class="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal para editar y agregar usuarios -->
      <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div class="bg-white p-5 rounded-lg shadow-xl w-full max-w-md">
          <h3 class="text-xl font-semibold mb-4 text-[#2492d1]">{{ isEditing ? 'Editar Usuario' : 'Agregar Usuario' }}</h3>
          <form @submit.prevent="isEditing ? updateUser() : addUser()">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Nombre de Usuario
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                v-model="editingUser.username"
                required
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                v-model="editingUser.email"
                required
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="role">
                Rol
              </label>
              <select
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                v-model="editingUser.role"
              >
              <option :value="rol.id" v-for="rol in roles">
                {{ rol.name }}
              </option>
              </select>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-[#2492d1] hover:bg-[#1c74a5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {{ isEditing ? 'Guardar Cambios' : 'Agregar Usuario' }}
              </button>
              <button
                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                @click="closeModal"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { readUsers } from '../services/users.js'
  import { readRoles }  from '../services/roles.js'
  
  // Datos de ejemplo (reemplazar con datos reales o llamadas a API)
  const users = ref([
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'Admin', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'Editor', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 3, username: 'bob_johnson', email: 'bob@example.com', role: 'Viewer', avatar: '/placeholder.svg?height=40&width=40' },
  ])
  
  const roles = ref()
  const showModal = ref(false)
  const editingUser = ref({})
  const isEditing = ref(false)
  
  const editUser = (user) => {
    editingUser.value = { ...user, role: user.role.id }
    isEditing.value = true
    showModal.value = true
  }
  
  const openAddUserModal = () => {
    editingUser.value = { username: '', email: '', role: 'Viewer' }
    isEditing.value = false
    showModal.value = true
  }
  
  const closeModal = () => {
    showModal.value = false
    editingUser.value = {}
  }
  
  const updateUser = () => {
    const index = users.value.findIndex(u => u.id === editingUser.value.id)
    if (index !== -1) {
      users.value[index] = { ...editingUser.value }
    }
    closeModal()
  }
  
  const addUser = () => {
    const newUser = {
      ...editingUser.value,
      id: users.value.length + 1,
      avatar: '/placeholder.svg?height=40&width=40'
    }
    users.value.push(newUser)
    closeModal()
  }
  
  const deleteUser = (userId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      users.value = users.value.filter(u => u.id !== userId)
    }
  }

  onMounted(() => {
    readUsers().then(data => {
      users.value = data.data.data.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.roles[0],
        avatar: user?.avatar || '/placeholder.svg?height=40&width=40'
      }))
    })
    readRoles().then(data => {
      roles.value = data.data.data.map(role => ({
        id: role.id,
        name: role.name
      }))
      console.log(roles.value)      
    })
  })
  </script>
  
  <style scoped>
  /* Estilos adicionales si son necesarios */
  </style>