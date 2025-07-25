<script setup lang="ts">
import dashBoardCard from '@/components/dashBoardCard.vue';
import IconPeople from '@/components/icons/IconPeople.vue';
import iconDollar from '@/components/icons/iconDollar.vue';
import IconFiles from '@/components/icons/IconFiles.vue';
import alltracks from '../tracks/alltracks.vue';
import latestInvaoice from '@/components/dashboard/latestInvaoice.vue';
import chat from '@/components/dashboard/chart.vue';
</script>
<template>
    <div class=" w-full flex flex-col justify-start main">
        <div class="w-full h-full flex-col  flex lg:flex-row justify-start items-center  pt-10 gap-6">

            <dashBoardCard class=" self-stretch grow" change="12%">
                <template #icon>
                    <IconPeople :size="65" class=" fill-green-600" />
                </template>
            </dashBoardCard>

            <dashBoardCard class=" self-stretch grow" title="Revenue" number="$12,450" change="12%">
                <template #icon>
                    <iconDollar />
                </template>
            </dashBoardCard>

            <dashBoardCard class=" self-stretch grow" number="100" title="Invoice" change="12%">
                <template #icon>
                    <IconFiles :size="65" class=" fill-green-600" />
                </template>

            </dashBoardCard>
        </div>
        <div class=" flex flex-col gap-y-4 mt-6">
            <h3 class="title1 ">
                Tracks
            </h3>
            <alltracks :showDropDown="false" :showInstructor="false" :itemsPerPage="4" :showPaginationControls="false" />
        </div>

        <div class="flex gap-x-20 justify-between w-full mt-7 flex-wrap gap-y-6">

            <div class=" flex flex-col gap-y-4 mt-6 grow">
                <h3 class="title1   border-b-2 border-b-white2 dark:border-b-[#7F7E83] p-4 pl-0">
                    Recent Revenue
                </h3>
                <chat class=" grow" />
            </div>

            <div class=" flex flex-col gap-y-4 mt-6 w-min495">
                <h3 class="title1   border-b-2 border-b-[#E5E5EF] dark:border-b-[#7F7E83] p-4 pl-0">
                    Tracks
                </h3>
                <latestInvaoice class=" w-full p-6" />
            </div>
        </div>
    </div>

</template>
<style scoped>

</style>