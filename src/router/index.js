import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: () => import( '../views/home.vue'),
    children:[
      {
        path: '/menu',
        name: 'menu',
        component: () => import( '../views/Menus/menu.vue')
      },
      {
        path: '/addmenu',
        name: 'addmenu',
        component: () => import( '../views/Menus/addmenu.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import( '../views/Roles/role.vue')
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import( '../views/Admins/admin.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    redirect:'login',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import( '../views/Menus/menu.vue')
  },
  {
    path: '/addmenu',
    name: 'addmenu',
    component: () => import( '../views/Menus/addmenu.vue')
  },
  {
    path: '/role',
    name: 'role',
    component: () => import( '../views/Roles/role.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Token/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/Token/register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
