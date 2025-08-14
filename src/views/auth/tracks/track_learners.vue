<script setup lang='ts'>
import tabelList from '@/components/list/tabelList.vue';
import avatar1 from '@/components/avatars/avatar1.vue';
import { anyCurrency, getImageUrl } from '@/composabels/utilities';

const props = defineProps({
    id: {
        type: [String, Number],
        default: null
    }
})

</script>
<template>

    <tabelList beark-point="710px" class=" mt-2" :listMapper="[
        { key: '_allItems', title: 'User', slotName: 'cc' },
        { key: 'created_at', title: 'Date Enrolled', slotName: 'amt' },
        { key: 'amount', title: 'Paid' },
        { key: 'status', title: 'Status' },
    ]" url="track-learners">
        <template #amount="{ item, i }">
            <span class=" w-full text-right"> {{ anyCurrency(item) }}</span>
        </template>
        <template #cc="{ item, i }">
            <!-- {{ item.email }} -->
            <avatar1 :src="getImageUrl(item.image)">
                <template #name>
                    {{ item.firstName }} {{ item.lastName }}
                </template>
            </avatar1>
        </template>
         <template #status="{ item, i }">
                <span
                    class="w-fit text-right capitalize py-1 px-2 font-[500] text-xs rounded-2xl flex items-center justify-center"
                    :class="{ ' bg-amber-400 text-amber-950': item == 'pending', ' bg-green-500 text-green-950': item == 'paid' }">
                    {{ item }}</span>
            </template>
    </tabelList>
</template>
<style scoped></style>