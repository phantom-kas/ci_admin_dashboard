<script setup lang="ts">
import sidebarHeader from './sidebarHeader.vue';
import IconDashboard from '../icons/IconDashboard.vue';
import sideBarLink from './sidebar-link.vue'
import IconFile from '../icons/IconFile.vue';
import IconPeople from '../icons/IconPeople.vue';
import IconGraduate from '../icons/IconGraduate.vue';
import avatar1 from '../avatars/avatar1.vue';
import IconLogOut from '../icons/IconLogOut.vue';
import IconGears from '../icons/IconGears.vue';
import { ref } from 'vue';

const isOpen = ref(true)
const handelToggle = () => {
    isOpen.value = !isOpen.value
}
</script>
<template>
    <div :class="[{ 'open': isOpen }, { ' closed': !isOpen }, { 'bg-blue': isOpen }]"
        class=" flex flex-col h-screen w-sidebar300 rounded-br-lg rounded-tr-lg p-2 text-[16px]  top-0  z-50 ofov">
        <sidebarHeader :class="[{ 'sm:py-9 mb-4 ': isOpen },{' dark:bg-black':!isOpen}]" @toggleOpen="handelToggle()"
            class="bg-white  rounded-lg sm:px-5  sm:mb-12 " />
        <div v-show="isOpen" class="w-full flex h-full flex-col duration-150 transition-transform">
            <sideBarLink text="Dashboard" />
            <sideBarLink text="Invoice">
                <template #icon="{ iconClass }">
                    <IconFile :class="iconClass" class="" />
                </template>
            </sideBarLink>
            <sideBarLink text="Learners">
                <template #icon="{ iconClass }">
                    <IconPeople :class="iconClass" class="" />
                </template>
            </sideBarLink>
            <sideBarLink text="Tracks">
                <template #icon="{ iconClass }">
                    <IconGraduate :class="iconClass" class="" />
                </template>
            </sideBarLink>
            <sideBarLink text="Courses">
                <template #icon="{ iconClass }">
                    <IconGraduate :class="iconClass" class="" />
                </template>
            </sideBarLink>

            <sideBarLink text="Report" />
            <sideBarLink text="Settings">
                <template #icon="{ iconClass }">
                    <IconGears :class="iconClass" class="" />
                </template>
            </sideBarLink>
            <div class=" flex flex-row justify-between mt-auto items-center p-3  fill-none stroke-white">
                <avatar1 class=" text-white text-[15px]" />
                <IconLogOut />
            </div>
        </div>
    </div>
</template>
<style scoped>
.ofov {
    overflow: scroll;
    overflow: overlay;
}

.open {
    height: 100vh;
    height: 100dvh;
    width: min(300px, calc(100% - 2rem));
}

.closed {
    height: unset;
    width: 180px;
    /* width: unset; */
}
</style>