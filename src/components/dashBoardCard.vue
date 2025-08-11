<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import container1 from './container/container1.vue';
import iconUp from './icons/iconUp.vue';
import { faArrowDown,faArrowUp, faMinus } from '@fortawesome/free-solid-svg-icons';
defineProps({
    number: {
        type: String,
        default: '12,450'
    },
    title: {
        type: String,
        default: 'Total Learners'
    },
    change: {
        type: Number,
        default: 0
    }
})
</script>
<template>
    <container1 class=" flex flex-col gap-4 flex-wrap items-start shadow">
        <h1 class=" text-[#2E2C48] dark:text-neutral-300">{{ title }}</h1>
        <div class="flex flex-row justify-between items-baseline w-full grow  mt-3">
            <div class="flex flex-col justify-between justify-self-stretch self-stretch relative ">
                <span class=" text-[46px] font-[600] text-[#1F1F36] dark:text-neutral-300 leading-8" >
                    {{ number }}
                </span>
                <span v-if="change > 0"
                    class=" text-green-600 text-[14px]  font-[500] dark:text-green-400 text-nowrap  flex flex-row">
                    <span class=" flex flex-row items-center">
                         <FontAwesomeIcon :icon="faArrowUp" />{{change}}%
                    </span><span class=" text-[#7F7E83] dark:text-neutral-300 ml-2 font-[400]">vs last month</span>
                </span>
                <span v-else-if="change < 0"
                    class=" text-red-600 text-[14px]  font-[500] dark:text-red-400 text-nowrap  flex flex-row">
                    <span class=" flex flex-row items-center">
                        <FontAwesomeIcon :icon="faArrowDown" />{{ Math.abs(change)}}%
                    </span><span class=" text-[#7F7E83] dark:text-neutral-300 ml-2 font-[400]">vs last month</span>
                </span>
                <span v-else
                    class=" text-neutral-600 text-[14px]  font-[500] dark:text-neutral-400 text-nowrap  flex flex-row">
                    <span class=" flex flex-row items-center">
                        <FontAwesomeIcon :icon="faMinus" />
                    </span><span class=" text-[#7F7E83] dark:text-neutral-300 ml-2 font-[400]">vs last month</span>
                </span>
            </div>
            <div>
                <slot name="icon">
                    <IconPeople :size="65" class=" fill-green-600" />
                </slot>
            </div>
        </div>
    </container1>
</template>