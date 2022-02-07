import pagination from './pagination.js';
import productModal from './productModal.js';
import delProductModal from './delProductModal.js';

let myModal = '';
let delModal = '';
const App = {
    data(){
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'akihico',
            products: [],
            isNew: true,
            addProducts: {},
            tempProduct:{},
            pagination: {}
        }
    },
    components: {
        pagination,
        productModal,
        delProductModal
    },
    methods: {
        checkLogin(){
            //取出token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            // headers夾帶token
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${this.url}/api/user/check`)
            .then((res) => {
                this.render();
            })
            .catch((err) => {
                alert(err.data.message);
                window.location = 'login.html';
            })
        },
        // 取得產品資訊
        getProducts(page = 1){
            axios.get(`${this.url}/api/${this.path}/admin/products/?page=${page}`)
            .then((res) => {
                this.products = res.data.products;
                this.pagination = res.data.pagination;
            })
            .catch((err) => {
                alert(err.data.message);
            })
        },
        // 新增修改產品
        addProduct() {
            if (this.isNew) {
                axios.post(`${this.url}/api/${this.path}/admin/product`, {data: this.addProducts})
                .then((res) => {
                alert(res.data.message);
                this.closeModal();
                this.render();
                })
                .catch((err) => {
                alert(err.data.message);
                })
            } else {
                axios.put(`${this.url}/api/${this.path}/admin/product/${this.addProducts.id}`, {data: this.addProducts})
                .then((res) => {
                alert(res.data.message);
                this.closeModal();
                this.render();
                })
                .catch((err) => {
                    console.dir(err);
                alert(err.data.message);
                })
            }
        },
        // 刪除產品
        deleteProduct(id){
            axios.delete(`${this.url}/api/${this.path}/admin/product/${id}`)
            .then((res) => {
                alert(res.data.message);
                this.closeDelModal();
                this.render();
            })
            .catch((err) => {
                alert(err.data.message);
            })
        },
        // modal
        openModal() {
            this.addProducts = {};
            this.isNew = true;
            myModal.show();
        },
        openEditModal(item) {
            this.addProducts = {...item};
            this.isNew = false;
            myModal.show();
        },
        openDelModal(item) {
            delModal.show();
            this.tempProduct = item;
        },
        closeModal() {
            myModal.hide();
        },
        closeDelModal() {
            delModal.hide();
        },
        // 新增圖片
        createImages() {
            this.addProducts.imagesUrl = [];
            this.addProducts.imagesUrl.push('');
          },
        // 渲染
        render(){
            this.getProducts();
        }
    },
    mounted(){
        this.checkLogin();
        // modal
        myModal = new bootstrap.Modal(document.querySelector('#productModal'), {
            backdrop: 'static',
            keyboard: false
        });
        delModal = new bootstrap.Modal(document.querySelector('#delProductModal'), {
            backdrop: 'static',
            keyboard: false
        });
    }
}
Vue.createApp(App).mount('#app');