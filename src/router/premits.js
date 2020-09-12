//路由守卫
import router from "./index"
import {getToken } from "../utils/cookie.js"

const whiteRouters = ["/login"]

router.beforeEach((to , from ,next) =>{
    if (getToken()) {
        next()
    } else {
        if (whiteRouters.indexOf(to.path) !== -1) {
            next()
        } else {
            next("/login")
        }
    }
})


