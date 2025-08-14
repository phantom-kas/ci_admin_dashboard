<script setup lang='ts'>
import dropdown from '@/components/menus/dropdown.vue';
import { anyCurrency, getImageUrl } from '@/composabels/utilities';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref } from 'vue';
import spinLinePules from '@/components/spinners/spinLinePules.vue'
import { useRoute, useRouter } from 'vue-router';
import screen2 from '@/components/container/screen2.vue';
import createTrack from './createTrack.vue';
import confrimComponent from '@/components/confrimComponent.vue';
import image_picker from '@/components/form_components/image_picker.vue';
import avatar1 from '@/components/avatars/avatar1.vue';
import closeRow from '@/components/container/closeRow.vue';
const props = defineProps({
    id: {
        type: String
    },

})

const track = ref({} as { [key: string]: string | number })
const courses = ref([] as any[])
const hasLoaded = ref(false)
onMounted(() => {
    axios.get('/track-courses/' + props.id).then(res => {
        if (res.data.status != 'success') return

        courses.value = res.data.data.courses
        track.value = res.data.data.track[0]

        setTimeout(() => {

        }, 1000);

        hasLoaded.value = true
    })
})

const router = useRouter()
const route = useRoute()
const showConfirm = ref(false)

const handelDelete = () => {
    axios.delete('/track/' + track.value.id, { _showAllMessages: true }).finally(() => { }).then(res => {
        if (res.data.status != 'success') return

        showConfirm.value = false
        console.log(track.value)

        router.go(-1)
        // console.log(tracks.value)
        // console.log(tracks)
        // tracks.value.splice(track.value.i, 1)
    })
}
const showImagePicker = ref(false)
const handelImageUpdate = (file: any) => {
    return axios.put('/track/image/' + route.params.id, { file }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }, _showAllMessages: true, _load: true
    }).then(res => {
        if (res.data.status != 'success') return

        return true
    })
}
const handelImageChange = async (e: any) => {
    let blob = e.img;
    showImagePicker.value = false;
    let Url = URL.createObjectURL(e.img);
    if (await handelImageUpdate(blob)) {
        router.go(-1)
        console.log(track.value.i);
        track.value.image = Url
        showImagePicker.value = false
    }
}

