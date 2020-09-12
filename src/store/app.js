import {Login} from "../api/login.js";
import {setToken , setName} from "../utils/cookie.js";

const  state = {
  iscollapse: JSON.parse(sessionStorage.getItem("iscollapse"))  || false,
  to_ken: "",
  user_name: ""
}
const mutations = {
  SET_COLLAPSE(state) {
    state.iscollapse = !state.iscollapse
    sessionStorage.setItem("iscollapse" , JSON.stringify(state.iscollapse))
  },
  SET_TOKEN(state , value){
    state.to_ken = value
  },
  SET_USERNAME(state , value) {
    state.user_name = value
  }

}
const actions = {
  Login(content , dataRequest) {
      
    return new Promise((resolve , reject) => {
      Login(dataRequest).then(response => {
        let data = response.data.data
        content.commit("SET_TOKEN" , data.token)
        content.commit("SET_USERNAME" , data.username)
        setToken(data.token)
        setName(data.username)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namepaced: true,
  state,
  mutations,
  actions
}