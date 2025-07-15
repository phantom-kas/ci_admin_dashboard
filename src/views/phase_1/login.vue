<script setup lang="ts">
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import { onMounted, ref } from 'vue';
import Input from '@/components/form_components/input.vue';
import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';
const loading = ref(false)
const formData = useLocalStorage('registeration_from', {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confPassword: '',
    validate:false
})

const handelSubmit = () => {
    loading.value = !loading.value
    formData.value.validate = true
}

onMounted(()=>{
    formData.value.validate = false
})
</script>
<template>
    <form :key="formData.validate?'1':'2'" class="flex flex-col justify-start items-start w-full gap-y-6 validate" @submit.prevent="handelSubmit()">
        <Input required :data="formData" name="firstName" label="First name" class=" w-full" />
        <Input required :data="formData" name="lastName" label="Last name" class=" w-full" />
        <Input required type="email" :data="formData" name="email" label="Email" class=" w-full" />
        <Input required :data="formData" type="password" name="password" label="Password" class=" w-full" />
        <Input required :data="formData" type="password" name="confPassword" label="Confirm password" class=" w-full" />
        <buttonLoads @click="formData.validate = true" class=" w-full mt-3" :isLoad="loading" />
        <span class=" font-[500] w-full text-center leading-4">
            Already have an account? <span class=' text-blue font-[500] cursor-pointer'>Login</span>
        </span>
    </form>
</template>
<style scoped></style>