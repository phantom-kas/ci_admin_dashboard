<script setup lang="ts">
import Chart from 'chart.js/auto';
import { onMounted, ref, onBeforeMount, onUnmounted, type Prop, type PropType } from 'vue';
import 'chartjs-adapter-date-fns';
import axios from 'axios';
import 'chartjs-adapter-date-fns';
// import time_filter from '@/components/filters/time_filter.vue';
import { useRoute } from 'vue-router';
// import { getPeriodString } from '@/composabels/functions';


const props = defineProps({
  data: {
    type: Object as PropType<{ [key: string]: any }[]>,
    required: true
  }
})

interface chartDataSetType {
  label: string,
  // tension: number,
  maxBarThickness:number,
  hoverBackgroundColor:string,
  hoverBorderColor?:string,
  borderRadius:number,
  data: any[],
  backgroundColor:string
}

const showDashBoard = ref(false)


const Chartdata = ref<chartDataSetType[]>([])
const Data = ref([])
const chartElement = ref<HTMLCanvasElement | null>(null)

const chart = ref({})
const classData = ref<any>({})
const labels = [1, 2, 3, 3, 4, 5, 6, 7];
const data = {
  labels: [1, 2, 3, 4, 5, 6, 7],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: '#005CFF',
    tension: 0.1
  }]
};
const hasLoaded = ref(true)
let config: any = {
  type: 'line',
  data,

};
let lineLabels: any = []
let lineDAta: any = []


// onMounted(() => {
//   //chart.value = new Chart(chartElement.value as HTMLCanvasElement, config)
//   const labels = ['Jan', 'Fed', 'March', 'April', 'May', 'June', 'July']
//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Section A',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         backgroundColor: 'rgba(75, 192, 192, 0.8)',
//         stack: 'stack1',
//         borderRadius: 30,
//       },

//     ]
//   };
//   let config = {
//     type: 'bar',
//     data: data,
//     options: {
//       backgroundColor: '#256FF1',
//       categoryPercentage: 0.5,
//       hoverBorderColor: '#f1f1f1',
//       hoverBorderWidth: 4,
//       grouped: false,
//       barPercentage: 0.7,
//       borderSkipped: 'bottom',
//       borderRadius: 30,
//       // minBarLength:100,
//       responsive: true,
//       scales: {
//         y: {
//           stacked: true,
//           beginAtZero: true
//         }
//       }
//     },
//   };
//   hasLoaded.value = true
//   chart.value = new Chart(chartElement.value as HTMLCanvasElement, config as any)
//   return

// })

const filter = ref('')

onMounted(() => {
  Chartdata.value = [
//         backgroundColor: 'rgba(75, 192, 192, 0.8)',
    { label: 'Revenue (USD)',maxBarThickness:60,borderRadius:30,backgroundColor:'#005CFF',hoverBackgroundColor:'#1F1F36' ,data: [] },
    //{label:'Nuber of sales people',data:[]}
  ]
  for (let index = 0; index < props.data.length; index++) {
    Chartdata.value[0]['data'].push({ y: parseInt(props.data[index]['income']+'')/100, x: props.data[index]['month'] });
  }

  config.type = 'bar'
  config.data = { datasets: Chartdata.value }
  config.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month'
        }
      },
      y: {
        beginAtZero: true
      }
    }

  }
  console.log('config')
  hasLoaded.value = true
  chart.value = new Chart(chartElement.value as HTMLCanvasElement, config)
})
</script>
<template>
  <div class="flex flex-col items-start justify-start">
    <!-- {{ Chartdata }} -->

    <!-- <div v-if="hasLoaded" class="mxpw pos_rel"> -->
    <div class="w-full relative ">
      <canvas v-if="hasLoaded" ref="chartElement" id="acquisitions" class=" w-full relative"
        style="position: relative;"></canvas>
    </div>
  </div>
</template>
<style scoped></style>