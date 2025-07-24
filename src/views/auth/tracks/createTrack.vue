<script setup lang="ts">
import formContainer from '@/components/container/formContainer.vue';
import quill_input from '@/components/form_components/quill_input.vue';
import Input from '@/components/form_components/Input.vue';
import { useRouter } from 'vue-router';
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import screen2 from '@/components/container/screen2.vue';
import image_picker from '@/components/form_components/image_picker.vue';
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
const router = useRouter()

const key = ref(10)


const image = ref(null as { img: any } | null)
const showImagePicker = ref(false)
const imageUrl = ref('')
const formData = ref({ description: '', title: '', price: '', duration: '', instructor: '', file: '' as any });
const handelImageChange = (e: any) => { image.value = e, showImagePicker.value = false; imageUrl.value = URL.createObjectURL(e.img); console.log(e.img) }
const emit = defineEmits(['close', 'success'])

const loading = ref(false)
const handelUpload = () => {
    formData.value.file = image.value?.img
    loading.value = true
    axios.post('/track', formData.value, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        _showAllMessages: true
    }).finally(() => loading.value = false)
        .then(res => {
            if (res.data.status != 'success') return
            emit('success', {
                id:res.data.data.id,
                Instructor: formData.value.instructor,
                price: formData.value.price,
                created_at:'Just Now',
                duration:formData.value.duration,
                image: imageUrl,
                name:formData.value.title
            })
            formData.value = { description: '', title: '', price: '', duration: '', instructor: '', file: '' as any }
            key.value++
        });
}


const testKey = () => {
    formData.value = { description: '', title: '', price: '', duration: '', instructor: '', file: '' as any }
    key.value = key.value + 1
}
</script>
<template>
    <formContainer :key="key" @submit="handelUpload()" @close="router.go(-1)" title="Add New Track"
        class="z-80 relative">
        <!-- {{ key }} -->
        <!-- <button-loads type="button" @click="testKey()"></button-loads> -->
        <Input :data="formData" class=" w-full" name="title" label="Track name" />
        <Input :data="formData" class=" w-full" type="number" name="price" label="Price" />
        <Input :data="formData" class=" w-full" name="duration" label="Duration" />
        <Input :data="formData" class=" w-full" name="instructor" label="Instructor" />
        <div class="flex flex-col justify-center items-center w-max100 gap-y-4 mt-4 mx-auto">
            <img v-if=image :src="imageUrl" class=" w-full" alt="">
            <!-- {{ image?.img }} -->
            <buttonLoads type="button" class="flex flex-row gap-4 w-full" @click="showImagePicker = true">
                <FontAwesomeIcon size="2x" :icon="['fas', 'file-arrow-up']" />
                <span v-if="!image">Select Picture</span>
                <span v-else>Change Picture</span>
            </buttonLoads>
        </div>
        <quill_input @inputed="e => formData.description = e" placeholder="Description" />
        <!-- <Input class=" w-full" name="title"/> -->
        <buttonLoads :is-load="loading" class=" w-full mt-5 " label="Create track" />
    </formContainer>
    <screen2 Align="justify-center" :key="2" @close="showImagePicker = false" v-if="showImagePicker">
        <image_picker :aspectRatio="1.422" @crop="e => handelImageChange(e)" class="z-[1000] my-auto" />
    </screen2>
</template>



<style scoped></style>