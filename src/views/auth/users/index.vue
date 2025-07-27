<script setup lang='ts'>
// import { ref } from 'vue';
import { useRoute } from 'vue-router';
// const key = ref(0)
const route = useRoute()
</script>
<template>
    <router-view :key="route.params.type as string">

    </router-view>
</template>
<style scoped></style>