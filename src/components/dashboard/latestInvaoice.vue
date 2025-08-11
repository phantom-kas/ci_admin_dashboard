<script setup lang="ts">
import { onMounted, ref } from 'vue';
import avatar1 from '../avatars/avatar1.vue';
import avatarImage from '../avatars/avatarImage.vue';
import axios from 'axios';
import { anyCurrency, getImageUrl } from '@/composabels/utilities';

const invoices = ref([{
    url: 'dadsa',
    firstName: 'Jhon',
    lastName: 'Doe',
    amount:'$200'
},
{
    url: 'dadsa',
    firstName: 'Jhon',
    lastName: 'Doe',
    amount:'$200'
}
    , {
    url: 'dadsa',
    firstName: 'Jhon',
    lastName: 'Doe',
    amount:'$200'
}
    ,
{
    url: 'dadsa',
    firstName: 'Jhon',
    lastName: 'Doe',
    amount:'$200'
},
{
    url: 'dadsa',
    firstName: 'Jhon',
    lastName: 'Doe',
    amount:'$200'
},
{
    url: 'dadsa',
    firstName: 'Jhon',
    lastName: 'Doe',
    amount:'$200'
},

])

onMounted(()=>{
    axios.get('/invoices?limit=3').then(res => {
        if (res.data.status != 'success') return;
        invoices.value = res.data.data;
    })
})
</script>
<template>
    <div class=" flex flex-col gap-y-6">
        <div class="w-full flex flex-row justify-between text-[#7F7E83] py-5 ">
            <span>NAME</span>
            <span>AMOUNT</span>
        </div>
        <div v-for="invoice, i in invoices" :key="i" class="flex flex-rol justify-between gap-x-4 ">
            <avatar1 :url="getImageUrl(invoice.url)">
                <template #name>
                    <span class=" h-full flex flex-row items-center justify-center">{{invoice.firstName+' '+invoice.lastName}}</span>
                </template>
            </avatar1>
            <span v-html="anyCurrency(invoice.amount)"></span>
        </div>
    </div>
</template>



<style scoped></style>