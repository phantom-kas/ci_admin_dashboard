<script setup lang="ts">
</script>
<template>
    <div class=" flex flex-row justify-start items-center gap-x-3">
        <img class=" size-10 rounded-[50%]" src="../../assets/images/p1.png" />
        <div class="flex flex-col justify-between h-full ">
            <slot name="name">
                <span class=" leading-4 font-[600]">Admin</span>
                <span class="leading-4">Admin@com.com</span>
            </slot>
        </div>
    </div>
</template>