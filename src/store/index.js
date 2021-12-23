import Vue from "vue";
import Vuex from "vuex";
import permission from './modules/permission.js'
import { asyncRoutes } from '@/router'

Vue.use(Vuex);

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.indexOf(roles) > -1
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

export default new Vuex.Store({
  state: {
    roles: localStorage.getItem("role") || "",
    websiteMenu: [],
    userName: localStorage.getItem("name") || "",
    headerShow: false || localStorage.getItem("headerShow"),
  },
  getters: {
    roles: (state) => state.roles,
    websiteMenu: state => state.websiteMenu,
    userName: state => state.userName,
    headerShow: state => state.headerShow
  },
  mutations: {
    setRole(state, val) {
      localStorage.setItem("role", val);
      state.roles = val;
    },
    setName(state, val) {
      localStorage.setItem("name", val);
      state.userName = val;
    },
    setWebsiteMenu(state, data) {
      state.websiteMenu = data
    },
    setHeaderShow(state, val) {
      localStorage.setItem("headerShow", val);
      state.headerShow = val
    },
  },
  actions: {
    signOut({ commit }) {
      return new Promise((res, rej) => {
          commit('setRole', '')
          commit('setHeaderShow', '')
          res(true)
      })
    },
    GenerateRoutes({ commit }, roles) {
      return new Promise(res => {
          let accessedRouters
          accessedRouters = filterAsyncRoutes(asyncRoutes, roles)
          accessedRouters.push({ path: '*', redirect: '/' })
          console.log(accessedRouters);
          res(accessedRouters)
      })
  }
  },
  modules: {
    permission
  }
});
