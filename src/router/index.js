import Vue from 'vue'
import Router from 'vue-router'

import Nprogress from 'nprogress'
// import 'nprogress/nprogress.css'

import Login from '@/components/login/Login'

// import Home from '@/components/home/Home'
// import UserList from '@/components/userlist'
// import RolesList from '@/components/roleslist'
// import Rightlist from '@/components/rightlist'
// import Categories from '@/components/categories'
// import Goods from '@/components/goods'
// import GoodsAdd from '@/components/goods-add'

const Home = () => import(/* webpackChunkName: 'home' */'@/components/home/Home')
const UserList = () => import(/* webpackChunkName: 'user' */'@/components/userlist')
const RolesList = () => import(/* webpackChunkName: 'roles' */'@/components/roleslist')
const Rightlist = () => import(/* webpackChunkName: 'rights' */'@/components/rightlist')
const Categories = () => import(/* webpackChunkName: 'categories' */'@/components/categories')
const Goods = () => import(/* webpackChunkName: 'goods' */'@/components/goods')
const GoodsAdd = () => import(/* webpackChunkName: 'goods' */'@/components/goods-add')

Vue.use(Router)

// 配置nprogress
// Nprogress.inc(0.2)
Nprogress.configure({ showSpinner: false })

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },

    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: UserList },
        { path: '/roles', component: RolesList },
        { path: '/rights', component: Rightlist },
        { path: '/categories', component: Categories },
        { path: '/goods', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('访问了页面', to, from)

  if (to.path === '/login') return next()

  if (localStorage.getItem('token')) {
    // 展示进度条
    Nprogress.start()
    next()
  } else {
    next('/login')
  }
})

router.afterEach(() => {
  setTimeout(() => {
    Nprogress.done()
  }, 500)
})

export default router
