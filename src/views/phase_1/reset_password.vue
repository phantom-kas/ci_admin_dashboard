<script setup lang="ts">
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import { onMounted, ref } from 'vue';
import Input from '@/components/form_components/Input.vue';
import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useToastStore } from '@/stores/toast';
const loading = ref(false)
const formData = ref({
    password: '',
    confPassword: '',
    validate: false
})

const route = useRoute()
const router = useRouter()
const toast = useToastStore()
const handelSubmit = () => {

    if (formData.value.password != formData.value.confPassword) {
        toast.addToast("Passwords don't match ", 'error')
        return
    }
    loading.value = true
    formData.value.validate = true
    axios.put('reset_password', { token: route.query.token, newPassword: formData.value.password }, { _showAllMessages: true }).finally(() => {
        loading.value = false
    })
        .then(res => {
            if (res.data.status != 'success') return
            router.push({ name: 'login' })
        })
}

const emits = defineEmits(['loaded']);
onMounted(() => {
    formData.value.validate = false
    emits('loaded', {
        title: 'Admin Reset Password',
        body: 'Create new password',
    })
})


const form = ref(null as null | HTMLFormElement)
const handelbtnClick=()=>{
    formData.value.validate = true
    form.value?.requestSubmit()
}
</script>
<template>
    <form ref="form" :key="formData.validate ? '1' : '2'" class="flex flex-col justify-start items-start w-full validate"
        @submit.prevent="handelSubmit()">
        <Input required type="password" :data="formData" name="password" label="New password" class=" w-full mb-10" />
        <Input required type="password" :data="formData" name="confPassword" label="Confirm Password"
            class=" w-full mb-10" />

        <buttonLoads type="button" label="Reset password" @click="handelbtnClick()" class=" w-full mb-10" :isLoad="loading" />


        <span class=" font-[400] w-full text-center leading-4">
            Don't have an account? <router-link :to="{ name: 'signup' }"
                class=' text-blue font-[400] cursor-pointer'>Signup</router-link>
        </span>
    </form>
</template>
<style scoped></style>