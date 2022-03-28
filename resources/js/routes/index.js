import {createRouter, createWebHistory} from "vue-router";
import PostsIndex from '../components/Posts/Index'
import PostsCreate from '../components/Posts/CreateVue'
import PostsEdit from '../components/Posts/EditVue'

import AuthenticatedLayout from '../layouts/Authenticated';
import GuestLayout from '../layouts/Guest';
import Login from '../components/Login';

const routes = [
    {
        component: GuestLayout,
        children:[
            {
                path: '/login',
                name: 'login',
                component: Login,
            }
        ]
    },
    {
      component: AuthenticatedLayout,
      children: [
          {
              path: '/posts',
              name: 'posts.index',
              component: PostsIndex,
              meta: {title: 'Posts'}
          },
          {
              path: '/posts/create',
              name: 'posts.create',
              component: PostsCreate,
              meta: {title: 'Add new post'}
          },
          {
              path: '/posts/edit/:id',
              name: 'posts.edit',
              component: PostsEdit,
              meta: {title: 'Edit Post'}
          },
      ]
    },

];

// const router = createRouter({
export default createRouter({
    history: createWebHistory(),
    routes
})
