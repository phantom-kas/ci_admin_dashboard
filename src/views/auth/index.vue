<script setup lang="ts">
import sidebar from '@/components/sidebar/sidebar.vue';
</script>

<template>
  <main
    class=" h-screen   sm:flex flex-row items-start justify-between overflow-hidden  dark:bg-black bg-white dark:text-neutral-300 text-black">
    <sidebar class=" sm:relative fixed sm:top-0 sm:left-0" />
    <div
      class="z-10 w-full flex flex-col justify-start items-center px-6 leading-4 text-[16px]  h-screen  ofov relative [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-950
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700">
      <h1
        class="text-xl sm:text-2xl font-[500]  sticky top-0 bg-white py-3 dark:bg-black z-20 sm:pl-0 pl-44 sm:ml-0 mainw">
        Welcome
        Admin <span class=" hidden sm:inline">👋</span>
      </h1>
      <div class=" flex flex-col gap-y-2 items-start mainw font-[100] py-2 ">

        <span class="text-[#7F7E83] font-[500] dark:text-neutral-300">Track activity, trends, and popular destinations
          in real time</span>
      </div>
      <div class="mainw flex items-start justify-start">

        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<style scoped>
.ofov {
  overflow: scroll;
  overflow: overlay;
}

.mainw {
  width: min(100%, 1500px);
}
</style>
