//kind of like service class, include related to posts
import {ref, inject} from 'vue' //ref is shortform for reference, inject is using for sweetalert
import { useRouter } from 'vue-router'

export  default  function usePosts() {
    // const posts = ref([]);// it means posts will be reactive, whenever we will call getPosts, the posts variable will get refreshed auto
    const posts = ref({});// in case of pagination
    const post = ref({});
    const swal = inject('$swal');

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);
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

    const  getPost = async (id) => {
        axios.get('/api/posts/'+id)
            .then(response => {
                post.value = response.data.data;
            })
    }

    const storePost = async (post) => {
        if(isLoading.value) return;
        isLoading.value = true;
        validationErrors.value = {};
        let serializedPost = new FormData();
        for (let item in post) {
            if(post.hasOwnProperty(item)){
                serializedPost.append(item, post[item]);
            }
        }
        // axios.post('/api/posts', post)
        axios.post('/api/posts', serializedPost)//for file upload
            .then((response) => {
                router.push({name: 'posts.index'})
                swal('Post Saved Successfully!');
            })
            .catch(error => {
                if(error.response?.data) {// ? => optional chaning operator => if error response is empty/null then script would not crash and will return false
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally( () => isLoading.value = false );
    };

    const updatePost = async (post) => {
        if(isLoading.value) return;
        isLoading.value = true;
        validationErrors.value = {};

        // axios.post('/api/posts', post)
        axios.put('/api/posts/' +post.id, post)//for file upload
            .then((response) => {
                router.push({name: 'posts.index'})
                swal({
                    icon: 'success',
                    title: 'Post Update Successfully!'
                });
            })
            .catch(error => {
                if(error.response?.data) {// ? => optional chaning operator => if error response is empty/null then script would not crash and will return false
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally( () => isLoading.value = false );
    };

    const deletePost = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete('/api/posts/' + id)
                        .then(response => {
                            getPosts()
                            router.push({name: 'posts.index'})
                            swal({
                                icon: 'success',
                                title: 'Post deleted successfully'
                            })
                        })
                        .catch(error => {
                            swal({
                                icon: 'error',
                                title: 'Something went wrong'
                            })
                        })
                }
            })
    };

    return {posts, post, getPosts, getPost, storePost, updatePost, deletePost, validationErrors, isLoading}//what we will return
}
