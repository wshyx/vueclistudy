import cookie from "cookie_js"

//////////////////////////////////token
const adminToken = "admin_token"
export function setToken(token) {
    return cookie.set(adminToken , token)
}

export function getToken () {
    return cookie.get(adminToken)
}
////////////////////////////////username
const userName = "user_name"
export function setName (username) {
    return cookie.set(userName , username)
}

export function getName () {
    return cookie.get(userName)
}