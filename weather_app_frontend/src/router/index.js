import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes: [{
            path: '',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !store.getters.user.token) next({ name: 'login' });
    else next();
});

export default router;