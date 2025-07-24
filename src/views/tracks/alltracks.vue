<script setup lang="ts">
import trackComponent from '@/components/container/trackComponent.vue';
import paginationList from '@/components/list/paginationList.vue';
import { getImageUrl } from '@/composabels/utilities';
import axios from 'axios';
import { onMounted } from 'vue';


defineProps({
    showPaginationControls: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['fullList'])
onMounted(() => {
    // emit('fullList', tracks)
})
</script>
<template>
    <!-- <div class=" w-full  gap-x-7 tracks gap-y-7 grid lg:grid-cols-4 sm:grid-cols-2 place-items-center">
        <trackComponent class="" />
        <trackComponent class=" " />
        <trackComponent class=" " />
        <trackComponent class=" " /> -->
    <div class="w-full flex flex-col gap-y-6 items-start justify-start">
        <!-- {{ tracks }} -->
        <paginationList @fullList="e =>  emit('fullList', e)" :showPaginationControls component="div"
            class="w-full  gap-x-7 tracks  gap-y-7 grid lg:grid-cols-4 sm:grid-cols-2 place-items-center items-stretch" url="/tracks">
            <template #items="{ item, i }">
                <trackComponent
                    :track="{ title: item.name, url: getImageUrl(item.image), duration: item.duration, courses: ['eng'] }"
                    class=" " />
                <!-- {{ i }}
                    {{ item }} -->
            </template>
        </paginationList>
    </div>
    <!-- </div> -->
</template>



<style scoped>
.tracks {
    width: 300px;

} 
</style>