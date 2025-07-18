<script setup lang="ts">
import dashBoardCard from '@/components/dashBoardCard.vue';
import IconPeople from '@/components/icons/IconPeople.vue';
import iconDollar from '@/components/icons/iconDollar.vue';
import IconFiles from '@/components/icons/IconFiles.vue';
</script>
<template>
    <div class=" w-full flex flex-col justify-start">
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
    </div>

</template>



<style scoped></style>