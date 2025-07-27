<script setup lang='ts'>
import type { Prop, PropType } from 'vue';
import closeRow from '../container/closeRow.vue';

defineProps({
    image: {
        type: String,
        default: ''
    }
    , name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },

    objectMapper: {
        type: Object as PropType<{ key: string, label: string }[]>,
        default: [{ key: 'phone', label: 'Phone' }]
    }, data: {
        type: Object as PropType<{ [key: string]: any }>,
        default: () => ({})
    }
})

const emit = defineEmits(['close'])
</script>
<template>
    <div class="flex flex-col items-center justify-start theme1cont shadow-lg pb-15 rounded-lg text-white3">
        <closeRow @close="emit('close')" class=""/>
        <img :src="image" class=" rounded-[50%] w-max150" alt="">
        <h1 class="text-2xl font-semibold text-center" v-if="name" v-html="name"></h1>
        <span v-if="email" v-html="email"></span>

        <div class="flex flex-col gap-3 mt-10 w-full px-26 mx-auto">
            <div v-for="item in objectMapper" :key="item.key" class="flex items-center gap-x-2 w-full justify-start">
                <div class="w-20">
                    <span class="rounded-md  text-center px-1 py-0.5 text-[10px] bg-neutral-200 dark:bg-neutral-900">{{
                        item.label }}:</span>
                </div>

                <span class=" text-right text-sm" v-html="data[item.key]"></span>
            </div>
        </div>
    </div>
</template>
<style scoped></style>