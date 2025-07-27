<script setup lang='ts'>
import tabelList from '@/components/list/tabelList.vue';
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import search_input from '@/components/form_components/search_input.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import createUser from './createUser.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import screen2 from '@/components/container/screen2.vue';
import avatar1 from '@/components/avatars/avatar1.vue';
import { getImageUrl } from '@/composabels/utilities';
import dropdown from '@/components/menus/dropdown.vue';
import axios from 'axios';
import image_picker from '@/components/form_components/image_picker.vue';
import UserCard from '@/components/cards/userCard.vue';

const router = useRouter()
const props = defineProps({
    type: {
        type: String,
        default: 'learner'
    }, id: {
        type: [String, Number],
        default: null
    }
})
const route = useRoute()
let users = ref([] as any[])
const cc = () => {
    window.alert('eom')
}

const handelDelete = (id: string | number, i: number) => {
    axios.delete('/user/' + id, { _showAllMessages: true }).then(res => {
        if (res.data.status != 'success') return;

        users.value.splice(i, 1)
        // window.alert(i)
    })
}

const pp = () => {
    users.value.push({
        id: ' res.data.data.id,',
        created_at: 'Just Now',
        image: 'imageUrl',
        name: 'formData.value.title'
    })
    console.log(users.value)
}

const handelEdited = (e: any) => {
    const index = users.value.findIndex(c => c.id == e.id);
    users.value[index] = {
        ...e, image: users.value[index].image
    }
    router.go(-1)
}

const showImagePicker = ref(false)

const handelImageChange = async (e: any) => {
    let blob = e.img;
    showImagePicker.value = false;
    let Url = URL.createObjectURL(e.img);
    if (await handelImageUpdate(blob)) {
        router.go(-1)
        // console.log(course.value.i);
        users.value[users.value.findIndex((e) => e.id == route.params.id)]['image'] = Url
        showImagePicker.value = false
    }
}
const handelImageUpdate = async (file: any) => {
    return axios.put('/user/image/' + route.params.id, { file }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }, _showAllMessages: true, _load: true
    }).then(res => {
        if (res.data.status != 'success') return

        return true
    })
}


const singleUser = ref({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    gender: '',
    image: '',
    description: '',
})


const getSingleUser = async (id: string) => {
    return axios.get('/user/' + id, { _load: true }).then(res => {
        if (res.data.status != 'success') return
        singleUser.value = res.data.data[0]
        singleUser.value.image = getImageUrl(singleUser.value.image)
        router.push({ name: 'user-user', params: { id } })
    })
}
</script>
<template>
    <div class="w-full flex flex-col gap-y-4 pt-10 ">
        <!-- {{ courses }} -->
        <!-- <buttonLoads @click="pp" type="button" class="sm:w-[200px]"></buttonLoads> -->
        <form @submit.prevent="" class=" w-full flex flex-row justify-between flex-wrap gap-7">
            <search_input />
            <router-link :to="{ name: 'add-user' }">
                <buttonLoads type="button" class="sm:w-[200px]">
                    <template #label>
                        <div class="flex gap-x-4 capitalize">
                            <FontAwesomeIcon :icon="['fas', 'plus']" />
                            {{ type == 'learners' ? 'Learner' : 'Admin' }}
                        </div>
                    </template>
                </buttonLoads>
            </router-link>
        </form>
        <tabelList beark-point="710px" class=" mt-2" @clicked="e => getSingleUser(e.id)" action-col
            @full-list="e => users = e" :listMapper="[
                { key: '_allItems', title: 'User', slotName: 'cc' },
                { key: 'email', title: 'Email address' },
                { key: 'createdAt', title: 'Date joined' },
                { key: 'gender', title: 'Gender' },
            ]" url="users">
            <template #cc="{ item, i }">
                <!-- {{ item }} -->
                <avatar1 :src="getImageUrl(item.image)">
                    <template #name>
                        {{ item.firstName }} {{ item.lastName }}
                    </template>
                </avatar1>
            </template>
            <template #action="{ item, i }">
                <dropdown @editimage="router.push({ name: 'edit-user-image', params: { id: item.id } })"
                    @edit="router.push({ name: 'edit-user', params: { id: item.id } })"
                    @delete="handelDelete(item.id, i)" :options="[
                        { icon: ['fas', 'pencil-alt'], label: 'Edit', emit: 'edit' },
                        { icon: ['fas', 'file-pen'], label: 'Edit Image', emit: 'editimage' },
                        { icon: ['far', 'trash-can'], label: 'Delete', emit: 'delete' }
                    ]" />
            </template>
        </tabelList>

        <screen2 @close="router.go(-1)"
            v-if="route.name == 'add-user' || route.name == 'edit-user' || route.name == 'edit-user-image' || route.name == 'user-user'"
            to="#modal2" defer>
            <!-- <Transition name="list1"> -->
                <createUser :type="type == 'admins' ? 'admin' : 'learner'"
                    v-if="route.name == 'add-user' || route.name == 'edit-user'" @editsuccess="handelEdited"
                    @success="e => { router.go(-1); users.unshift(e) }" />
                <image_picker v-else-if="route.name == 'edit-user-image'" :aspectRatio="1"
                    @crop="(e: any) => handelImageChange(e)" class="z-[1000] my-auto" />

                <UserCard @close="router.go(-1)" :objectMapper="[
                    { key: 'firstName', label: 'First Name' },
                    { key: 'lastName', label: 'Last Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'phone', label: 'Phone' },
                    { key: 'location', label: 'Location' },
                ]" :data="singleUser" :image="singleUser.image" :name="singleUser.firstName + ' ' + singleUser.lastName"
                    :email="singleUser.email" class=" w-min495 z-90 my-auto" v-else />
            <!-- </Transition> -->
        </screen2>
    </div>
</template>
<style scoped></style>