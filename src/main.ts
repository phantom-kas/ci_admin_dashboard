import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faTrashCan as farTrashCan,
    faXmarkCircle,
    faCircleCheck,
    faCircleXmark as farCircleXmark,
    faSun as farSun,
    faCalendar
} from "@fortawesome/free-regular-svg-icons";

import { faCircleXmark ,faBars, faTriangleExclamation,faCircleInfo,faXmark,faMoon,faDesktopAlt,faDesktop,faSun} from "@fortawesome/free-solid-svg-icons";
import App from './App.vue'
import router from './router'
import "./interceptors/axios";



library.add(
    farTrashCan,
    faCalendar,
    faDesktop,
    faDesktopAlt,
    faBars,
    faMoon,
    faXmarkCircle,
    faSun,
    faCircleXmark,
    farSun,
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
