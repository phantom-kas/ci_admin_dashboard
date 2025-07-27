<script setup lang="ts">
import formContainer from '@/components/container/formContainer.vue';
import quill_input from '@/components/form_components/quill_input.vue';
import Input from '@/components/form_components/Input.vue';
import { useRoute, useRouter } from 'vue-router';
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import screen2 from '@/components/container/screen2.vue';
import image_picker from '@/components/form_components/image_picker.vue';
import { onBeforeMount, onMounted, ref, type PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import select_input from '@/components/form_components/select_input.vue';

import axios from 'axios';
const router = useRouter()
const key = ref(10)
const image = ref(null as { img: any } | null)
const showImagePicker = ref(false)
const imageUrl = ref('')
const formData = ref({
    firstName: '',
    lastName: '',
    email: 0,
    password: '',
    location: '',
    phone: '',
    confPassword: '',
    gender: '',
    file: '' as any,
    description: '',
});
const handelImageChange = (e: any) => { image.value = e, showImagePicker.value = false; imageUrl.value = URL.createObjectURL(e.img); console.log(e.img) }
const emit = defineEmits(['close', 'success', 'editsuccess'])
const loading = ref(false)

const handelUpload = () => {
    if (route.name != 'add-user') {
        return handelEdit();
    }
    formData.value.file = image.value?.img
    loading.value = true
    axios.post('/user/' + props.type, { ...formData.value, confPassword: undefined }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        _showAllMessages: true
    }).finally(() => loading.value = false)
        .then(res => {
            if (res.data.status != 'success') return
            emit('success', {
                id: res.data.data.id,
                ...formData.value,
                image: imageUrl,
            })
            formData.value = {
                firstName: '',
                gender: '',
                lastName: '',
                email: 0,
                password: '',
                location: '',
                phone: '',
                confPassword: '',
                file: '' as any,
                description: '',
            }
            key.value++
        });
}

const handelEdit = async () => {
    loading.value = true
    return axios.put('/user/' + id.value, {
        firstName: formData.value['firstName'],
        lastName: formData.value['lastName'],
        description: formData.value['description'],
        phone: formData.value['phone'],
        location: formData.value['location'],
        gender: formData.value['gender'],
    }, { _showAllMessages: true })
        .finally(() => loading.value = false)
        .then(res => {
            if (res.data.status != 'success') return
            
            emit('editsuccess', {
                id: id.value,
                ...formData.value,
                image: imageUrl,
            })
        })
}


const hasLoaded = ref(false)
const getUser = () => {
    return axios.get('/user/' + id.value, { _load2: true })
}

const props = defineProps({
    id: {
        type: String,
        default: null
    },
    type: {
        type: Object as PropType<'learner' | 'admin'>,
        required: true
    }
})
const id = ref('' as string | null)
onMounted(async () => {
    if (props.id) {
        id.value = props.id
    } else if (route.params.id) {
        id.value = route.params.id as string
    } else {
        id.value = null
    }
    hasLoaded.value = false
    if (route.name == 'add-user') {
        hasLoaded.value = true
        return
    }
    await getUser().finally(() => {

    })
        .then(res => {
            if (res.data.status != 'success') return

            formData.value = res.data.data[0]
        })
    hasLoaded.value = true
})
const route = useRoute()



</script>
<template>
    <formContainer v-if="hasLoaded" :key="key" @submit="handelUpload()" @close="router.go(-1)"
        :title="!id ? 'Add User' : 'Edit User'" class="z-80 relative">
        <div v-if="!id" class="flex flex-col justify-center items-center w-max100 gap-y-4 mt-4 mx-auto">
            <img v-if=image :src="imageUrl" class=" w-full rounded-[50%]" alt="">
            <!-- {{ image?.img }} -->
            <buttonLoads type="button" class="flex flex-row gap-4 w-full" @click="showImagePicker = true">
                <FontAwesomeIcon size="2x" :icon="['fas', 'file-arrow-up']" />
                <span v-if="!image">Select Picture</span>
                <span v-else>Change Picture</span>
            </buttonLoads>
        </div>
        <Input :data="formData" class=" w-full" name="firstName" label="First Name" />
        <Input :data="formData" class=" w-full" name="lastName" label="Last Name" />


        <select_input placeholder="Select your gender"
            :options="[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]" :data="formData"
            class=" w-full" name="gender" label="Gender" />

        <Input v-if="!id" :data="formData" class=" w-full" name="email" type="email" label="Email" />
        <Input :data="formData" class=" w-full" name="phone" label="Phone" />
        <Input :data="formData" class=" w-full" name="location" label="Location" />
        <Input v-if="!id" :data="formData" class=" w-full" name="password" label="Password" />
        <Input v-if="!id" :data="formData" class=" w-full" name="confPassword" label="Confirm Password" />
        <quill_input :value="formData.description" @inputed="e => formData.description = e"
            placeholder="Description / Bio" />
        <buttonLoads :is-load="loading" class=" w-full mt-5 " :label="!id ? 'Create track' : 'Edit Track'" />
    </formContainer>
    <screen2 Align="justify-center" :key="2" @close="showImagePicker = false" v-if="showImagePicker">
        <image_picker :aspectRatio="1" @crop="e => handelImageChange(e)" class="z-[1000] my-auto" />
    </screen2>
</template>
<style scoped></style>

<!-- //app.config.isCustomElement =  -->