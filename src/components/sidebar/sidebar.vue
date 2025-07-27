<script setup lang="ts">
import Header from './header.vue';
import sideBarLink from './link.vue';
import IconFile from '../icons/IconFile.vue';
import IconPeople from '../icons/IconPeople.vue';
import IconGraduate from '../icons/IconGraduate.vue';
import avatar1 from '../avatars/avatar1.vue';
import IconLogOut from '../icons/IconLogOut.vue';
// import IconGears from '../icons/IconGears.vue';
import themeSelect from '../menus/themeSelect.vue';
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useThemeStore } from '@/stores/theme';
import overlayfixed from '../overlayfixed.vue';
const theme = useThemeStore()
const darkModelOpen = ref(false)
const isOpen = ref(true)
const handelToggle = () => {
    isOpen.value = !isOpen.value
}
</script>
<template>
    <div :class="[{ 'open': isOpen }, { ' closed': !isOpen }, { 'bg-blue  dark:bg-black dark:border-gray-600 dark:border-r': isOpen }]"
        class=" flex flex-col h-screen w-sidebar300 rounded-br-lg rounded-tr-lg p-2 text-[16px]  top-0  z-20 ofov">
        <Header :class="[{ 'sm:py-9 mb-4 dark:bg-neutral-800': isOpen }, { 'dark:bg-black': !isOpen }]"
            @toggleOpen="handelToggle()" class="bg-white   rounded-lg sm:px-5  sm:mb-6 " />
            <Teleport to="#modal" defer>
                <overlayfixed :class="[{' hidden':!isOpen},{'block':isOpen}]" @click="handelToggle()" class="z-20 sm:hidden "/>
            </Teleport>
        <div v-show="isOpen" class="w-full flex h-full flex-col duration-150 transition-transform z-70">
            <sideBarLink :to="{name:'dashboard'}" text="Dashboard" />
            <sideBarLink text="Invoice">
                <template #icon="{ iconClass }">
                    <IconFile :class="iconClass" class="" />
                </template>
            </sideBarLink>
            <sideBarLink :to="{name:'users',params:{type:'learners'}}" text="Learners">
                <template #icon="{ iconClass }">
                    <IconPeople :class="iconClass" class="" />
                </template>
            </sideBarLink>
             <sideBarLink :to="{name:'users',params:{type:'admins'}}" text="Admins">
                <template #icon="{ iconClass }">
                    <IconPeople :class="iconClass" class="" />
                </template>
            </sideBarLink>
            <sideBarLink :to="{name:'tracks'}" text="Tracks">
                <template #icon="{ iconClass }">
                    <IconGraduate :class="iconClass" class="" />
                </template>
            </sideBarLink>
            <sideBarLink text="Courses" :to="{name:'courses'}">
                <template #icon="{ iconClass }">
                    <IconGraduate :class="iconClass" class="" />
                </template>
            </sideBarLink>

            <sideBarLink text="Report" />
            <!-- <sideBarLink text="Settings">
                <template #icon="{ iconClass }">
                    <IconGears :class="iconClass" class="" />
                </template>
            </sideBarLink> -->
            <themeSelect v-model="darkModelOpen" @click="darkModelOpen = !darkModelOpen">
               <template #menubutton>
                 <sideBarLink text="Theme" :isLink="false">
                    <template #icon="{ iconClass }">
                        <!-- <IconGears :class="iconClass" class="" /> -->

                         <FontAwesomeIcon v-if="theme.value == 'light'" size="xl" :icon="['far','sun']"/>
                         <FontAwesomeIcon v-else-if="theme.value == 'dark'" size="xl" :icon="['fas', 'moon']"/>
                         <FontAwesomeIcon v-else="theme.value == 'dark'" size="xl" :icon="['fas', 'desktop-alt']"/>
                    </template>
                </sideBarLink>
               </template>
            </themeSelect>
            <!-- <dropdown /> -->
            <div class=" flex flex-row justify-between mt-auto items-center p-3  fill-none stroke-white">
                <avatar1 class=" text-white1 text-[15px]" />
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