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
const tracks = ref([] as any[])
const getracks = async () => {
    return axios.get('/tracks/options').then(res => {
        if (res.data.status != 'success') return

        res.data.data.forEach((element: any) => {
            tracks.value.push({ label: element.name, value: element.id })
        });
    })
}

const users = ref([] as any[])
const userArr = ref([] as any[])
const getUsers = async () => {
    return axios.get('/users/options').then(res => {
        if (res.data.status != 'success') return

        userArr.value = res.data.data;
        res.data.data.forEach((element: any) => {
            users.value.push({ label: element.firstName + ' ' + element.lastName, value: element.id })
        });
    })
}


const formData = ref({ price: '', track: '', user: '' });
const emit = defineEmits(['close', 'success', 'editSuccess'])
const loading = ref(false)

const handelUpload = async () => {
    loading.value = true
    return axios.post('/invoice/track', {
        trackId: formData.value.track,
        user: formData.value.user,
        price: parseInt(formData.value.price + '') * 100,
    }, { _showAllMessages: true }).finally(() => loading.value = false)
        .then(res => {
            if (res.data.status != 'success') return;

            let u = userArr.value.find((e) => e.id == formData.value.user);

            console.log('***************************************')
            console.log(u)
            console.log('***************************************')
            console.log('***' + res.data.data.invoiceId + ' **************')
            console.log('***************************************')
            emit('success', {
                ...u,
                id: res.data.data.invoiceId,
                // image: imageUrl,
                paid: 0,
                status: 'pending',
                amount: parseInt(formData.value.price + '') * 100,
                created_at: 'Just Now',
                track: tracks.value.find((e) => e.value == formData.value.track)['label'],
                __v: new Date().getTime()
            })


        })
}



const testKey = () => {
    formData.value = { track: '', price: '', user: '' }
    key.value = key.value + 1
}
const hasLoaded = ref(false)
onBeforeMount(async () => {
    await getracks()
    await getUsers()
    // hasLoaded.value = false

    hasLoaded.value = true
})

const route = useRoute()
const title = 'Add Invoice'
</script>
<template>
    <formContainer v-if="hasLoaded" :key="key" @submit="handelUpload()" @close="router.go(-1)" :title
        class="z-80 relative">

        <Input required :data="formData" class=" w-full" name="price" type="number" label="Amount In USD" />
        <select_input required :options="users" :data="formData" class=" w-full" name="user" label="Learner" />
        <select_input required :options="tracks" :data="formData" class=" w-full" name="track" label="Track" />

        <!-- {{ formData.description }} -->

        <buttonLoads :is-load="loading" class=" w-full mt-5 " label="Add Invoice" />
    </formContainer>
    <spinLinePules class=" my-auto" v-else />

</template>



<style scoped></style>