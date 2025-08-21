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
    email: '',
    password: '',
    validate: false
})

const auth = useAuthStore()
const router = useRouter()
const handelSubmit = (e:any) => {
    e.preventDefault();


    loading.value = true
    formData.value.validate = true
    auth.login(formData.value.email, formData.value.password)
        .finally(() => loading.value = false)
        .then((res) => {
            if (res.data.status != 'success') return

            router.push({ name: 'dashboard' })
        })
}


const emits = defineEmits(['loaded']);
onMounted(() => {
    formData.value.validate = false
    emits('loaded', {
        title: 'Admin Login',
        body: 'Login to Manage and Access the Dashboard Effortlessly.',
    })
})

const form = ref(null as null | HTMLFormElement)
const handelbtnClick = () => {
    formData.value.validate = true
    form.value?.requestSubmit()
}
</script>
<template>
    <form ref="form" :key="formData.validate ? '1' : '2'"
        class="flex flex-col justify-start items-start w-full validate" @submit.prevent="handelSubmit">
        <Input required type="email" :data="formData" name="email" label="Email" class=" w-full mb-6" />
        <Input required :data="formData" type="password" name="password" label="Password" class=" w-full" />
        <router-link :to="{ name: 'change_password' }" class=' text-blue font-[400] cursor-pointer mt-3 mb-3'>Forgot
            password?</router-link>
        <buttonLoads type="button" label="Login" @click="handelbtnClick()" class=" w-full mb-6" :isLoad="loading" />


        <span class=" font-[400] w-full text-center leading-4">
            Don't have an account? <router-link :to="{ name: 'signup' }"
                class=' text-blue font-[400] cursor-pointer'>Signup</router-link>
        </span>

    </form>
</template>
<style scoped></style>