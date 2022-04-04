require('./bootstrap');

import { createApp, onMounted } from 'vue'
import LaravelVuePagination from 'laravel-vue-pagination';
import VueSweetalert2 from "vue-sweetalert2";

import userAuth from "./composables/auth";

import router from './routes/index';// toimport router we need to export it from js

const app = createApp({
    setup() {
        const { getUser } = userAuth()
        onMounted(getUser)
    }
})
app.use(router)
app.use(VueSweetalert2);
app.component('Pagination', LaravelVuePagination);
app.mount('#app')
