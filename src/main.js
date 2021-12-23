import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './permission'

import "@/styles/index.styl";

import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import bases from "@/utils/functions";
Vue.use(bases);

import filters from "@/utils/filters";
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]));

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(vueSwiper)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
