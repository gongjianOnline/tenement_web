import {API} from "../utils/api.js"

export const getCurrentCity = () => {
  const localcity = JSON.parse(localStorage.getItem('hkzf_city'));
  if (!localcity) {
    return new Promise((resolve,reject)=>{
      var myCity = new window.BMapGL.LocalCity();
      myCity.get((result)=>{
        let name = result.name
        API({
          methods:"get",
          url:`/area/info`,
          params:{
            name:name
          }
        }).then((response)=>{
          localStorage.setItem("hkzf_city",JSON.stringify(response.data.body))
          resolve(response.data.body)
        }).catch((err)=>{
          reject(err)
        })
      });
    })
  }
    // 因为上面处理了异步操作,使用了Promise,因此,为了该函数返回值的统一,此处,也应该使用Promise
    return new Promise((resolve,reject)=>{
      resolve(localcity)
    })
}