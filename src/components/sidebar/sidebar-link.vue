<script setup lang="ts">
import IconDashboard from '../icons/IconDashboard.vue';
defineProps({
    text: {
        type: String,
        default: 'Home'
    },
    iconClass: {
        type: String,
        default: 'fill-white group-hover:fill-blue group-hover:text-blue'
    }
})
</script>
<template>
    <!-- <router-link to="/"> -->
    <router-link to="''"
        class="rounded-lg  py-4 px-3 flex flex-row items-center hover:bg-BlueLightest hover:text-black text-white group hover:shadow-2xl cursor-pointer">
        <span class=" w-[15%] flex flex-row justify-start items-center">
            <slot name="icon" v-bind="{ iconClass }">
                <IconDashboard :class="iconClass" color="white" />
            </slot>
        </span>

        <span class=" leading-1 group-hover:text-blue font-[400]">
            <slot name="text">
                {{ text }}
            </slot>
        </span>

    </router-link>
    <!-- </router-link> -->
</template>