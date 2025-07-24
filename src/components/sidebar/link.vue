<script setup lang="ts">
import IconDashboard from '../icons/IconDashboard.vue';
defineProps({
    text: {
        type: String,
        default: 'Home'
    },
    iconClass: {
        type: String,
        default: 'group-hover:text-blue  group-hover:dark:text-BlueLightest'
    },
    isLink: {
        type: Boolean,
        default: true
    }
})


</script>
<template>
    <!-- <router-link to="/"> -->
    <component :is="isLink ? 'RouterLink' : 'div'" to="''"
        class="rounded-lg  py-4 px-3 flex flex-row items-center  hover:bg-BlueLightest dark:hover:bg-neutral-800 hover:text-blue hover:dark:text-BlueLightest  text-white1 group hover:shadow-2xl cursor-pointer">
        <span class=" w-[15%] flex flex-row justify-start items-center">
            <slot name="icon" v-bind="{ iconClass }">
                <IconDashboard :class="iconClass" color="white" />
            </slot>
        </span>

        <span class=" leading-1 group-hover:text-blue font-[400] group-hover:dark:text-BlueLightest">
            <slot name="text">
                {{ text }}
            </slot>
        </span>

    </component>
    <!-- </router-link> -->
</template>

<style scoped>
@reference "../../assets/css/main.css";
.dark .router-link-active {
    @apply bg-neutral-900 text-blue-light
}
.router-link-active {
    @apply bg-white text-blue
}
</style>