<script setup lang='ts'>
import bar from '@/components/chats/bar.vue';
import Line from '@/components/chats/line.vue';
import input2 from '@/components/form_components/input2.vue';
import select2 from '@/components/form_components/select2.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const years = Array.from({ length: 41 }, (_, i) => {
    const year = 2000 + i;
    return { label: String(year), value: String(year) };
});

const data = ref({ year: new Date().getFullYear() + '', type: 'bar' })


const trackInome = ref({ values: [] as any, labels: [] as any })
const trackEnroled = ref({ values: [] as any, labels: [] as any })

const trackdataLoaded = ref(false)


const section2Key = ref(0)
const incomeValues =ref({ values: [] as any, labels: [] as any })
const enroled = ref({ values: [] as any, labels: [] as any })

const yearcount = (e: string) => {
    // console.log(e)
    axios.get('yearcount/' + e).then(res => {

        if (res.data.status != 'success') return

        console.log(res.data.data)
        console.log(incomeValues.value.values)
        incomeValues.value.values = []
        enroled.value.values = []
    
        for (let index = 0; index < 12; index++) {
            const monthStr = String(index+1).padStart(2, "0"); 
            const monthKey = `${e}-${monthStr}`;
            const existing = res.data.data.find((item: any) => item.month === monthKey);
            if (existing) {
                enroled.value.values.push(existing.learners_count)
                incomeValues.value.values.push(existing.income/100)
            } else {
                console.log(incomeValues.value.values)
                enroled.value.values.push(0)
                incomeValues.value.values.push(0)

            }
        }
        section2Key.value = section2Key.value + 1
    })
}
onMounted(() => {
    axios.get('track_chat').then(res => {
        if (res.data.status != 'success') return
        // trackInome.value = res.data.data
        for (let index = 0; index < res.data.data.length; index++) {
            const element: any = res.data.data[index];
            trackInome.value.labels.push(element.name)
            trackInome.value.values.push(element.income / 100)

            trackEnroled.value.labels.push(element.name)
            trackEnroled.value.values.push(element.num_enroled)

        }
        trackdataLoaded.value = true

    })

    yearcount(new Date().getFullYear() + '')
})

</script>
<template>

    <section class=" flex flex-col w-full pb-30 mt-10">
        <!-- {{ trackEnroled }} -->
        <select2 :data :icon="['fas', 'chart-column']" class=" mt-10 w-max300" name="type" label="Type" :options="[{ label: 'pie', value: 'pie' }, { label: 'bar', value: 'bar' }]
            " />
        <div :key="data.type" class="grid grid-cols-1 sm:grid-cols-2 w-full justify-between mt-6 gap-6 ">
            <div class="grow relative">
                <h1>Income (USD) </h1>
                <bar v-if="trackdataLoaded" :data="trackInome.values" :labels="trackInome.labels" :type="data.type"
                    class=" " />
            </div>

            <div class="grow relative">
                <h1>Learners</h1>
                <bar v-if="trackdataLoaded" :data="trackEnroled.values" :labels="trackEnroled.labels" :type="data.type"
                    class=" " />
            </div>
        </div>
        <!-- {{ data }} -->
        <!-- {{ income }} -->
        <select2 @inputed="(e: { value: string }) => (yearcount(e.value))" :data :icon="['far', 'calendar']"
            class=" mt-10 w-max300" type="year" name="year" label="Year" :options="years
                " />
                <!-- {{ enroled.values }}
                {{ incomeValues.values }}
                {{ incomeValues }} -->
        <div :key="section2Key" class="grid grid-cols-1 sm:grid-cols-2 w-full justify-between mt-10  gap-6 ">
            <div class="grow relative">
                <h1>Income for {{ data.year }} (USD)</h1>
                <Line :data="incomeValues.values" class=" " />
            </div>

            <div class="grow relative">
                <h1>learners for {{ data.year }}</h1>
                <Line :data="enroled.values" class=" " />
            </div>
        </div>
    </section>
</template>
<style scoped></style>