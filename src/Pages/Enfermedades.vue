<template>
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-[#2492d1]">Enfermedades</h2>
        <button
          @click="openAddDiseaseModal"
          class="bg-[#2492d1] hover:bg-[#1c74a5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar Enfermedad
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="disease in diseases" :key="disease.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
        >
          <div class="p-6" @click="goToDiseaseDashboard(disease.id, disease.name)">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ disease.name }}</h3>
            <p class="text-gray-600 mb-4">{{ disease.description }}</p>
            <div class="flex justify-between text-sm text-gray-500">
              <span>Casos: {{ disease.total_cases.toLocaleString() }}</span>
              <span>Muertes: {{ disease.deaths.toLocaleString() }}</span>
            </div>
          </div>
          <div class="bg-gray-100 px-6 py-2 flex items-center justify-between">
            <div class="flex space-x-4">
              <button
                @click="editDisease(disease)"
                class="text-[#2492d1] hover:text-[#1c74a5] font-medium"
              >
                Editar
              </button>
              <button
                @click="deleteDisease(disease.id)"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                Eliminar
              </button>
            </div>
            <button
                @click="openAddCasesOrDeathsModal(disease.id)"
                class="bg-green-500 hover:bg-green-700 text-white font-medium rounded-full px-4 py-2"
            >
                +
            </button>
          </div>
        </div>
      </div>
  
      <!-- Modal para editar y agregar enfermedades -->
      <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h3 class="text-xl font-semibold mb-4 text-[#2492d1]">{{ isEditing ? 'Editar Enfermedad' : 'Agregar Enfermedad' }}</h3>
          <form @submit.prevent="isEditing ? updateDisease() : addDisease()">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                Nombre
              </label>
              <input
                id="name"
                v-model="editingDisease.name"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                Descripción
              </label>
              <textarea
                id="description"
                v-model="editingDisease.description"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
                required
              ></textarea>
            </div>
            <!-- <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="totalCases">
                Total de Casos
              </label>
              <input
                id="totalCases"
                v-model.number="editingDisease.totalCases"
                type="number"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="totalDeaths">
                Total de Muertes
              </label>
              <input
                id="totalDeaths"
                v-model.number="editingDisease.totalDeaths"
                type="number"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
            </div> -->
            <div class="flex items-center justify-between">
              <button
                type="submit"
                class="bg-[#2492d1] hover:bg-[#1c74a5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {{ isEditing ? 'Guardar Cambios' : 'Agregar Enfermedad' }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

          <!-- Modal para agregar casos o muertes -->
    <div v-if="showCasesDeathsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h3 class="text-xl font-semibold mb-4 text-[#2492d1]">Agregar Casos o Muertes</h3>
        <form @submit.prevent="saveCasesOrDeaths">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="quantity">
              Cantidad
            </label>
            <input
              id="quantity"
              v-model.number="quantity"
              type="number"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="type">
              Tipo
            </label>
            <select
              id="type"
              v-model="type"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="false">Casos</option>
              <option value="true">Muertes</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="state">
              Estado
            </label>
            <select
              id="state"
              v-model="state"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Selecciona un estado</option>
              <option v-for="state in states" :key="state.id" :value="state.id">{{ state.name }}</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-[#2492d1] hover:bg-[#1c74a5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Guardar
            </button>
            <button
              type="button"
              @click="closeCasesDeathsModal"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
  import { useRouter } from 'vue-router';
  import { createEnfermedad, readEnfermedades, updateEnfermedad, deleteEnfermedad } from '../services/enfermedades';
  import { readEstados } from '../services/estados';
  import { createCaso } from '../services/casos';

  const router = useRouter();
  const goToDiseaseDashboard = (id, name) => {
    router.push('/enfermedadDash/'+id+'/'+name);
  };
  const diseases = ref()
  const states = ref()
  
  const showModal = ref(false)
  const isEditing = ref(false)
  const editingDisease = ref({
    name: '',
    description: '',
    total_cases: 0,
    deaths: 0
  })

  const estados = ref(['Estado 1', 'Estado 2', 'Estado 3']) // Lista de estados

// Modal para agregar casos o muertes
const showCasesDeathsModal = ref(false)
const quantity = ref(0)
const type = ref('cases')
const state = ref(0)
const diseaseId = ref(null) // Para almacenar el ID de la enfermedad


// Método para abrir el modal de agregar casos o muertes
const openAddCasesOrDeathsModal = (id) => {
  diseaseId.value = id // Asignar el ID de la enfermedad
  quantity.value = 0
  type.value = 'cases'
  state.value = 0
  showCasesDeathsModal.value = true
}

// Método para cerrar el modal
const closeCasesDeathsModal = () => {
  showCasesDeathsModal.value = false
  diseaseId.value = null // Reiniciar el ID de la enfermedad
  quantity.value = 0
  type.value = 'cases'
    state.value = 0

}

// Método para guardar la información usando el servicio
const saveCasesOrDeaths = async () => {
  try {
    const data = {
      quantity: quantity.value,
      is_deaths: type.value,
      state_id: state.value,
      disease_id: diseaseId.value
    }
    await createCaso(data) // Llamada al servicio que maneja la lógica de agregar la información
    readEnfermedades().then(data => {
        diseases.value = data.data.data.map(disease => ({
        id: disease.id,
        name: disease.name,
        description: disease.description,
        total_cases: disease.total_cases,
        deaths: disease.deaths
      }))
    })
    closeCasesDeathsModal()
    alert('Información guardada exitosamente.')
  } catch (error) {
    console.error(error)
    alert('Error al guardar la información.')
  }
}
  
  const openAddDiseaseModal = () => {
    editingDisease.value = { name: '', description: '', totalCases: 0, totalDeaths: 0 }
    isEditing.value = false
    showModal.value = true
  }
  
  const editDisease = (disease) => {
    editingDisease.value = { ...disease }
    isEditing.value = true
    showModal.value = true
  }
  
  const closeModal = () => {
    showModal.value = false
    editingDisease.value = { name: '', description: '', totalCases: 0, totalDeaths: 0 }
  }
  
  const addDisease = async () => {
    try {
      const res = await createEnfermedad(editingDisease.value)
      diseases.value.push({ ...editingDisease.value, id: res.data.data.id })
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }
  
  const updateDisease = async () => {
    try {
      const res = await updateEnfermedad(editingDisease.value.id, editingDisease.value)
      const index = diseases.value.findIndex(d => d.id === res.data.data.id)
      if (index !== -1) {
        diseases.value[index] = { ...editingDisease.value }
      }
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }
  
  const deleteDisease = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta enfermedad?')) {
    try {
      await deleteEnfermedad(id);
      diseases.value = diseases.value.filter(d => d.id !== id);
    } catch (error) {
      console.error('Error al eliminar enfermedad:', error);
    }
  }
};


onMounted(() => {
    readEnfermedades().then(data => {
        diseases.value = data.data.data.map(disease => ({
        id: disease.id,
        name: disease.name,
        description: disease.description,
        total_cases: disease.total_cases,
        deaths: disease.deaths
      }))
    })
    readEstados().then(data => {
      states.value = data.data.data.map(state => ({
        id: state.id,
        name: state.name
      }))
    })
  })
  </script>