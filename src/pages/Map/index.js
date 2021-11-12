/*eslint-disable */
import React from "react";
import "./index.scss"
import NavHeader from "../NavHeader/index"
class Map extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    var map = new BMapGL.Map("container");
    var point = new BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 15); 
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