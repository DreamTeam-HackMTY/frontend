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
        @click="goToDiseaseDashboard(disease.id)" >
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ disease.name }}</h3>
            <p class="text-gray-600 mb-4">{{ disease.description }}</p>
            <div class="flex justify-between text-sm text-gray-500">
              <span>Casos: {{ disease.totalCases.toLocaleString() }}</span>
              <span>Muertes: {{ disease.totalDeaths.toLocaleString() }}</span>
            </div>
          </div>
          <div class="bg-gray-100 px-6 py-4">
            <button
              @click="editDisease(disease)"
              class="text-[#2492d1] hover:text-[#1c74a5] font-medium mr-4"
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
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router';
  import { createEnfermedad, readEnfermedades, updateEnfermedad } from '../services/enfermedades';

  const router = useRouter();
  const goToDiseaseDashboard = (id) => {
    router.push({ name: 'enfermedadDash', params: { id } });
  };
  const diseases = ref([
    { id: 1, name: 'COVID-19', description: 'Enfermedad infecciosa causada por el coronavirus SARS-CoV-2.', totalCases: 500000, totalDeaths: 50000 },
    { id: 2, name: 'Influenza', description: 'Enfermedad respiratoria causada por los virus de la influenza.', totalCases: 200000, totalDeaths: 10000 },
    { id: 3, name: 'Dengue', description: 'Enfermedad viral transmitida por mosquitossssssssssssssssssssss.', totalCases: 100000, totalDeaths: 1000 },
    { id: 4, name: 'COVID-19', description: 'Enfermedad infecciosa causada por el coronavirus SARS-CoV-2.', totalCases: 500000, totalDeaths: 50000 },
    { id: 5, name: 'Influenza', description: 'Enfermedad respiratoria causada por los virus de la influenza.', totalCases: 200000, totalDeaths: 10000 },
    { id: 6, name: 'Dengue', description: 'Enfermedad viral transmitida por mosquitossssssssssssssssssssss.', totalCases: 100000, totalDeaths: 1000 },
  ])
  
  const showModal = ref(false)
  const isEditing = ref(false)
  const editingDisease = ref({
    name: '',
    description: '',
    totalCases: 0,
    totalDeaths: 0
  })
  
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
  
  const deleteDisease = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta enfermedad?')) {
      diseases.value = diseases.value.filter(d => d.id !== id)
    }
  }

  onMounted(() => {
    readEnfermedades().then(data => {
      console.log(data.data.data)
      diseases.value = data.data.data.map(disease => ({
        id: disease.id,
        name: disease.name,
        description: disease.description,
        totalCases: disease?.totalCases || 0,
        totalDeaths: disease?.totalDeaths || 0,
      }))
    })
  })
  </script>