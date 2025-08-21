<script setup lang='ts'>
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';
const props = defineProps({
  type: {
    type: String,
    default: 'line'
  },
  data: {
    type: Array,
    default: []
  },

})

const labels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: props.data,
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
const config: any = {
  type:props.type,
  data: data,
};
const chartElement = ref<HTMLCanvasElement | null>(null)

const chart = ref({})

onMounted(() => {
  chart.value = new Chart(chartElement.value as HTMLCanvasElement, config)

})
</script>
<template>
  <!-- <div class="flex flex-col items-start justify-start"> -->
  <!-- {{ Chartdata }} -->

  <!-- <div v-if="hasLoaded" class="mxpw pos_rel"> -->
  <div class="w-full relative ">
    <canvas ref="chartElement" id="acquisitions" class=" w-full relative" style="position: relative;"></canvas>
  </div>
  <!-- </div> -->
</template>
<style scoped></style>