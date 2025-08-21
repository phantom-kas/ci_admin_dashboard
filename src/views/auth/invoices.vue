<script setup lang='ts'>
import tabelList from '@/components/list/tabelList.vue';
import search_input from '@/components/form_components/search_input.vue';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRoute, useRouter } from 'vue-router';
import { anyCurrency, debounce, getImageUrl } from '@/composabels/utilities';
import Avatar1 from '@/components/avatars/avatar1.vue';
import AvatarImage from '@/components/avatars/avatarImage.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import confrimComponent from '@/components/confrimComponent.vue';
import addinvoice from './invoice/addinvoice.vue';
import screen2 from '@/components/container/screen2.vue';
import axios from 'axios';
import Dropdown from '@/components/menus/dropdown.vue';
const router = useRouter()


const handelDelete = (id: string | number, i: number) => {
    // Emit an event to delete the invoice
    // emit('delete', { id, i });
    axios.delete('/invoice/' + id, { _showAllMessages: true }).then(res => {
        if (res.data.status != 'success') return;

        // window.alert(i)
        invoices.value.splice(invoices.value.findIndex((e) => e.id == id), 1);
        pl.value.splice(pl.value.findIndex((e) => e.id == id),1)
        showConfirm.value = false;

    });
}

const selected = ref({ id: '', i: 0 });
const showConfirm = ref(false);
const invoices = ref([] as any[]);
const pl = ref([] as any[]);


const route = useRoute();

const listKey = ref(0)
let listParams = { search: undefined as undefined | string }
const searchFn = debounce((e: string) => {

    listParams = { search: e }
    console.log(e)
    listKey.value += 1
}, 500);

</script>
<template>
    <div class="w-max1200 flex flex-col gap-y-4 pt-10">
        <form @submit.prevent="" class=" w-full flex flex-row justify-between flex-wrap gap-7">
            <search_input @input="e=>searchFn(e)"/>
            <router-link :to="{ name: 'add-invoice' }">
                <buttonLoads type="button" class="sm:w-[200px]">
                    <template #label>
                        <div class="flex gap-x-4 capitalize">
                            <FontAwesomeIcon :icon="['fas', 'plus']" />
                            Invoice
                        </div>
                    </template>
                </buttonLoads>
            </router-link>
        </form>
        <!-- {{ invoices }} -->
        <tabelList :key="listKey"  :params="listParams" @pagination-list="e => pl = e" @full-list="e => invoices = e" url="invoices" beark-point="710px"
            class=" mt-2" actionCol :listMapper="[
                { key: '_allItems', title: 'User', slotName: 'cc' },
                { key: 'track', title: 'Track' },
                // { key: 'id', title: 'ID' },
                { key: 'created_at', title: 'Date' },
                { key: 'amount', title: 'Amount', slotName: 'amt' },
                { key: 'paid', title: 'Paid' },
                { key: 'status', title: 'Status' },
            ]">
            <template #cc="{ item, i }">
                <!-- {{ item }} -->
                <Avatar1 :url="getImageUrl(item.image)">
                    <template #name>
                        {{ item.firstName }} {{ item.lastName }}
                    </template>
                </Avatar1>
            </template>

            <template #amount="{ item}">
                <span class=" w-full text-right"> {{ anyCurrency(item) }}</span>
            </template>
            <template #paid="{ item}">
                <span class=" w-full text-right"> {{ anyCurrency(item) }}</span>
            </template>
            <template #status="{ item }">


                <Dropdown v-if="item == 'pending'" :options="[
                    { label: 'Pending', icon: ['far', 'clock'], emit: 'pending' },
                    { label: 'Paid', icon: ['fas', 'check'], emit: 'paid' }]">
                    <template #btn>
                        <div class=" flex items-center gap-4">
                            <span
                                class="w-fit text-right capitalize py-1 px-2 font-[500] text-xs rounded-2xl flex items-center justify-center"
                                :class="{ ' bg-amber-400 text-amber-950': item == 'pending', ' bg-green-500 text-green-950': item == 'paid' }">
                                {{ item }}</span>

                            <FontAwesomeIcon :icon="['fas', 'chevron-down']" />
                        </div>
                    </template>
                </Dropdown>

                <span v-else
                    class="w-fit text-right capitalize py-1 px-2 font-[500] text-xs rounded-2xl flex items-center justify-center"
                    :class="{ ' bg-amber-400 text-amber-950': item == 'pending', ' bg-green-500 text-green-950': item == 'paid' }">
                    {{ item }}</span>
            </template>

            <template #action="{ item, i }">
                <button @click="showConfirm = true, selected = { id: item.id, i }" v-if="item.status != 'paid'"
                    class="text-red-500 hover:text-red-700 p-2 " @click.stop="$emit('delete', item)">
                    <FontAwesomeIcon size="xl" :icon="['far', 'trash-can']" />
                </button>

            </template>
        </tabelList>

        <confrimComponent @ok="handelDelete(selected.id, selected.i)" v-if="showConfirm" @close="showConfirm = false" />

        <screen2 @close="router.go(-1)" v-if="route.name == 'add-invoice'" to="#modal2" defer>
            <addinvoice @success="e => { router.go(-1), pl.unshift(e); invoices.unshift(e) }" />

        </screen2>
    </div>
</template>
<style scoped></style>