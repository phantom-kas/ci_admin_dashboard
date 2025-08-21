<script setup lang='ts'>
import paginationList from '@/components/list/paginationList.vue';
import { getImageUrl } from '@/composabels/utilities';
import { onMounted, ref, type PropType } from 'vue';
import avatarImage from '@/components/avatars/avatarImage.vue';
import rating from '@/components/rating.vue';
const props = defineProps({
    track: { type: Object as PropType<any> },
    id: {
        type: Object as PropType<any>
    }
})
const dispalyRatingData = ref(null as number | null)
const ratingData = ref({ rating: 0, review: '', loading: false })
const ratingDetailes = ref({} as { [key: string]: string | number })
onMounted(() => {
    dispalyRatingData.value = parseInt(props.track.total_ratings + '') / parseInt(props.track.num_rating + '')
    if (props.track.ratings_deatails)
        ratingDetailes.value = JSON.parse(props.track.ratings_deatails)
})
</script>
<template>


    <div class="  z-30 theme1cont p-8 ">
        <h1 class=" text-4xl font-[500] mb-6">
            <!-- {{ track }} -->
            {{ track.num_rating }} Review{{ parseInt(track.num_rating + '') != 1 ? 's' : '' }}
        </h1>
        <div class=" w-full flex flex-col gap-3 mb-8">
            <div v-for="i in 5" class=" w-full flex gap-2">
                {{ i }}
                <div class=" w-full relative flex  shadow-sm bg-neutral-200 dark:bg-neutral-600 rounded-sm">
                    <span
                        :style="{ width: ((parseInt(ratingDetailes[i] + '') / parseInt(track.num_rating) * 100) + '') + '%' }"
                        class="w-[0] py-0.5 h-full bg-amber-400 rounded-sm"></span>
                </div>
            </div>
        </div>
        <paginationList :params="{ track: id }" class="  w-full" component="div" url="reviews">
            <template #items="{ item, i }">
                <!-- {{ item }} -->
                <div
                    class="theme1cont dark:text-white1 text-black flex flex-col items-start justify-start theme1cont shadow-sm my-2 p-4 w-full">
                    <div class="flex gap-2">
                        <avatarImage :url="getImageUrl(item.image)" />
                        <span>{{ item.firstName }} {{ item.lastName }}</span>
                    </div>
                    <div>
                        <rating :rating="item.rating" />
                    </div>
                    <div class=" my-1 text-lg" v-html="item.review"></div>
                    <div class=" flex justify-end w-full ">
                        <span>{{  item.created_at }}</span>
                    </div>
                </div>
            </template>
        </paginationList>
    </div>

</template>
<style scoped></style>