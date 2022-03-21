import {createRouter, createWebHistory} from "vue-router";
import PostsIndex from '../components/Posts/Index'
import PostsCreate from '../components/Posts/CreateVue'

const routes = [
    {
        path: '/',
        name: 'posts.index',
        component: PostsIndex },
    {
        path: '/posts/create',
        name: 'posts.create',
        component: PostsCreate
    },
];

// const router = createRouter({
export default createRouter({
    history: createWebHistory(),
    routes
})
