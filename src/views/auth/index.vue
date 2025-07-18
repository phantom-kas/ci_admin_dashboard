<script setup lang="ts">
import sidebar from '@/components/sidebar/sidebar.vue';
</script>

<template>
  <main
    class=" h-screen dark  sm:flex flex-row items-start justify-between overflow-hidden  dark:bg-black bg-white dark:text-neutral-300 text-black">
    <sidebar class=" sm:relative fixed sm:top-0 sm:left-0" />
    <div
      class="z-10 w-full flex flex-col justify-start items-center px-4 leading-4 text-[16px]  h-screen  ofov relative">
      <h1 class=" text-2xl font-[500]  sticky top-0 bg-white py-3 dark:bg-black sm:pl-0 pl-44 sm:ml-0 w-full">Welcome Admin 👋
      </h1>
      <div class=" flex flex-col gap-y-2 items-start w-full font-[100] py-2 ">

        <span class="text-[#7F7E83] font-[500] dark:text-neutral-300">Track activity, trends, and popular destinations
          in real time</span>
      </div>
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
.ofov {
  overflow: scroll;
  overflow: overlay;
}
</style>
