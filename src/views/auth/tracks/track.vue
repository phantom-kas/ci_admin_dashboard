<script setup lang='ts'>
import dropdown from '@/components/menus/dropdown.vue';
import { anyCurrency } from '@/composabels/utilities';
import axios from 'axios';
import { onMounted, ref } from 'vue';

defineProps({
    id: {
        type: String
    },

})

const track = ref({})
const hasLoaded = ref(false)
onMounted(() => {
    axios.get('').then()
})
</script>
<template>
    <div class=" w-[min(100%,742px)] flex flex-col mx-auto py-11">
        <img src="../../../assets/images/t1.png" class=" w-full rounded-t-2xl" alt="">
        <div class=" w-full flex flex-col p-6 gap-y-5 py-11 ">
            <div class=" flex justify-between w-full items-end">
                <h1 class=" text-[40px] font-[600] text-4xl">Software Development</h1>
                <dropdown />
            </div>
            <div class=" flex justify-start flex-wrap w-full items-center">
                <div class=" flex gap-x-4 text-sm">
                    icons
                </div>
                <span class=" ml-auto text-2xl font-[400]"> {{ anyCurrency(1000000) }}</span>
            </div>
            <div class=" flex justify-start flex-wrap w-full items-center ">
                <div class=" flex gap-x-4 text-[12px] ">
                    <span> courses</span>
                </div>
                <div class=" ml-auto">
                    Ratings
                </div>
            </div>
            <div class=" w-full text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
            </div>

        </div>
    </div>
</template>
<style scoped>
/* .trackwdith{
        width: min(742px);
    } */
</style>