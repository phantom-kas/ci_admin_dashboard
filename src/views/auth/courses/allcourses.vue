<script setup lang='ts'>
import tabelList from '@/components/list/tabelList.vue';
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import search_input from '@/components/form_components/search_input.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import createCourse from './createCourse.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import screen2 from '@/components/container/screen2.vue';
import avatar1 from '@/components/avatars/avatar1.vue';
import { getImageUrl } from '@/composabels/utilities';
const router = useRouter()
const route = useRoute()
const courses = ref([] as any[])
</script>
<template>
    <div class="w-full flex flex-col gap-y-4 pt-6">
        <form @submit.prevent="" class=" w-full flex flex-row justify-between flex-wrap gap-7">
            <search_input />
            <router-link :to="{ name: 'add-course' }">
                <buttonLoads type="button" class="sm:w-[200px]">
                    <template #label>
                        <div class="flex gap-x-4">
                            <FontAwesomeIcon :icon="['fas', 'plus']" />
                            Add Course
                        </div>
                    </template>
                </buttonLoads>
            </router-link>
        </form>
        <tabelList @full-list="e => courses = e" :listMapper="[
            // { key: 'id', title: 'ID' },
            // { key: 'title', title: 'Title' },
            { key: '_allItems', title: 'Courses', slotName: 'cc' },
            { key: 'trackName', title: 'Track' },
            { key: 'created_at', title: 'Created At' },
        ]" url="courses">
            <template #cc="{ item, i }">
                <!-- {{ item }} -->
                <avatar1 :src="getImageUrl(item.image)">
                    <template #name>
                       {{ item.title }}
                    </template>
                </avatar1>
            </template>
        </tabelList>

        <screen2 @close="router.go(-1)" v-if="route.name == 'add-course'" to="#modal2" defer>
            <createCourse @success="e => { router.go(-1); courses.unshift(e) }" />
        </screen2>
    </div>
</template>
<style scoped></style>