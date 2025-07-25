<script setup lang="ts">
import Chart from 'chart.js/auto';
import { onMounted, ref, onBeforeMount, onUnmounted } from 'vue';
import 'chartjs-adapter-date-fns';
import axios from 'axios';
// import time_filter from '@/components/filters/time_filter.vue';
import { useRoute } from 'vue-router';
// import { getPeriodString } from '@/composabels/functions';

interface chartDataSetType {
  label: string,
  tension: number,
  data: any[]
}
const route = useRoute()
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
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
const hasLoaded = ref(false)
let config: any = {
  type: 'line',
  data,

};
let lineLabels: any = []
let lineDAta: any = []

onMounted(() => {
  //chart.value = new Chart(chartElement.value as HTMLCanvasElement, config)
  const labels = ['Jan', 'Fed', 'March', 'April', 'May', 'June', 'July']
  const data = {
    labels: labels,
    // datasets: [{
    //   label: 'My First Dataset',
    //   data: [65, 59, 80, 81, 56, 55, 40],
    //   // backgroundColor: [
    //   //   'rgba(255, 99, 132, 0.2)',
    //   //   'rgba(255, 159, 64, 0.2)',
    //   //   'rgba(255, 205, 86, 0.2)',
    //   //   'rgba(75, 192, 192, 0.2)',
    //   //   'rgba(54, 162, 235, 0.2)',
    //   //   'rgba(153, 102, 255, 0.2)',
    //   //   'rgba(201, 203, 207, 0.2)'
    //   // ],
    //   // borderColor: [
    //   //   'rgb(255, 99, 132)',
    //   //   'rgb(255, 159, 64)',
    //   //   'rgb(255, 205, 86)',
    //   //   'rgb(75, 192, 192)',
    //   //   'rgb(54, 162, 235)',
    //   //   'rgb(153, 102, 255)',
    //   //   'rgb(201, 203, 207)'
    //   // ],
    //   borderWidth: 1
    // }]
    datasets: [
      {
        label: 'Section A',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        stack: 'stack1',
        borderRadius: 30,
      },
      // {
      //   label: 'Section B',
      //   data: [40, 30, 20],
      //   backgroundColor: 'rgba(54, 162, 235, 0.8)',
      //   stack: 'stack1',
      //   borderRadius: 30,
      // },
      // {
      //   label: 'Section C',
      //   data: [30, 50, 70],
      //   backgroundColor: 'rgba(75, 192, 192, 0.8)',
      //   stack: 'stack1',
      //   borderRadius: 30,
      // },
      // {
      //   label: 'Section D',
      //   data: [20, 50, 70],
      //   backgroundColor: 'red',
      //   stack: 'stack1',
      //   borderRadius: 30,
      // },

    ]
  };
  let config = {
    type: 'bar',
    data: data,
    options: {
      backgroundColor: '#256FF1',
      categoryPercentage: 0.5,
      hoverBorderColor: '#f1f1f1',
      hoverBorderWidth: 4,
      grouped: false,
      barPercentage: 0.7,
      borderSkipped: 'bottom',
      borderRadius: 30,
      // minBarLength:100,
      responsive: true,
      scales: {
        y: {
          stacked: true,
          beginAtZero: true
        }
      }
    },
  };
  hasLoaded.value = true
  chart.value = new Chart(chartElement.value as HTMLCanvasElement, config as any)
  return

})

const filter = ref('')

onMounted(() => {
  //   if(route.query.period){
  //     filter.value = getPeriodString(route.query.period as filltePeriodType)
  //   }
})
</script>
<template>
  <div class="flex flex-col items-start justify-start">
    <!-- {{ Chartdata }} -->

    <!-- <div v-if="hasLoaded" class="mxpw pos_rel"> -->
    <div class="w-full relative ">
      <canvas ref="chartElement" id="acquisitions" class=" w-full relative" style="position: relative;"></canvas>
    </div>
  </div>
</template>
<style scoped></style>