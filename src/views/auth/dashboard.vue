<script setup lang="ts">
import dashBoardCard from '@/components/dashBoardCard.vue';
import IconPeople from '@/components/icons/IconPeople.vue';
import iconDollar from '@/components/icons/iconDollar.vue';
import IconFiles from '@/components/icons/IconFiles.vue';
import alltracks from '../tracks/alltracks.vue';
import latestInvaoice from '@/components/dashboard/latestInvaoice.vue';
import chat from '@/components/dashboard/chart.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { anyCurrency } from '@/composabels/utilities';

const dashBoardData = ref({} as { [key: string]: any });
const hasLoaded = ref(false);
onMounted(async () => {
    await axios.get('/dashboard').then(res => {
        if (res.data.status !== 'success') return;
        dashBoardData.value = res.data.data;
    })
    hasLoaded.value = true;
})
</script>
<template>
    
    <div class=" w-full flex flex-col justify-start main">
        <div class="w-full h-full flex-col  flex lg:flex-row justify-start items-center  pt-10 gap-6">
            <template v-if="hasLoaded">
                <!-- {{ (parseInt(dashBoardData.thisMonthData.learners_count + '') - parseInt(dashBoardData.prevMonthData.learners_count + '')) }}
                {{ dashBoardData.thisMonthData.learners_count }} -->
                <dashBoardCard :number="dashBoardData.counts.learners_count" class=" self-stretch grow" :change="((parseFloat(dashBoardData.thisMonthData.learners_count + '') - parseFloat(dashBoardData.prevMonthData.learners_count + ''))/ parseFloat(dashBoardData.prevMonthData.learners_count + '') * 100)">
                    <template #icon>
                        <IconPeople :size="65" class=" fill-green-600" />
                    </template>
                </dashBoardCard>

                <!-- {{ dashBoardData }} -->
                <dashBoardCard :number="anyCurrency(dashBoardData.counts.income)" class=" self-stretch grow"
                    title="Revenue"
                    :change="((parseFloat(dashBoardData.thisMonthData.invoice_count + '') - parseFloat(dashBoardData.prevMonthData.invoice_count + ''))/parseFloat(dashBoardData.prevMonthData.invoice_count + '')) * 100">
                    <template #icon>
                        <iconDollar />
                    </template>
                </dashBoardCard>

                <dashBoardCard class=" self-stretch grow" :number="dashBoardData.counts.invoice_count" title="Invoice"
                    :change="((parseFloat(dashBoardData.thisMonthData.invoice_count + '') - parseFloat(dashBoardData.prevMonthData.invoice_count + ''))/parseFloat(dashBoardData.prevMonthData.invoice_count + '')) * 100">
                    <template #icon>
                        <IconFiles :size="65" class=" fill-green-600" />
                    </template>

                </dashBoardCard>
            </template>
        </div>
        <div class=" flex flex-col gap-y-4 mt-6">
            <h3 class="title1 ">
                Tracks
            </h3>
            <alltracks :showDropDown="false" :showInstructor="false" :itemsPerPage="4"
                :showPaginationControls="false" />
        </div>

        <div v-if="hasLoaded" class="flex gap-x-20 justify-between w-full mt-7 flex-wrap gap-y-6">

            <div class=" flex flex-col gap-y-4 mt-6 grow">
                <h3 class="title1   border-b-2 border-b-white2 dark:border-b-[#7F7E83] p-4 pl-0">
                    Recent Revenue
                </h3>
                <chat :data="dashBoardData.revenueChartData"  class=" grow" />
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
<style scoped></style>