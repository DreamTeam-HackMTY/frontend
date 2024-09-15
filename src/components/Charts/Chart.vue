<template>
    <div class="w-full">
        <Bar
        id="my-chart-id"
        :options="options"
        :data="data"
        v-if="type === 'bar'"
        />
        <Line
        id="my-chart-id"
        :options="options"
        :data="data"
        v-if="type === 'line'"
        />
    </div>
</template>

<script setup>
  import { defineProps, ref, onMounted } from 'vue'
  import { Bar, Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  const props = defineProps({
    type:{
        type: String,
        default: "bar", 
    },
    title:{
        type: String,
        default: 'My Chart',
    },
    data:{
        type: Object,
        required: true,
    },
    options: {
        type: Object,
        required: true,
    }
  })

  onMounted(()=>{
  })
</script>