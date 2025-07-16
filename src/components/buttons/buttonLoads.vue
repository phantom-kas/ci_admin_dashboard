<script setup lang="ts">
import { onMounted } from 'vue';
import spin4Sec from '../spinners/spin4Sec.vue';
defineProps({
    label: {
        default: 'Button',
        type: String
    },
    isLoad: {
        type: Boolean,
        default: false
    },
    classes: {
        default: 'bg-blue text-white ',
        type: String
    },
    disabeldClass: {
        default: ' disabled:bg-blue-600',
        type: String
    }
    ,
    hoverClass: {
        default: ' hover:bg-blue-400 , active:bg-blue-700',
        type: String
    }
})


const emit = defineEmits(['loaded'])
onMounted(() => {
    emit('loaded', {
        title: 'Admin Sign up',
        body: 'Create Your  Account to Manage and Access the Dashboard Effortlessly.',
    })
})
</script>
<template>
    <button :disabled="isLoad" :class="[classes, disabeldClass, hoverClass]"
        class="  relativ flex items-center justify-center gap-2 font-bold p-[10px] rounded-[8px]  cursor-pointer">

        <template v-if="!isLoad">

            <slot name="label">
                <slot>
                    <span v-html="label"></span>
                </slot>
            </slot>
        </template>

        <template v-else>
            <spin4Sec size="1.56" /><span class=" opacity-0">i</span>
        </template>


    </button>
</template>
<style scoped></style>