<script setup lang="ts">
import IconCi from '@/components/icons/IconCi.vue';
import { ref } from 'vue';

const elements = ref({
    title: 'Admin Sign up',
    body: 'Create Your  Account to Manage and Access the Dashboard Effortlessly.',
})
</script>
<template>
    <div class=" flex flex-row items-start justify-center px-3  py-10  relative h-full">
        <img class=" fixed top-0  left-0 z-10 max-w-[unset] sm:w-[100%]  w-[unset] h-[100vh] lg:h-[unset] lg:w-full  min-h-[100%] lg:min-w-[100%]"
            src="../../assets/images/p1.png" />

        <div class=" bg-white top-0 left-0 fixed z-20 min-w-[100vw] min-h-[100vh] opacity-[0.3] shadow-2xl"></div>
        <Transition :key="elements.title" appear  mode="out-in">
            <div
                class=" shadow-2xl z-30 py-[40px] px-[25px] bg-white flex flex-col gap-y-3 items-center justify-center rounded-xl lg:w-min495 w-full">
                <IconCi />
                <div class="leading-5 text-center items-center justify-center flex flex-col w-full gap-y-3">
                    <h1 class="text-3xl font-[600] text-center" v-html="elements.title"></h1>
                    <span class=" text-[#7F7E83]  text-center signbody" v-html="elements.body"></span>
                </div>
                <router-view @loaded="(e: any) => elements = e"></router-view>
            </div>
        </Transition>
    </div>
    <!-- <div class="w-full p-1 bg-blue z-auto">dasda</div> -->
</template>

<style scoped>
.signbody {
    width: min(100%, 400px);
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
    position: absolute;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>