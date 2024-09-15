<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">COVID-19 en México por Estados</h1>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:shadow-lg">
          <h2 class="text-2xl font-semibold text-blue-600 mb-4">&#x1F9A0; Detalles de la Enfermedad</h2>
          <div class="space-y-3">
            <p><strong class="text-gray-700">Nombre:</strong> COVID-19 (Enfermedad por Coronavirus 2019)</p>
            <p><strong class="text-gray-700">Agente causal:</strong> SARS-CoV-2</p>
            <p><strong class="text-gray-700">Transmisión:</strong> Gotículas respiratorias y contacto cercano</p>
            <div>
              <strong class="text-gray-700">Síntomas comunes:</strong>
              <ul class="list-disc list-inside ml-4 mt-2">
                <li>Fiebre</li>
                <li>Tos seca</li>
                <li>Fatiga</li>1
                <li>Pérdida del gusto o del olfato</li>
              </ul>
            </div>
            <div>
              <strong class="text-gray-700">Prevención:</strong>
              <ul class="list-disc list-inside ml-4 mt-2">
                <li>Uso de mascarillas</li>
                <li>Lavado de manos frecuente</li>
                <li>Distanciamiento social</li>
                <li>Vacunación</li>
              </ul>
            </div>
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
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600">{{ totalRecuperados.toLocaleString() }}</div>
              <div class="text-sm">Recuperados</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-600">{{ totalActivos.toLocaleString() }}</div>
              <div class="text-sm">Casos Activos</div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="mt-8 grid md:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Casos Totales por Estado</h3>
          <canvas ref="casosTotalesChart"></canvas>
        </div>
  
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Defunciones por Estado</h3>
          <canvas ref="defuncionesChart"></canvas>
        </div>
  
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Comparativa: Casos vs Recuperados</h3>
          <canvas ref="casosVsRecuperadosChart"></canvas>
        </div>
  
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Distribución de Casos Activos</h3>
          <canvas ref="casosActivosChart"></canvas>
        </div>
  
        <div class="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Progreso de Vacunación por Estado</h3>
          <canvas ref="vacunacionChart"></canvas>
        </div>
      </div>
  
      <p class="mt-8 text-sm text-gray-600 text-center">
        <strong>Nota:</strong> Datos ficticios con fines ilustrativos. En una implementación real, estos datos deberían ser actualizados regularmente con información oficial de la Secretaría de Salud de México.
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { Chart, registerables } from 'chart.js'
  
  Chart.register(...registerables)
  
  const data = [
    { estado: 'CDMX', casos: 1500000, defunciones: 80000, recuperados: 1350000, activos: 70000, vacunados: 8000000 },
    { estado: 'Edo. Méx', casos: 1200000, defunciones: 70000, recuperados: 1080000, activos: 50000, vacunados: 7000000 },
    { estado: 'Jalisco', casos: 800000, defunciones: 40000, recuperados: 730000, activos: 30000, vacunados: 5000000 },
    { estado: 'Nuevo León', casos: 600000, defunciones: 30000, recuperados: 550000, activos: 20000, vacunados: 4000000 },
    { estado: 'Puebla', casos: 500000, defunciones: 25000, recuperados: 460000, activos: 15000, vacunados: 3500000 },
  ]
  
  const totalCasos = computed(() => data.reduce((sum, item) => sum + item.casos, 0))
  const totalDefunciones = computed(() => data.reduce((sum, item) => sum + item.defunciones, 0))
  const totalRecuperados = computed(() => data.reduce((sum, item) => sum + item.recuperados, 0))
  const totalActivos = computed(() => data.reduce((sum, item) => sum + item.activos, 0))
  
  const casosTotalesChart = ref(null)
  const defuncionesChart = ref(null)
  const casosVsRecuperadosChart = ref(null)
  const casosActivosChart = ref(null)
  const vacunacionChart = ref(null)
  
  onMounted(() => {
    // Casos Totales Chart
    new Chart(casosTotalesChart.value, {
      type: 'bar',
      data: {
        labels: data.map(item => item.estado),
        datasets: [{
          label: 'Casos Totales',
          data: data.map(item => item.casos),
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
        labels: data.map(item => item.estado),
        datasets: [{
          label: 'Defunciones',
          data: data.map(item => item.defunciones),
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
        labels: data.map(item => item.estado),
        datasets: [
          {
            label: 'Casos',
            data: data.map(item => item.casos),
            backgroundColor: '#3b82f6',
          },
          {
            label: 'Recuperados',
            data: data.map(item => item.recuperados),
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
  
    // Casos Activos Chart
    new Chart(casosActivosChart.value, {
      type: 'pie',
      data: {
        labels: data.map(item => item.estado),
        datasets: [{
          data: data.map(item => item.activos),
          backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'],
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
            text: 'Distribución de Casos Activos'
          }
        }
      }
    })
  
    // Vacunación Chart
    new Chart(vacunacionChart.value, {
      type: 'bar',
      data: {
        labels: data.map(item => item.estado),
        datasets: [{
          label: 'Personas Vacunadas',
          data: data.map(item => item.vacunados),
          backgroundColor: '#8884d8',
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
            text: 'Progreso de Vacunación por Estado'
          }
        }
      }
    })
  })
  </script>