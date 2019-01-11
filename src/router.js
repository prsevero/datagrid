import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/logout',
            redirect: '/login',
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});

router.beforeEach((to, from, next) => {
    const authRequired = to.path !== '/login';
    const loggedIn = localStorage.getItem('token');

    if (authRequired && !loggedIn) return next('/login');

    next();
});
