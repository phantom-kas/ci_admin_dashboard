<script setup lang="ts">
import toastItem from "./toastItem.vue";
import { useToastStore } from "@/stores/toast";
const useToast = useToastStore();


function remove(index: number) {
  useToast.remove(index)
}

</script>
<template>
  <transition-group tag="div" id="toastLsit" name="list">
    <toastItem v-for="(toast, i) in useToast.getToasts" :key=toast.key :msg=toast.message :status=toast.status
      @remove="remove(i)" />
  </transition-group>


</template>
<style scoped>
#toastLsit {
  position: fixed;
  z-index: 188888;
  max-height: 100vh;
  width: 2px;
  top: 10px;
  right: 10px;
  width: min-content;
  overflow-y: overlay;
  overflow-x: auto;
  background: none;
}
#toastLsit::-webkit-scrollbar,
#toastLsit::-webkit-scrollbar-thumb {
  pointer-events: initial;
}
#toastLsit::-webkit-scrollbar-track {
  width: 0;
  background: transparent;
}
#toastLsit::-webkit-scrollbar {
  width: 9px;
  background-color: #F5F5F5;
  width: 0;
  background: transparent;
}
#toastLsit::-webkit-scrollbar-thumb {
  width: 0;
  background: transparent;
}
#toastLsit>div {
  pointer-events: initial;
  position: relative;
  width: 200px;
}
</style>