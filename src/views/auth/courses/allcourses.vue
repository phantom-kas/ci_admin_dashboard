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
import { debounce, getImageUrl } from '@/composabels/utilities';
import dropdown from '@/components/menus/dropdown.vue';
import axios from 'axios';
import image_picker from '@/components/form_components/image_picker.vue';
import IconSun from '@/components/icons/IconSun.vue';
const router = useRouter()
const route = useRoute()
let courses = ref([] as any[])
const cc = () => {
    window.alert('eom')
}

const handelDelete = (id: string | number, i: number) => {
    axios.delete('/course/' + id, { _showAllMessages: true }).then(res => {
        if (res.data.status != 'success') return;

        courses.value.splice(i, 1)
        // window.alert(i)
    })
}

const pp = () => {
    courses.value.push({
        id: ' res.data.data.id,',
        created_at: 'Just Now',
        image: 'imageUrl',
        name: 'formData.value.title'
    })
    console.log(courses.value)
}

const handelEdited = (e: any) => {
    const index = courses.value.findIndex(c => c.id == e.id);
    courses.value[index] = {
        trackName: e.track,
        title: e.name,
        image: courses.value[index].image,
        created_at: courses.value[index].created_at,
        id: e.id
    }
    // console.log(e)
    // console.log(index)
    // console.log( courses.value[index])
    router.go(-1)
}

const showImagePicker = ref(false)

const handelImageChange = async (e: any) => {
    let blob = e.img;
    showImagePicker.value = false;
    let Url = URL.createObjectURL(e.img);
    if (await handelImageUpdate(blob)) {
        router.go(-1)
        // console.log(course.value.i);
        courses.value[courses.value.findIndex((e) => e.id == route.params.id)]['image'] = Url
        showImagePicker.value = false
    }
}
const handelImageUpdate = (file: any) => {
    return axios.put('/course/image/' + route.params.id, { file }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }, _showAllMessages: true, _load: true
    }).then(res => {
        if (res.data.status != 'success') return

        return true
    })
}

const listKey = ref(0)
let listParams = { search: undefined as undefined | string }
const searchFn = debounce((e: string) => {

    // console.log(...e)
    listParams = { search: e }
    listKey.value += 1
}, 500);
</script>
<template>
    <div class="w-full flex flex-col gap-y-4 pt-10 ">
        <!-- {{ courses }} -->
        <!-- <buttonLoads @click="pp" type="button" class="sm:w-[200px]"></buttonLoads> -->
        <form @submit.prevent="" class=" w-full flex flex-row justify-between flex-wrap gap-7">
            <search_input @input="e=>searchFn(e)"/>
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
        <!-- {{ listParams }} -->
         
        <tabelList :params="listParams" :key="listKey" class=" mt-2" @clicked="cc" action-col @full-list="e => courses = e" :listMapper="[
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
            <template #action="{ item, i }">
                <dropdown @editimage="router.push({ name: 'edit-image', params: { id: item.id } })"
                    @edit="router.push({ name: 'edit-course', params: { id: item.id } })"
                    @delete="handelDelete(item.id, i)" :options="[
                        { icon: ['fas', 'pencil-alt'], label: 'Edit', emit: 'edit' },
                        { icon: ['fas', 'file-pen'], label: 'Edit Image', emit: 'editimage' },
                        { icon: ['far', 'trash-can'], label: 'Delete', emit: 'delete' }
                    ]" />
            </template>
        </tabelList>

        <screen2 @close="router.go(-1)"
            v-if="route.name == 'add-course' || route.name == 'edit-course' || route.name == 'edit-image'" to="#modal2"
            defer>
            <createCourse v-if="route.name == 'add-course' || route.name == 'edit-course'" @editSuccess="handelEdited"
                @success="e => { router.go(-1); courses.unshift(e) }" />
            <image_picker v-else :aspectRatio="1" @crop="(e: any) => handelImageChange(e)" class="z-[1000] my-auto" />

        </screen2>
    </div>
</template>
<style scoped></style>