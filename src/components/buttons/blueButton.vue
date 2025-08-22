<script setup lang='ts'>
import buttonLoads from './buttonLoads.vue';

defineProps({
    label: {
        default: 'Button',
        type: String
    },
    isLoad: {
        type: Boolean,
        default: false
    },
})
</script>
<template>
    <buttonLoads class=" not-dark:bg-blue dark:bg-gray-900 text-white1 dark:disabled:bg-blue-950  not-dark:disabled:bg-blue-300 hover:bg-blue-400 , active:bg-blue-700" :label
        :isLoad>
        
        <slot name="label">
            <span v-html="label"></span>
        </slot>
    </buttonLoads>
</template>
<style scoped></style>