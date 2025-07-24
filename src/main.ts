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
    faCalendar,
    
} from "@fortawesome/free-regular-svg-icons";

import {faChevronDown, faCircleXmark,faTrash,faArrowsUpToLine,faFileArrowUp, faPlus,faMagnifyingGlass ,faBars, faTriangleExclamation,faCircleInfo,faXmark,faMoon,faDesktopAlt,faDesktop,faSun} from "@fortawesome/free-solid-svg-icons";
import App from './App.vue'
import router from './router'
import "./interceptors/axios";



library.add(
    faChevronDown,
    faTrash,
    faFileArrowUp,
    farTrashCan,
    faArrowsUpToLine,
    faPlus,
    faCalendar,
    faMagnifyingGlass,
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
