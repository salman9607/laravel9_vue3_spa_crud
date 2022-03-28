import { ref, reactive } from 'vue';
import { useRouter } from "vue-router";

export default function userAuth() {

    const router = useRouter();
    const validationErrors = ref({});
    const processing = ref(false);

    const loginForm = reactive({
        email: '',
        password: '',
        remember: false,
    });

    const submitLogin = async () => {
        if(processing.value) return;
        processing.value = true;
        validationErrors.value = {};
        axios.post('/login', loginForm)
            .then(response => {
                loginUser(response)
            })
            .catch(error => {
                if(error.response?.data){
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => processing.value = false)
    }


    const loginUser = (response) => {
        localStorage.setItem('loggedIn', JSON.stringify(true))
        router.push({ name: 'posts.index' })
    }

    return { loginForm, validationErrors, processing, submitLogin };
}
