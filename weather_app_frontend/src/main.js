import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import Modal from './components/Widget/modal.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import 'bootstrap-icons/font/bootstrap-icons.css';

import './assets/base.css';

Vue.component('my-modal', Modal);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');