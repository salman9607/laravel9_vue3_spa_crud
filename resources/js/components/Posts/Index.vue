<template>
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <div class="min-w-full align-middle">
            <div class="mb-4">
                <select v-model="selectedCategory" class="block mt-1 w-full sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="" selected>-- Filter by category --</option>
                    <option v-for="category in categories" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
        </div>
    <table class="min-w-full divide-y divide-gray-200 border">
        <thead>
        <tr>
            <th class="px-6 py-3 bg-gray-50 text-left">
<!--                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>-->
                <div class="flex flex-row items-center justify-between cursor-pointer" @click="updateOrdering('id')">
                    <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider" :class="{ 'font-bold text-blue-600': orderColumn === 'id' }">
                        ID
                    </div>
                    <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'id',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'id',
                                }">&uarr;</span>
                        <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'id',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'id',
                                }">&darr;</span>
                    </div>
                </div>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
<!--                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</span>-->
                <div class="flex flex-row items-center justify-between cursor-pointer" @click="updateOrdering('title')">
                    <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider" :class="{ 'font-bold text-blue-600': orderColumn === 'title' }">
                        Title
                    </div>
                    <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'title',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'title',
                                }">&uarr;</span>
                        <span :class="{
                            'text-blue-600': orderDirection === 'desc' && orderColumn === 'title',
                            'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderDirection === 'title'
                        }">&darr;</span>
                    </div>
                </div>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</span>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left">
                <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created at</span>
            </th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 divide-solid">
        <tr v-for="post in posts.data"><!--.data is using for pagination-->
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                {{post.id}}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{post.title}}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{post.category}}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{post.content}}</td>

            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">{{post.created_at}}</td>
        </tr>
        </tbody>
    </table>
<!--    <Pagination :data="posts" @pagination-change-page="getPosts"></Pagination>-->
    <Pagination :data="posts" @pagination-change-page="page => getPosts(page, selectedCategory)"></Pagination>
    </div>
</template>

<script>
    import  usePosts from '../../composables/posts';
    import  useCategories from '../../composables/categories';
    import { ref, onMounted, watch } from 'vue';//watch :=> watch for any changes

    // export default {
    //     setup() {
    //         const selectedCategory = ref('');
    //         const {posts, getPosts} = usePosts();
    //         const {categories, getCategories} = useCategories();
    //         onMounted(() => {
    //             getPosts();
    //             getCategories();
    //         });
    //
    //         watch(selectedCategory, (current, previous) => {
    //            getPosts(1, current);
    //         });
    //         // return {posts}
    //         return {posts, getPosts, categories, selectedCategory}//whatever we will pass here, will return to the dom
    //     }
    // }

    //sorting
    export default {
        setup() {
            const selectedCategory = ref('');
            const orderColumn = ref('created_at');
            const orderDirection = ref('desc');
            const {posts, getPosts} = usePosts();
            const {categories, getCategories} = useCategories();
            onMounted(() => {
                getPosts();
                getCategories();
            });

            const updateOrdering = (column) => {
                orderColumn.value = column;
                orderDirection.value = (orderDirection.value === 'asc') ? 'desc' : 'asc';
                getPosts(1, selectedCategory.value, orderColumn.value, orderDirection.value)
            };

            watch(selectedCategory, (current, previous) => {
               getPosts(1, current);
            });
            // return {posts}
            return {posts, getPosts, categories, selectedCategory, orderColumn, orderDirection, updateOrdering}//whatever we will pass here, will return to the dom
        }
    }
</script>

<style scoped>

</style>
