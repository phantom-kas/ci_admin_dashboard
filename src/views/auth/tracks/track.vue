<script setup lang="ts">
import alltracks from '@/views/tracks/alltracks.vue';
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import search_input from '@/components/form_components/search_input.vue';
import { useRoute, useRouter } from 'vue-router';
import createTrack from './createTrack.vue';
import screen2 from '@/components/container/screen2.vue';
import { ref } from 'vue';

const route = useRoute()
const router = useRouter()

const tracks = ref([] as any[])
</script>
<template>
    <div class="flex flex-col justify-start items-center gap-y-6 w-full pt-10 ">

        <form @submit.prevent="" class=" w-full flex flex-row justify-between flex-wrap gap-7">
            <search_input />
            <router-link :to="{ name: 'add-track' }">
                <buttonLoads type="button" class="sm:w-[200px]">
                    <template #label>
                        <div class="flex gap-x-4">
                            <FontAwesomeIcon :icon="['fas', 'plus']" />
                            Add Track
                        </div>
                    </template>
                </buttonLoads>
            </router-link>
        </form>
        <alltracks @fullList="e => tracks = e" class=" w-full" />

        <!-- <buttonLoads type="button" class="sm:w-[200px]" @click="tracks.push({...tracks[0]})">Add</buttonLoads> -->

    </div>
    <!-- dasda -->
    <screen2 @close="router.go(-1)" v-if="route.name == 'add-track'" to="#modal2" defer>
        <createTrack @success="e=>{router.go(-1);tracks.unshift(e)}" />
    </screen2>
</template>


<style scoped></style>