<script setup lang="ts">
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import { onMounted, ref } from 'vue';
import Input from '@/components/form_components/Input.vue';
import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';
import { useToastStore } from '@/stores/toast';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
const loading = ref(false)
const auth = useAuthStore()
const router = useRouter()
const formData = useLocalStorage('registeration_from', {
    firstName: '',
    lastName: '',
    email: '',
    validate: false
})

const passwords = ref({
    password: '',
    confPassword: '',
    validate: false
})

const toast = useToastStore()

const handelSubmit = () => {
    // window.alert('submitting')
    loading.value = true
    formData.value.validate = true
    if (passwords.value.password !== passwords.value.confPassword) {
        toast.addToast('Passwords do not match', 'error', 's')
        loading.value = false
        return
    }
    axios.post('user/admin', { ...formData.value, password: passwords.value.password, validate: undefined }, { _load: true, _showAllMessages: true })
        .finally(() => loading.value = false)
        .then(async (res) => {
            loading.value = true
            if (res.data.status != 'success') return false

            return await auth.login(formData.value.email, passwords.value.password)
            
        })
        .then((res) => {
            loading.value = false
            if (!res) return

            if (res.data.status != 'success') return false


            formData.value = {
                firstName: '',
                lastName: '',
                email: '',
                validate: false
            }
            passwords.value = {
                password: '',
                confPassword: '',
                validate: false
            }
            formKey.value++

            console.log(res)

            if (res.data.data.isVerified != 1) {
                router.push({ name: 'enter_verification_code' })
            }
        })
}

const formKey = ref(0)
const emits = defineEmits(['loaded']);
onMounted(() => {
    formData.value.validate = false
    emits('loaded', {
        title: 'Admin Sign up',
        body: 'Create Your  Account to Manage and Access the Dashboard Effortlessly.',
    })
})


const form = ref(null as null | HTMLFormElement)
const handelbtnClick=()=>{
    formData.value.validate = true
     passwords.value.validate = true
    form.value?.requestSubmit()
}
</script>
<template>
    <form ref="form" :key="formData.validate ? '1' : '2' + formKey"
        class="flex flex-col justify-start items-start w-full gap-y-6 validate" @submit.prevent="handelSubmit()">
        <Input required :data="formData" name="firstName" label="First name" class=" w-full" />
        <Input required :data="formData" name="lastName" label="Last name" class=" w-full" />
        <Input required type="email" :data="formData" name="email" label="Email" class=" w-full" />
        <Input required type="tel" :data="formData" name="phone" label="Phone" class=" w-full" />
        <Input required :data="passwords" type="password" name="password" label="Password" class=" w-full" />
        <Input required :data="passwords" type="password" name="confPassword" label="Confirm password"
            class=" w-full" />
        <buttonLoads label="Sign Up" @click="handelbtnClick()" class=" w-full mt-3"
            :isLoad="loading" />
        <span class=" font-[400] w-full text-center leading-4">
            Already have an account? <router-link :to="{ name: 'login' }"
                class=' text-blue font-[400] cursor-pointer'>Login</router-link>
        </span>
    </form>
</template>
<style scoped></style>