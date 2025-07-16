import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faTrashCan as farTrashCan,
    faXmarkCircle,
    faCircleCheck,
    faCircleXmark as farCircleXmark
} from "@fortawesome/free-regular-svg-icons";

import { faCircleXmark , faTriangleExclamation,faCircleInfo,faXmark} from "@fortawesome/free-solid-svg-icons";
import App from './App.vue'
import router from './router'
import "./interceptors/axios";



library.add(
    farTrashCan,
    faXmarkCircle,
    faCircleXmark,
    faCircleCheck,
    faTriangleExclamation,
    farCircleXmark,
    faCircleInfo,
    faXmark
)
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
