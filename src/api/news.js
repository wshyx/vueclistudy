import server from "../utils/request.js"
/**
 * 获取信息列表数据
 */

 
export function getList(data) {
  return server.request({
      method: "post",
      url: "/news/getList/",
      data: data
  })
}
/****
 * 添加信息
 */
export function addMsg(data) {
  return server.request({
    method: "post",
    url:"/news/add/",
    data:data
  })
}