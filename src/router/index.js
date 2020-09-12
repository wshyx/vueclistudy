import Vue from "vue/dist/vue.js";
import VueRouter from "vue-router";
import Login from "../views/login/login.vue";
import Console from "../views/Console/index.vue";
import Layout from "../views/Console/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: Login,
    hidden: true,
    meta: {
      name: "首页",

    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/console",
    name: "Console",
    component: Layout,
    hiddden: false,
    meta: {
      name: "控制台",
      icon: 'console'
    }
  },
  {
    path: "/info",
    name: "Info",
    hidden: false,
    component: Layout,
    meta: {
      name: "信息管理",
      icon:'info'
    },
    children: [
      {
        path: "/infoList",
        name: "Infolist",
        component: () => import("../views/Info/InfoList.vue"),
        meta: {
          name: "信息列表"
        }
      },
      {
        path: "/infoClass",
        name: "Infoclass",
        component: () => import("../views/Info/InfoClass.vue"),
        meta: {
          name: "信息分类"
        }
      },
      {
        path: "/infoDetail",
        name: "Infodetail",
        component: () => import("../views/Info/InfoDetail.vue"),
        meta: {
          name: "信息详情"
        }
      }

    ]
  },
  {
    path: "/users",
    name: "Users",
    hidden: false,
    meta: {
      name: "用户管理",
      icon: 'user'
    },
    component: Layout,
    children: [
      {
        path: "/usersList",
        name: "Userslist",
        component: ()=> import("../views/Users/UsersList.vue"),
        meta: {
          name: "用户列表"
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
