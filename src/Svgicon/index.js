import Vue from "vue/dist/vue.js";
import Svgicon from "./Svgicon.vue";
Vue.component("svg-icon" , Svgicon)

const requireAll = requireContext => {
    console.log(requireContext.keys().map(requireContext))
    return requireContext.keys().map(requireContext)
}

const req = require.context('./icon',false,/\.svg$/)
requireAll(req)