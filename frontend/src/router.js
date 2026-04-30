import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Cart from './views/Cart.vue'
import Login from './views/Login.vue'
import Admin from './views/Admin.vue'
import Signup from './views/Signup.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/admin', component: Admin },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})