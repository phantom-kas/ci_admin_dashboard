<script setup lang="ts">
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import { onMounted, ref } from 'vue';
import Input from '@/components/form_components/Input.vue';
import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';
import { useRouter } from 'vue-router';
const loading = ref(false)
const formData = ref({

    email: '',

    validate: false
})


const router = useRouter()
const handelSubmit = () => {
    loading.value = true
    formData.value.validate = true


    axios.get('generate_reset_password_token', { params: { email: formData.value.email, link: window.location.origin + '/reset_password' }, _showAllMessages: true })
    .finally(()=>loading.value = false)
    .then((res) => {
        if (res.data.status != 'success') return


        // router.push({ name: 'reset_password' })
    })
}

const emits = defineEmits(['loaded']);
onMounted(() => {
    formData.value.validate = false
    emits('loaded', {
        title: 'Admin Reset Password',
        body: 'Enter your email to reset your password',
    })
})


</script>
<template>
    <form :key="formData.validate ? '1' : '2'" class="flex flex-col justify-start items-start w-full validate"
        @submit.prevent="handelSubmit()">
        <Input required type="email" :data="formData" name="email" label="Email" class=" w-full mb-10" />
        <!-- {{ w }} -->
        <buttonLoads label="Reset password" @click="formData.validate = true" class=" w-full mb-10" :isLoad="loading" />


        <span class=" font-[400] w-full text-center leading-4">
            Don't have an account? <router-link :to="{ name: 'signup' }"
                class=' text-blue font-[400] cursor-pointer'>Signup</router-link>
        </span>
    </form>
</template>
<style scoped></style>