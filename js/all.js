
const App = {
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'akihico',
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        login(){
    // 發送 api請求
            axios.post(`${this.url}/admin/signin`, this.user)
                .then((res) => {
                    alert(res.data.message);
                    const {token, expired} = res.data;
                    //console.log(token, expired);
                    // 把token和時效存在cookie中
                    document.cookie = `hexToken=${ token }; expires=${ new Date(expired)};`;
                    window.location = 'products.html';
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        }
    }
}
Vue.createApp(App).mount('#app');