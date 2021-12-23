import router from "./router";
import  NProgress from  'nprogress'
import store from "./store";
import { asyncRoutes } from './router'
import { filterAsyncRoutes } from './store'
const whiteList = ['/login']

NProgress.configure({ showSpinner: false })

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (store.getters.roles) {
    if (to.path == '/website/home') {
      let website = filterAsyncRoutes(asyncRoutes, store.getters.roles)
      store.commit('setWebsiteMenu', website)
      router.options.routes = router.options.routes.concat(website)
      next()
      NProgress.done()
    } else {
        const hasRoles = store.getters.roles && store.getters.roles.length > 0  
        if (hasRoles) {
            next()
        } else {
          try {
              const roles = store.state.roles
              const accessRoutes = filterAsyncRoutes(await store.state.routers,roles)
              router.addRoutes(accessRoutes)
              next({ ...to, replace: true })
          } catch (error) {
              next(`/login?redirect=${to.path}`)
              NProgress.done()
          }
        }
    }
  } else {
    let isWhite = false
    whiteList.forEach(item => {
        if (to.path.indexOf(item)>-1) { isWhite = true }
    })
    if (isWhite) {
        NProgress.start()
        next()
    } else {
        NProgress.start()
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        })
    }
  }
});
router.afterEach(async(to, from, next) => {
  document.title = 'My Web'
  NProgress.done()
})
