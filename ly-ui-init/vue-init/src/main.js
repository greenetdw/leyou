import Vue from '../node_modules/vue/dist/vue'
import VueRouter from '../node_modules/vue-router/dist/vue-router'
import loginForm from './js/login'
import registerForm from './js/register'
import './css/main.css'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [ // 编写多个路由规则
        {
            path: "/login", // 请求路径
            component: loginForm // 组件名称
        },
        {path: "/register", component: registerForm},
    ]
});

var vm = new Vue({
    el: "#app",
    components: {// 引用登录和注册组件
        loginForm,
        registerForm
    },
    router
})