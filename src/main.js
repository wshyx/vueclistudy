import Vue from "vue/dist/vue.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./router/premits.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  "./Svgicon/index.js";


Vue.config.productionTip = false;

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