const key = ref(0)
const handelEdit = (e: any) => {
    console.log(track.value)
    // track.value = {
    //     id: track.value.id,
    //     price: e.price,
    //     name: e.name,
    //     image: track.value.url,
    //     duration: e.duration,
    //     courses: track.value.courses,
    //     num_courses: track.value.num_courses,
    //     Instructor: e.Instructor,
    //     created_at: 'Just Now',
    // }
    track.value.Instructor = e.Instructor
    track.value.duration = e.duration
    track.value.description = e.description
    track.value.name = e.name
    track.value.price = e.price
    key.value = key.value++
    // window.alert('e')
    // console.log(tracks.value[track.value.i])
    router.go(-1)
}
</script>
<template>
    <!-- {{ track }} -->
    <div v-if="hasLoaded" class="w-[min(100%,1200px)] flex flex-col  mx-auto pb-11">
        <div class=" flex justify-start items-end py-4 gap-12">
            <h1 :key="key" class=" text-[40px] font-[600] text-4xl">{{ track.name }}</h1>

        </div>
        <ul class="flex border-b dark:border-b-white w-full mb-4">
            <li class="">
                <router-link :to="{ name: 'track', params: { id } }"
                    class="dark:bg-black not-dark:bg-white inline-block py-2 px-4  ">
                    Overview</router-link>
            </li>
            <li class="mr-1">
                <router-link :to="{ name: 'track-users' }"
                    class="dark:bg-black  not-dark:bg-white inline-block py-2 px-4  hover:text-blue "
                    href="#">Learners</router-link>
            </li>
            <li class="mr-1">
                <router-link :to="{ name: 'reviews' }"
                    class="dark:bg-black  not-dark:bg-white inline-block py-2 px-4  hover:text-blue "
                    href="#">Reviews</router-link>
            </li>
            <dropdown class=" text-sm" @editImage="router.push({ 'name': 'edit-track-image-track' })"
                @edit="router.push({ name: 'edit-track-track' })" @delete="showConfirm = true" :options="[
                    { icon: ['fas', 'pencil-alt'], label: 'Edit', emit: 'edit' },
                    { icon: ['fas', 'file-pen'], label: 'Edit Image', emit: 'editImage' },
                    { icon: ['far', 'trash-can'], label: 'Delete', emit: 'delete' }
                ]">
                <template #btn>
                    <span class=" mr-2">More</span>
                    <FontAwesomeIcon :icon="['fas', 'chevron-down']" />
                </template>
            </dropdown>
        </ul>
        <RouterView v-if="route.name != 'track'"   :id :track />

        <div :key="key" v-if="route.name == 'track'" class="w-[min(100%,742px)] flex flex-col mx-auto">
            <img :src="getImageUrl(track.image as string)" class=" w-full rounded-t-2xl" alt="">
            <div class=" w-full flex flex-col p-6 gap-y-5 py-11 ">

                <div class=" flex justify-start flex-wrap w-full items-center">
                    <div class=" flex gap-x-4 text-sm items-center">
                        <span class=""> <font-awesome-icon :icon="['far', 'calendar']" />
                            {{ track.duration }}</span>
                        <span class=" mt-1"> <font-awesome-icon :icon="['far', 'user']" />
                            {{ track.Instructor }}</span>
                    </div>

                    <span class=" ml-auto text-2xl font-[400]"> {{ anyCurrency(track.price) }}</span>
                </div>
                <div class=" flex justify-start flex-wrap w-full items-center  ">
                    <div class=" flex gap-x-4 text-[12px]  cursor-pointer">
                        <span v-for="course in courses" class="" @click="router.push({ name: 'track-courses' })">
                            {{ course.title }}
                        </span>
                    </div>
                    <div class=" ml-auto">
                        Ratings
                    </div>
                </div>
                <div v-html="track.description" class=" w-full text-sm">

                </div>

            </div>
        </div>
    </div>

    <div v-else-if="!hasLoaded"
        class=" mx-auto my-auto flex items-center justify-center p-6 bg-blue rounded-4xl dark:bg-[none]">
        <spinLinePules />
    </div>

    <screen2 @close="router.go(-1)"
        v-if="route.name == 'edit-track-track' || route.name == 'edit-track-image-track' || route.name == 'track-courses'"
        to="#modal2" defer>
        <createTrack :id @editsuccess="(e: any) => handelEdit(e)" v-if="route.name == 'edit-track-track'" />
        <div v-else-if="route.name == 'track-courses'"
            class=" w-min495 p-6 flex flex-row z-[1000] my-auto theme1cont gap-6 flex-wrap">
            <closeRow @close="router.go(-1)" />
            <h1 class=" text-4xl font-[600] w-full">Courses</h1>
            <transition-group name="list">
                <div v-for="item, i in courses" class=" theme1cont p-1.5 rounded-2xl px-4 shadow-sm">
                    <avatar1 :src="getImageUrl(item.image)"><template #name>{{ item.title }}</template></avatar1>
                </div>
            </transition-group>

        </div>
        <image_picker v-else :aspectRatio="1.422" @crop="(e: any) => handelImageChange(e)" class="z-[1000] my-auto" />

    </screen2>
    <confrimComponent @ok="handelDelete" v-if="showConfirm" @close="showConfirm = false" />
</template>
<style scoped>
/* .trackwdith{
        width: min(742px);
    } */
@reference "../../../assets/css/main.css";


a.router-link-exact-active {
    @apply rounded-t not-dark:border-x-black not-dark:border-t-black border-x border-t dark:border-t-white3 dark:border-x-white3 -mb-px mr-1
}
</style>