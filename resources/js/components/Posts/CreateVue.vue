<template>
    To-do.
    <form @submit.prevent="storePost(post)">
        <!-- Title -->
        <div>
            <label for="post-title" class="block font-medium text-sm text-gray-700">
                Title
            </label>
            <input id="post-title" v-model="post.title" type="text" class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>

        <!-- Content -->
        <div class="mt-4">
            <label for="post-content" class="block font-medium text-sm text-gray-700">
                Content
            </label>
            <textarea id="post-content" v-model="post.content" class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        </div>

        <!-- Category -->
        <div class="mt-4">
            <label for="post-category" class="block font-medium text-sm text-gray-700">
                Category
            </label>
            <select id="post-category" v-model="post.category_id" class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="" selected>-- Choose category --</option>
                <option v-for="category in categories" :value="category.id">
                    {{ category.name }}
                </option>
            </select>
        </div>

        <!-- Buttons -->
        <div class="mt-4">
            <button class="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
    </form>
</template>

<script>
    import {ref, onMounted, reactive } from "vue";
    import useCategories from "../../composables/categories";
    import usePosts from "../../composables/posts";

    export default {
        setup() {
            const post = reactive({// just like ref
                title: '',
                content: '',
                category_id: '',
            })

            const {categories, getCategories } = useCategories();
            const {storePost } = usePosts();
            onMounted( () => {
                getCategories();
            });
            return { categories, post, storePost }
        }
    }
</script>
