import Vue from "vue";
import Router from "vue-router";
import { filterAsyncRoutes } from '../store'
import store from '../store'
import Layout from '@/views/website/layout'
Vue.use(Router);
export const defaultRoutes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
]

export const asyncRoutes = [
  {
    path: '/website',
    redirect: '/website/home',
    name: 'website',
    component: Layout,
    meta: {
        title: '首页'
    },
    children: [
      {
        path: 'home',
        name: 'home_website',
        meta: {
            title: '首页'
        },
        component: () => import ('@/views/website/Home')
      },
      {
        path: 'image',
        name: '',
        meta: {
            title: '照片',
            roles: ['admin']
        },
        component: () => import ('@/views/website/babyInfo'),
        children: [
          {
            path: '',
            name: 'list_img',
            meta: {
                title: '列表'
            },
            component: () => import ('@/views/website/babyInfo/list.vue')
          },
          {
            path: 'detail',
            name: 'list_img_detail',
            meta: {
                title: '照片详情'
            },
            component: () => import ('@/views/website/babyInfo/detail.vue')
          }
        ]
      },
    ]
  }
];

let website = filterAsyncRoutes(asyncRoutes, store.getters.roles)
store.commit('setWebsiteMenu', website)
const createRouter = () =>
new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: defaultRoutes.concat(website),
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router