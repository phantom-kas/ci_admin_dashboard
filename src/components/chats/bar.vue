<script setup lang='ts'>
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';

const props = defineProps({
  type:{
    type:String,
    default:'bar'
  },
  data:{
    type:Array,
    default:[]
  },
   labels:{
    type:Array,
    default:[]
  },
})
const labels = props.labels;
// const labels = [Utils.months({count: 12})];
const data = {
  labels: labels,
  datasets: [{
    label: '',
    data: props.data,

    borderWidth: 1
  }]
};
const config: any = {
  type: props.type,
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
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