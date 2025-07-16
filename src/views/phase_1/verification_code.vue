<script setup lang="ts">
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import { onMounted, ref } from 'vue';
import Input from '@/components/form_components/Input.vue';
import axios from 'axios';
import { useToastStore } from '@/stores/toast';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const toast = useToastStore()
const loading = ref(false)
const formData = ref({
    token: '',
    validate: false
})
const router = useRouter()
const auth = useAuthStore()
const handelSubmit = () => {
    loading.value = !loading.value
    formData.value.validate = true
    axios.post('verify_email', { ...formData.value, validate: undefined }, { _load: true, _showAllMessages: true })
        .finally(() => loading.value = false).then(res => {
            if (res.data.status != 'success') return false
            router.push({ name: 'dashboard' })
        })
}

const emits = defineEmits(['loaded']);
onMounted(() => {
    formData.value.validate = false
    emits('loaded', {
        title: 'OTP verification',
        body: 'Enter the verification code we sent to your ' + auth.userInfo.email,
    })
})


const resendCode = () => {
    axios.get('send_verify_email',  { _load: true, _showAllMessages: true })
        
}
</script>
<template>
    <form :key="formData.validate ? '1' : '2'" class="flex flex-col justify-start items-start w-full validate"
        @submit.prevent="handelSubmit()">
        <!-- <Input required type="email" :data="formData" name="email" label="Email" class=" w-full mb-6" /> -->
        <Input required :data="formData" type="text" name="token" label="Code" class=" w-full mb-6" />

        <buttonLoads label="Verify" @click=" formData.validate = true" class=" w-full mb-6" :isLoad="loading" />


        <span class=" font-[400] w-full text-center leading-4">
            Didn't you receive the OPT? <span @click="resendCode()" :to="{ name: 'signup' }"
                class=' text-blue font-[400] cursor-pointer'> Resesnd OTP</span>
        </span>

    </form>
</template>
<style scoped></style>