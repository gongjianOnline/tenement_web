/*eslint-disable */
import React from "react";
import "./index.scss"
import NavHeader from "../NavHeader/index"
import styles from "./index.module.css"
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
    const myGeo = new BMapGL.Geocoder();
    myGeo.getPoint(label,(point)=>{
      if(point){
        map.centerAndZoom(point,11);
        map.addControl(new BMapGL.ScaleControl());
        map.addControl(new BMapGL.ZoomControl());
        map.addControl(new BMapGL.CityListControl());
        // 创建地图覆盖物
        const opts = {
          position:point,
          offset:new BMapGL.Size(-35,-35)
        }
        /*设置setContent,第一个参数会失效,因此传空占位参数*/
        const label = new BMapGL.Label("",opts);
        label.setContent(`
          <div class="${styles.bubble}">
            <p class="${styles.name}">${name || "北京"}</p>
            <p>0套</p>
          </div>
        `)
        label.setStyle({
          cursor:"pointer",
          border:"0px solid rgb(255,0,0)",
          padding:"0px",
          whitsSpace:"nowrap",
          color:"rgb(255,255,255)",
          fontSize:"11px",
          textAlign:"center"
        })
        // 添加点击事件
        label.addEventListener("click",(e)=>{
          console.log("打印点击事件",e)
        })
        map.addOverlay(label)
        

      }
    },label)
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