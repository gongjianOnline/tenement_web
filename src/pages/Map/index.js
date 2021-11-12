/*eslint-disable */
import React from "react";
import "./index.scss"
import NavHeader from "../NavHeader/index"
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