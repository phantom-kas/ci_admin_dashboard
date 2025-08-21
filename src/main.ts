import './assets/css/main2.css'

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
    faUser,
    faClock,
    
} from "@fortawesome/free-regular-svg-icons";

import { faChevronDown,faFilePen, faPencilAlt, faEllipsis, faTrashCan, faCircleXmark, faTrash, faArrowsUpToLine, faFileArrowUp, faPlus, faMagnifyingGlass, faBars, faTriangleExclamation, faCircleInfo, faXmark, faMoon, faDesktopAlt, faDesktop, faSun, faCheck, faLock, faPerson, faPhone, faMapPin, faLocationDot, faChartColumn } from "@fortawesome/free-solid-svg-icons";
import App from './App.vue'
import router from './router'
import "./interceptors/axios";
// import {faLofarLocck as farLock} from '@fortawesome/free-regular-svg-icons'


library.add(
    faFilePen,
    faUser,
    faLock,
// farLock, 
faPerson,
faMapPin,
faLocationDot,
faPhone,
    faClock,
    faCheck,
    faEllipsis,
    faTrashCan,
    faPencilAlt,
    faChevronDown,
    faTrash,
    faFileArrowUp,
    farTrashCan,
    faArrowsUpToLine,
    faPlus,
    faCalendar,
    faChartColumn,
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


