import Vue from "vue/dist/vue.js";
import Vuex from "vuex";

import app from "./app.js";
Vue.use(Vuex);

export default new Vuex.Store({
 
  modules: {
    app
  }
});
