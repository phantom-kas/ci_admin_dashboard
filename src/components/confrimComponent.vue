<script setup lang='ts'>
import screen2 from './container/screen2.vue';
import closeRow from './container/closeRow.vue';
import buttonLoads from './buttons/buttonLoads.vue';
const emit = defineEmits(['close','ok'])
</script>
<template>
    <screen2  @close="emit('close')" to="#modal2" defer>
        <div class=" w-min495 flex flex-col justify-start items-start theme1cont z-90 my-auto">
            <closeRow @close="emit('close')" />
            <slot name="text" >
               <div class=" p-4">

                   Are You sure you want to proceed
               </div>
            </slot>
            <slot>
                <div class=" w-full flex justify-end items-center px-4 gap-x-3 py-3">
                    <buttonLoads  @click="emit('close')" class=" bg-red-600! hover:bg-red-500! text-white!" label="Close"/>
                    <buttonLoads @click="emit('ok')" class=" bg-green-600! hover:bg-green-500!" label="Ok"/>
                </div>
            </slot>
        </div>
    </screen2>
</template>
<style scoped></style>