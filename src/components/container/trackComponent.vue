<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { PropType } from 'vue';

defineProps({
    track: {
        type: Object as PropType<{
            duration: string,
            title: string,
            courses: string[],
            url:string
        }>,
        default: {
            title: 'Data Science',
            duration: '12 weeks',
            courses: ['NodeJs', 'ReactJs'],
            url:'../../assets/images/t1.png'
        },
    }
})

const courseStlye = (c: string) => c.toLocaleLowerCase()
</script><template>
    <div class="flex flex-col items-start justify-center  overflow-hidden rounded-t-2xl theme1cont">
        <img :src="track.url" alt="">
        <div class="p-5 flex flex-col gap-y-3">
            <h2 class=" text-[18px] font-[600]">{{ track.title }}</h2>
            <span class=""> <font-awesome-icon :icon="['far', 'calendar']" />
                {{ track.duration }}</span>
            <div class="w-full flex flex-row justify-start items-center gap-x-4 mt-2">
                <span v-for="course in track.courses" :key="course" :class="courseStlye(course)"
                    class="  rounded-xl flex items-center justify-center bg-BlueLightest text-green-deep font-[500] text-xs py-1 px-5">
                    {{ course }}
                </span>


            </div>
        </div>


    </div>
</template>


<style scoped>
@import "tailwindcss";

.nodejs {
    background: #ECFDF3;
    background: rgba(114, 117, 116, 0.445);
    color: #027A48;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }
}

.reactjs {
    color: #6941C6;
    background: #F3F0FB;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }
}

.azure {
    color: #026AA2;
    background: #F0F9FF;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }
}

.aws {
    color: #363F72;
    background: #F8F9FC;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }
}

.powerb1 {
    color: #C11574;
    background: #F7EDF6;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }
}

.python {
    color: #175CD3;
    background: #E9F3FB;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }

}

.figma {
    background: #FFF4ED;
    color: #B93815;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }

}

.sketch {
    background: #FFF1F3;
    color: #C01048;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }

}
</style>