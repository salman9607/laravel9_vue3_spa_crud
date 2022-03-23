//kind of like service class, include related to posts
import {ref} from 'vue' //ref is shortform for reference
import { useRouter } from 'vue-router'

export  default  function usePosts() {
    // const posts = ref([]);// it means posts will be reactive, whenever we will call getPosts, the posts variable will get refreshed auto
    const posts = ref({});// in case of pagination

    const router = useRouter();
    // const  getPosts = async () => {
    //     axios.get('api/posts')
    //         .then(response => {
    //             posts.value = response.data.data;
    //         })
    // }

    //in case of pagination
    // const  getPosts = async (page = 1, category = '') => {
    //     axios.get('api/posts?page='+page+ '&category=' + category)
    //         .then(response => {
    //             posts.value = response.data;
    //         })
    // }

    //sorting
    const  getPosts = async (
        page = 1,
        category = '',
        order_column = 'created_at',
        order_direction = 'desc',
    ) => {
        axios.get('api/posts?page='+page+
            '&category=' + category +
            '&order_column=' + order_column +
            '&order_direction=' + order_direction)
            .then(response => {
                posts.value = response.data;
            })
    }

    const storePost = async (post) => {
        axios.post('/api/posts', post)
            .then((response) => {
                router.push({name: 'posts.index'})
            })
    };

    return {posts, getPosts, storePost}//what we will return
}
