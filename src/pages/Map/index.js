/*eslint-disable */
import React from "react";
import "./index.scss";
import NavHeader from "../NavHeader/index";
import styles from "./index.module.css";
import axios from "axios";

class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // 获取当前定位城市
    this.initMap();
  }

  initMap() {
    const { label, value } = JSON.parse(localStorage.getItem("hkzf_city"));
    const map = new BMapGL.Map("container");
    this.map = map;
    const myGeo = new BMapGL.Geocoder();
    myGeo.getPoint(
      label,
      async (point) => {
        if (point) {
          map.centerAndZoom(point, 11);
          map.enableScrollWheelZoom(true);
          map.addControl(new BMapGL.ScaleControl());
          map.addControl(new BMapGL.ZoomControl());
          map.addControl(new BMapGL.CityListControl());

          this.renderOverlays(value);

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
      },
      label
    );
  }
  // 渲染覆盖物入口
  async renderOverlays(id) {
    const response = await axios({
      methods: "get",
      url: "http://localhost:7501/area/map",
      params: {
        id: id,
      },
    });
    let res = response.data.body;
    const { nextZoom, type } = this.getTypeAndZoom();
    res.forEach((item) => {
      this.createOverlays(item, nextZoom, type);
    });
  }
  // 获取当前地图的缩放级别
  getTypeAndZoom() {
    const zoom = this.map.getZoom();
    let nextZoom, type;
    if (zoom >= 10 && zoom < 12) {
      //区
      // 下一个缩放级别
      nextZoom = 13;
      type = "circle";
    } else if (zoom >= 12 && zoom < 14) {
      // 镇
      nextZoom = 15;
      type = "circle";
    } else if (zoom >= 14 && zoom < 16) {
      // 小区
      type = "rect";
    }
    return { nextZoom, type };
  }
  // 创建覆盖物
  createOverlays(data, zoom, type) {
    const {
      coord: { longitude, latitude },
      label: areaName,
      count,
      value,
    } = data;
    // 创建坐标对象
    let areaPoint = new BMapGL.Point(longitude, latitude);
    if (type === "circle") {
      // 创建小区和镇的覆盖物
      this.createCircle(areaPoint, areaName, count, value, zoom);
    } else {
      // 创建小区覆盖物
      this.createRect(areaPoint, areaName, count, value);
    }
  }
  // 创建区\镇覆盖物
  createCircle(point, name, count, id, zoom) {
    const label = new BMapGL.Label("", {
      position: point,
      offset: new BMapGL.Size(-35, -35),
    });
    label.setContent(`
      <div class="${styles.bubble}">
        <p class="${styles.name}">${name || "暂无"}</p>
        <p>${count || "0"}套</p>
      </div>
    `);
    label.setStyle({
      cursor: "pointer",
      border: "0px solid rgb(255,0,0)",
      padding: "0px",
      whitsSpace: "nowrap",
      color: "rgb(255,255,255)",
      fontSize: "11px",
      textAlign: "center",
    });
    label.id = id;
    // 添加点击事件
    label.addEventListener("click", (e) => {
      // 调用 renderOverlays 方法, 获取该区域下的房源数据
      this.renderOverlays(id)
      // 放大地图,当前点击的覆盖物为中心
      this.map.centerAndZoom(point, zoom);
      this.map.clearOverlays();
    });
    this.map.addOverlay(label);
  }
  // 创建小区覆盖物
  createRect(point, name, count, id){
    const label = new BMapGL.Label("", {
      position: point,
      offset: new BMapGL.Size(-50, -28),
    });
    label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}</span>
        <i class="${styles.arrow}"></i>
      </div>
    `);
    label.setStyle({
      cursor: "pointer",
      border: "0px solid rgb(255,0,0)",
      padding: "0px",
      whitsSpace: "nowrap",
      color: "rgb(255,255,255)",
      fontSize: "11px",
      textAlign: "center",
    });
    // 给 label 对象添加一个唯一标识
    label.id = id;
    // 添加点击事件
    label.addEventListener("click", (e) => {
      this.getHousesList(id)
    });
    this.map.addOverlay(label);
  }

  // 添加覆盖物到地图中
  async getHousesList(id){
    let response = await axios({
      methods:'get',
      url:"http://localhost:7501/houses",
      params:{
        cityId:id
      }
    })
    console.log("覆盖物单击打印",response);
  }

  render() {
    return (
      <div className="map">
        <NavHeader>地图找房</NavHeader>
        <div id="container"></div>
        <div className="xxx">123456</div>
        {/* 房源列表 */}
        {/* className={[styles.houseList,styles.show].join('')} */}
        {/* <div className={styles.houseList}> 
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <Link className={styles.titleMore} to="/home/list">
              更多房源
            </Link>
          </div>
          
          <div className={styles.house}>
            <div className={styles.imgWrap}>
              <img className={styles.img} 
                src="" 
                alt=""/>
            </div>
            <div className={styles.content}> 
              <h3 className={styles.title}>
                三期xxxxxx
              </h3>
              <div className={styles.desc}>xx/xx/xx</div>
              <div> 
                <span className={[styles.tag,styles.tag1].join(' ')}>
                  近地铁
                </span>
              </div>
              <div className={styles.price}>
                <span className={styles.priceNum}>8500</span>元/月
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
export default Map;
