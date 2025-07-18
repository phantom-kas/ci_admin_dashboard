<script setup lang="ts">
import container1 from './container/container1.vue';
import iconUp from './icons/iconUp.vue';
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
        type: String,
        default: 'Total Learners'
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
                <span
                    class=" text-green-600 text-[14px]  font-[500] dark:text-green-400 text-nowrap  flex flex-row">
                    <span class=" flex flex-row items-center">
                        <iconUp class=" stroke-green-600" />{{change}}
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