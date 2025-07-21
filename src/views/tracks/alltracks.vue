<script setup lang="ts">
import trackComponent from '@/components/container/trackComponent.vue';
</script>
<template>
    <div class=" w-full  gap-x-7 tracks gap-y-7 grid lg:grid-cols-4 sm:grid-cols-2 place-items-center">
        <trackComponent class="" />
        <trackComponent class=" " />
        <trackComponent class=" " />
        <trackComponent class=" " />
    </div>
</template>



<style scoped>
.tracks>* {
    /* width: clamp(256px , 100% , 320px); */
    
}
</style>