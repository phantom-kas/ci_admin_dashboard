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
import { useAuthStore } from '@/stores/auth';
import { getImageUrl } from '@/composabels/utilities';
import IconSun from '../icons/IconSun.vue';
import IconMoon from '../icons/IconMoon.vue';
import { onBeforeRouteUpdate } from 'vue-router';

const theme = useThemeStore()
const darkModelOpen = ref(false)
const isOpen = ref(false)
const handelToggle = () => {
    isOpen.value = !isOpen.value
}
const user = useAuthStore()

onBeforeRouteUpdate(()=>{
    isOpen.value = false 
})
</script>
<template>
    <div :class="[{ 'open': isOpen }, { ' closed max-sm:border-none!': !isOpen }, { '': isOpen }]"
        class="h-dvh flex flex-col w-sidebar300 rounded-br-lg rounded-tr-lg p-2 text-[16px]  top-0  z-20 ofov bg-blue  dark:bg-black dark:border-neutral-900 dark:border-r">
        <Header :class="[{ ' ': isOpen }, { ' max-sm:dark:bg-black! max-sm:py-0 max-sm:mb-0': !isOpen }]"
            @toggleOpen="handelToggle()" class="bg-white rounded-lg sm:px-5  sm:mb-6 dark:bg-neutral-800 sm:py-9 mb-4" />
        <Teleport to="#modal" defer>
            <overlayfixed :class="[{ ' max-sm:hidden': !isOpen }, { 'max-sm:block': isOpen }]" @click="handelToggle()"
                class="z-20 sm:hidden " />
        </Teleport>
        <div  :class="{' max-sm:hidden!':!isOpen}" class="w-full flex  flex-col duration-150 transition-transform z-70">
            <sideBarLink :to="{ name: 'dashboard' }" text="Dashboard" />
            <sideBarLink :to="{ name: 'invoices' }" text="Invoice">
                <template #icon="{ iconClass }">
                    <IconFile :class="iconClass" class="" />
                </template>
            </sideBarLink>
            <sideBarLink :to="{ name: 'users', params: { type: 'learners' } }" text="Learners">
                <template #icon="{ iconClass }">
                    <IconPeople :class="iconClass" class="" />
                </template>
            </sideBarLink>
            <sideBarLink :to="{ name: 'users', params: { type: 'admins' } }" text="Admins">
                <template #icon="{ iconClass }">
                    <IconPeople :class="iconClass" class="" />
                </template>
            </sideBarLink>
            <sideBarLink :to="{ name: 'tracks' }" text="Tracks">
                <template #icon="{ iconClass }">
                    <IconGraduate :class="iconClass" class="" />
                </template>
            </sideBarLink>
            <sideBarLink text="Courses" :to="{ name: 'courses' }">
                <template #icon="{ iconClass }">
                    <IconGraduate :class="iconClass" class="" />
                </template>
            </sideBarLink>

            <sideBarLink :to="{name:'reports'}" text="Report" />
            <!-- <sideBarLink text="Settings">
                <template #icon="{ iconClass }">
                    <IconGears :class="iconClass" class="" />
                </template>
            </sideBarLink> -->
            <themeSelect v-model="darkModelOpen" @click="darkModelOpen = !darkModelOpen">
                <template #menubutton>
                    <sideBarLink class=" gap-1" text="Theme" :isLink="false">
                        <template #icon="{ iconClass }">
                            <!-- <IconGears :class="iconClass" class="" /> -->
                            <IconMoon v-if="theme.value == 'light'" />
                            <!-- <FontAwesomeIcon v-if="theme.value == 'light'" size="xl" :icon="['far','sun']"/> -->
                            <IconSun v-else-if="theme.value == 'dark'" />
                            <!-- <FontAwesomeIcon v-else-if="theme.value == 'dark'" size="xl" :icon="['fas', 'moon']"/> -->
                            <FontAwesomeIcon v-else="theme.value == 'dark'" size="lg" :icon="['fas', 'desktop-alt']" />
                        </template>
                    </sideBarLink>
                </template>
            </themeSelect>
            <!-- <dropdown /> -->
            
        </div>
        <router-link :to="{ name: 'profile-info' }"
                class=" flex flex-row justify-between mt-auto items-center p-3  fill-none stroke-white text-white">
                <avatar1 :src="getImageUrl(user.userInfo.image)" class=" text-white1 text-[15px]" />
                <div  @click.prevent.stop="user.logout()" class=" flex items-center justify-center p-3  hover:bg-BlueLightest hover:text-black rounded-2xl">

                    <IconLogOut class=" " />
                </div>
            </router-link>
    </div>
</template>
<style scoped>
@reference "../../assets/css/main.css";
.ofov {
    overflow: scroll;
    overflow: overlay;
}

.open {
    height: 100vh;
    /* height: 100dvh; */
    /* width: min(300px, calc(100% - 2rem)); */

    
}

.closed {
    /* height: unset; */

    /* width: 180px; */
    @apply max-sm:w-[180px]!  max-sm:h-[unset]
    /* width: unset; */
}
</style>