import { Toast } from 'vant';
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'resume',
    component: () => import('../components/Resume'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: { keepAlive: true },
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: { keepAlive: true },
        beforeEnter: ((to, from, next) => {
          // 如果处于已登录状态访问login会跳转到home
          if (sessionStorage.getItem('userName') == null) next();
          else next('home')
        })
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue'),
        meta: { keepAlive: true }
      },
      {
        path: '/info',
        name: 'info',
        component: () => import('../views/changeviews/Info')
      },
      {
        path: '/educations',
        name: 'educations',
        component: () => import('../views/changeviews/Educations')
      },
      {
        path: '/projects',
        name: 'projects',
        component: () => import('../views/changeviews/Projects')
      },
      {
        path: '/wanted',
        name: 'wanted',
        component: () => import('../views/changeviews/Wanted')
      },
      {
        path: '/skills',
        name: 'skills',
        component: () => import('../views/changeviews/Skills')
      },
    ]
  },
]


const router = new VueRouter({
  mode: 'history',
  routes
})

// 全局守卫(未登录只能访问到login和register,访问其他页面会跳转到login)
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && sessionStorage.getItem('userName') == null) {
    next('login');
    Toast.fail("请先登录")
  }
  else next()
})


export default router
