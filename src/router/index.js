import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/Default'

import ProductRoutes from './modules/products'
import BrandRoutes from './modules/brands'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/auth/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login'),
    name: 'login',
    hidden: true,
  },
  {
    path: '/auth/auth-redirect',
    component: () => import('@/views/auth/AuthRedirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
        name: 'dashboard',
        meta: {title: 'Dashboard', icon: 'dashboard', affix: true}
      },
      // {
      //   path:'about',
      //   component: () => import(/* webpackChunkName: "home" */ '@/views/About'),
      //   name: 'About',
      //   meta: {title: 'About', icon: 'dashboard', affix: true}
      // }
    ]
  }
]

export const asyncRoutes = [
  ProductRoutes(Layout),
  BrandRoutes(Layout)
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes,
  linkActiveClass: 'text-indigo-500'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
