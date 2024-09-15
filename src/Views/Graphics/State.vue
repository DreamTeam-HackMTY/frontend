<script setup>
import Chart from '../../components/Charts/Chart.vue'
import {data, options} from '../../mocks/chart-data.json'

</script>
    
<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center text-secondary mb-10">COVID-19 en el Estado de México</h1>
        
        <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                <h2 class="text-2xl font-semibold text-primary mb-4">&#x1F9A0; Detalles de la Enfermedad</h2>
                <div class="space-y-3">
                    <p><strong class="text-secondary">Nombre:</strong> COVID-19 (Enfermedad por Coronavirus 2019)</p>
                    <p><strong class="text-secondary">Agente causal:</strong> SARS-CoV-2</p>
                    <p><strong class="text-secondary">Transmisión:</strong> Gotículas respiratorias y contacto cercano</p>
                    <div>
                        <strong class="text-secondary">Síntomas comunes:</strong>
                        <ul class="list-disc list-inside ml-4 mt-2">
                            <li>Fiebre</li>
                            <li>Tos seca</li>
                            <li>Fatiga</li>
                            <li>Pérdida del gusto o del olfato</li>
                        </ul>
                    </div>
                    <div>
                        <strong class="text-secondary">Prevención:</strong>
                        <ul class="list-disc list-inside ml-4 mt-2">
                            <li>Uso de mascarillas</li>
                            <li>Lavado de manos frecuente</li>
                            <li>Distanciamiento social</li>
                            <li>Vacunación</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                <h2 class="text-2xl font-semibold text-primary mb-4">&#x1F4C8; Estadísticas en el Estado de México</h2>
                <div class="flex justify-between mb-6">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-primary">152,487</div>
                        <div class="text-sm">Casos Totales</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-primary">26,568</div>
                        <div class="text-sm">Defunciones</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-primary">93.2%</div>
                        <div class="text-sm">Tasa de Recuperación</div>
                    </div>
                </div>
                <h3 class="text-lg font-semibold text-secondary mb-3">Evolución de Casos Últimos 6 Meses</h3>
                <div class="bg-gray-200 h-auto rounded-md relative overflow-hidden">
                    <Chart
                        type="bar"
                        :data="data"
                        :options="options"
                    />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --background-color: #f9f9f9;
    --card-background: #ffffff;
    --text-color: #333333;
}
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
    margin: 0;
    padding: 20px;
}
.container {
    max-width: 1200px;
    margin: 0 auto;
}
h1, h2 {
    color: var(--secondary-color);
}
h1 {
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 30px;
}
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
}
@media (min-width: 768px) {
    .grid {
        grid-template-columns: 1fr 1fr;
    }
}
.card {
    background: var(--card-background);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 25px;
    transition: transform 0.3s ease;
}
.card:hover {
    transform: translateY(-5px);
}
.card h2 {
    color: var(--primary-color);
    margin-top: 0;
    font-size: 1.5em;
}
.info-item {
    margin-bottom: 15px;
}
.info-item strong {
    color: var(--secondary-color);
}
.stats {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
.stat-item {
    text-align: center;
}
.stat-value {
    font-size: 1.8em;
    font-weight: bold;
    color: var(--primary-color);
}
.chart {
    background-color: #e0e0e0;
    height: 200px;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
}
.bar {
    position: absolute;
    bottom: 0;
    width: 14%;
    background-color: var(--primary-color);
    transition: height 0.5s ease;
}
.bar:nth-child(1) { left: 5%; height: 60%; }
.bar:nth-child(2) { left: 21%; height: 80%; }
.bar:nth-child(3) { left: 37%; height: 40%; }
.bar:nth-child(4) { left: 53%; height: 70%; }
.bar:nth-child(5) { left: 69%; height: 50%; }
.bar:nth-child(6) { left: 85%; height: 90%; }
</style>