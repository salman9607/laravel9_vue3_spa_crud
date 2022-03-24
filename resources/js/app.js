require('./bootstrap');

import { createApp } from 'vue'
import App from './layouts/App'
import LaravelVuePagination from 'laravel-vue-pagination';
import VueSweetalert2 from "vue-sweetalert2";

import router from './routes/index';// toimport router we need to export it from js

const app = createApp(App)
app.use(router)
app.use(VueSweetalert2);
app.component('Pagination', LaravelVuePagination);
app.mount('#app')
