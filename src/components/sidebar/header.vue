<script setup lang="ts">
import IconCi from '../icons/IconCi.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


const emit = defineEmits(['toggleOpen'])
</script>
<template>
    <div class=" flex items-center justify-start sm:justify-center ">
        <div @click="emit('toggleOpen')"
            class="  size-10  flex flex-row items-center justify-center rounded-[50%] active:bg-neutral-400 active:text-white1 sm:hidden text-blue">
            <font-awesome-icon class=" dark:text-white3 " size="xl" :icon="['fas', 'bars']" />
        </div>
        <IconCi :size="30" />
    </div>
</template>