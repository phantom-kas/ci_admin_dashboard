<script setup lang="ts">
import formContainer from '@/components/container/formContainer.vue';
import quill_input from '@/components/form_components/quill_input.vue';
import Input from '@/components/form_components/Input.vue';
import { useRoute, useRouter } from 'vue-router';
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import screen2 from '@/components/container/screen2.vue';
import image_picker from '@/components/form_components/image_picker.vue';
import { onBeforeMount, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import select_input from '@/components/form_components/select_input.vue';
import { errorMessages } from 'vue/compiler-sfc';
import spinLinePules from '@/components/spinners/spinLinePules.vue';
const props = defineProps({
    i: {
        tpe: Number,
        default: 0
    },
})
const router = useRouter()
const key = ref(10)
const image = ref(null as { img: any } | null)
const tracks = ref([] as any[])
const getracks = async () => {
    return axios.get('/tracks/options').then(res => {
        if (res.data.status != 'success') return

        res.data.data.forEach((element: any) => {
            tracks.value.push({ label: element.name, value: element.id })
        });
    })
}
const showImagePicker = ref(false)
const imageUrl = ref('')
const formData = ref({ description: '', title: '', file: '' as any, track: '' });
const handelImageChange = (e: any) => { image.value = e, showImagePicker.value = false; imageUrl.value = URL.createObjectURL(e.img); console.log(e.img) }
const emit = defineEmits(['close', 'success', 'editSuccess'])
const loading = ref(false)
const handelUpload = () => {
    if (route.name != 'add-course') {
        handelEdit()
        return
    }
    formData.value.file = image.value?.img
    loading.value = true
    axios.post('/course', formData.value, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        _showAllMessages: true
    }).finally(() => loading.value = false)
        .then(res => {
            if (res.data.status != 'success') return
            emit('success', {
                id: res.data.data.id,
                created_at: 'Just Now',
                image: imageUrl,
                title: formData.value.title,
                trackName: tracks.value.find((e) => e.value == formData.value.track)['label']
            })
            formData.value = { track: '', description: '', title: '', file: '' as any }
            key.value++
        });
}


const handelEdit =async () => {
    loading.value = true
    return axios.put('/course/' + route.params.id,{
        track:formData.value.track,
        title:formData.value.title,
        description:formData.value.description,
    },{_showAllMessages:true}).finally(() => loading.value = false)
    .then(res => {
        if (res.data.status != 'success') return
        emit('editSuccess', {
            id:route.params.id,
            image: imageUrl,
            name: formData.value.title,
            track: tracks.value.find((e) => e.value == formData.value.track)['label'],
            __v: new Date().getTime()
        })
    })
}



const testKey = () => {
    formData.value = { track: '', description: '', title: '', file: '' as any }
    key.value = key.value + 1
}
const hasLoaded = ref(false)
onBeforeMount(async () => {
    await getracks()
    // hasLoaded.value = false
    if (route.name == 'edit-course') {
        await axios.get('/course/' + route.params.id).then(res => {
            if (res.data.status != 'success') return
            formData.value.description = res.data.data[0].description
            formData.value.title = res.data.data[0].title
            formData.value.track = res.data.data[0].track
        })
    }
    hasLoaded.value = true
})

const route = useRoute()
const title = route.name == 'add-course' ? 'Add New Course' : 'Edit Course'
</script>
<template>
    <formContainer v-if="hasLoaded" :key="key" @submit="handelUpload()" @close="router.go(-1)" :title
        class="z-80 relative">
        <!-- {{ key }} -->
        <!-- <button-loads type="button" @click="testKey()"></button-loads> -->
        <!-- {{mode }} {{ id }} -->
        <Input :data="formData" class=" w-full" name="title" label="Title" />
        <select_input :options="tracks" :data="formData" class=" w-full" name="track" label="Track" />
        <div v-if="route.name == 'add-course'"
            class="flex flex-col justify-center items-center w-max300 gap-y-4 mt-4 mx-auto">
            <img v-if=image :src="imageUrl" class=" w-full" alt="">
            <!-- {{ image?.img }} -->
            <buttonLoads type="button" class="flex flex-row gap-4 w-full" @click="showImagePicker = true">
                <FontAwesomeIcon size="2x" :icon="['fas', 'file-arrow-up']" />
                <span v-if="!image">Select Picture</span>
                <span v-else>Change Picture</span>
            </buttonLoads>
        </div>
        <!-- {{ formData.description }} -->
        <quill_input :value="formData.description" @inputed="e => formData.description = e" placeholder="Description" />
        <!-- <Input class=" w-full" name="title"/> -->
        <buttonLoads :is-load="loading" class=" w-full mt-5 " :label="route.name == 'add-course' ? 'Create course':'Edit Course'" />
    </formContainer>
    <spinLinePules class=" my-auto" v-else />
    <screen2 Align="justify-center" :key="2" @close="showImagePicker = false" v-if="showImagePicker">
        <image_picker :aspectRatio="1" @crop="e => handelImageChange(e)" class="z-[1000] my-auto" />
    </screen2>
</template>



<style scoped></style>