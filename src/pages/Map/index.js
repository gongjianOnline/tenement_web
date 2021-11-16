/*eslint-disable */
import React from "react";
import "./index.scss"
import NavHeader from "../NavHeader/index"
import styles from "./index.module.css"
import axios from "axios"

class Map extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    // 获取当前定位城市
    this.initMap()
  }

  initMap(){
    const {label,value}  = JSON.parse(localStorage.getItem("hkzf_city"));
    const map = new BMapGL.Map("container");
    this.map = map
    const myGeo = new BMapGL.Geocoder();
    myGeo.getPoint(label,async (point)=>{
      if(point){
        map.centerAndZoom(point,11);
        map.enableScrollWheelZoom(true)
        map.addControl(new BMapGL.ScaleControl());
        map.addControl(new BMapGL.ZoomControl());
        map.addControl(new BMapGL.CityListControl());
        
        this.renderOverlays(value)


        // 获取房屋信息列表
        // let response = await axios({
        //   methods:"get",
        //   url:"http://localhost:7501/area/map",
        //   params:{
        //     id:value
        //   }
        // })
        // console.log("房屋列表",response)
        // response.data.body.forEach((item,index)=>{
        //   let arePoint = new BMapGL.Point(item.coord.longitude,item.coord.latitude)
        //   /*设置setContent,第一个参数会失效,因此传空占位参数*/
        //   const label = new BMapGL.Label("",{
        //     position: arePoint,
        //     offset:new BMapGL.Size(-35,-35)
        //   });
        //   label.setContent(`
        //     <div class="${styles.bubble}">
        //       <p class="${styles.name}">${item.label || "暂无"}</p>
        //       <p>${item.count || "0"}套</p>
        //     </div>
        //   `)
        //   label.setStyle({
        //     cursor:"pointer",
        //     border:"0px solid rgb(255,0,0)",
        //     padding:"0px",
        //     whitsSpace:"nowrap",
        //     color:"rgb(255,255,255)",
        //     fontSize:"11px",
        //     textAlign:"center"
        //   })
        //   label.id = item.value
        //   // 添加点击事件
        //   label.addEventListener("click",(e)=>{
        //     console.log("打印点击事件",e,label.id)
        //     // 放大地图,当前点击的覆盖物为中心
        //     map.centerAndZoom(arePoint,13)
        //     map.clearOverlays()
        //   })
        //   map.addOverlay(label)
        // })
      }
    },label)
  }
  // 渲染覆盖物入口
  async renderOverlays(id){
    const response = await axios({
      methods:'get',
      url:'http://localhost:7501/area/map',
      params:{
        id:id
      }
    })
    console.log("房屋列表",response)
    let res = response.data.body;
    const {nextZoom,type} = this.getTypeAndZoom()
    res.forEach((item)=>{
      this.createOverlays(item)
    })
  }
  createOverlays(){

  }
  // 获取当前地图的缩放级别
  getTypeAndZoom(){
    const zoom = this.map.getZoom()
    let nextZoom,type
    if(zoom >= 10 && zoom < 12){
      //区
      // 下一个缩放级别
      nextZoom = 13
      type='circle'
    }else if(zoom>=12 && zoom<14){
      // 镇
      nextZoom = 15
      type= "circle"
    }else if(zoom >= 14 && zoom < 16){
      // 小区
      type = "rect"
    }
    return {nextZoom,type}
  }

  render() {
    return (
      <div className="map">
        <NavHeader>地图找房</NavHeader>
        <div id="container"></div>
      </div>
    )
  }
}
export default Map