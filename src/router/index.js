import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/Layout/Layout.vue';
import { getUser } from '@/utils/user'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home',
    name: 'index',
    component: layout,
    children: [{
        path: '/home',
        component: () =>
            import ('@/views/Home/Home.vue')
    }, {
        path: '/detail',
        component: () =>
            import ('@/views/Info/Info.vue')
    }, {
        path: '/login',
        component: () =>
            import ('@/views/Login/Login.vue')
    }]
}]

const whiteList = ['/login']
const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    if (getUser() == false) {
        console.log('no')
        if (whiteList.indexOf(to.path) > -1) {
            next();
        } else {
            next({ path: '/login' })
        }
    } else {
        next()
    }
})

export default router