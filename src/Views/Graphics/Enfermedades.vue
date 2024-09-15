<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">{{ name }} en México</h1>

    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg">
        <h2 class="text-2xl font-semibold text-blue-600 mb-4">&#x1F9A0; Detalles de la Enfermedad</h2>
        <div class="space-y-3">
          <p><strong class="text-gray-700">Nombre:</strong> {{ name }}</p>

        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg">
        <h2 class="text-2xl font-semibold text-blue-600 mb-4">&#x1F4C8; Estadísticas Nacionales</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{ totalCasos.toLocaleString() }}</div>
            <div class="text-sm">Casos Totales</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-red-600">{{ totalDefunciones.toLocaleString() }}</div>
            <div class="text-sm">Defunciones</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 grid md:grid-cols-1 gap-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Casos Totales por Estado</h3>
        <canvas ref="casosTotalesChart"></canvas>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Defunciones por Estado</h3>
        <canvas ref="defuncionesChart"></canvas>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Comparativa: Muertes vs Casos</h3>
        <canvas ref="casosVsRecuperadosChart"></canvas>
      </div>
    </div>

    <!-- Incluir el componente Mapa -->
    <div class="mt-8">
      <Mapa />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { readEnfermedades } from '../../services/estados'
import { useRoute, useRouter } from 'vue-router'
import Mapa from '../../Pages/Mapa.vue' // Importar el componente Mapa

const route = useRoute()
const router = useRouter()

Chart.register(...registerables)

const data = ref({})
const name = ref(route.params?.name || 'nada')

const totalCasos = ref(0)
const totalDefunciones = ref(0)

const casosTotalesChart = ref(null)
const defuncionesChart = ref(null)
const casosVsRecuperadosChart = ref(null)

onMounted(async () => {
  try {
    console.log(route.params.id)
    const response = await readEnfermedades(route.params.id)
    // total general
    data.value = response.data.data
    totalCasos.value = data.value.reduce((sum, item) => sum + item.total_cases, 0)
    totalDefunciones.value = data.value.reduce((sum, item) => sum + item.deaths, 0)
    console.log({
      data: data.value,
      totalCasos: totalCasos.value,
      totalDefunciones: totalDefunciones.value
    })
  } catch (error) {
    console.error(error);
  }
  // Casos Totales Chart
  new Chart(casosTotalesChart.value, {
    type: 'bar',
    data: {
      labels: data.value.map(item => item.name),
      datasets: [{
        label: 'Casos Totales',
        data: data.value.map(item => item.total_cases),
        backgroundColor: '#3b82f6',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Casos Totales por Estado'
        }
      }
    }
  })

  // Defunciones Chart
  new Chart(defuncionesChart.value, {
    type: 'line',
    data: {
      labels: data.value.map(item => item.name),
      datasets: [{
        label: 'Defunciones',
        data: data.value.map(item => item.deaths),
        borderColor: '#ef4444',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Defunciones por Estado'
        }
      }
    }
  })

  // Casos vs Recuperados Chart
  new Chart(casosVsRecuperadosChart.value, {
    type: 'bar',
    data: {
      labels: data.value.map(item => item.name),
      datasets: [
        {
          label: 'Casos',
          data: data.value.map(item => item.total_cases),
          backgroundColor: '#3b82f6',
        },
        {
          label: 'Recuperados',
          data: data.value.map(item => item.deaths),
          backgroundColor: '#10b981',
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Casos vs Recuperados por Estado'
        }
      }
    }
  })
})
</script>