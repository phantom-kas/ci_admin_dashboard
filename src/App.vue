<script setup lang="ts">
import { onMounted } from 'vue';
import list from './components/toasts/list.vue';
import { useThemeStore } from './stores/theme';


const theme = useThemeStore()

onMounted(() => {
  theme.applyTheme(theme.value)

})
</script>
<template>
  <div id="modal"></div>
  <div id="modal2"></div>
  <RouterView class="text-[18px] " />
  <list/>
</template>

<style scoped></style>
