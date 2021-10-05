/*eslint-disable */
import React from "react";
import { Carousel , Flex} from 'antd-mobile';
import axios from "axios"
import "./Index.css"
import Nav1 from "../../assets/images/nav-1.png"
import Nav2 from "../../assets/images/nav-2.png"
import Nav3 from "../../assets/images/nav-3.png"
import Nav4 from "../../assets/images/nav-4.png"

// 导航菜单数据
const navs = [
  {
    id:"1",
    img:Nav1,
    title:"整租",
    path:"/home/houseList"
  },
  {
    id:"2",
    img:Nav2,
    title:"合租",
    path:"/home/houseList"
  },
  {
    id:"3",
    img:Nav3,
    title:"地图找房",
    path:"/map"
  },
  {
    id:"4",
    img:Nav4,
    title:"去出租",
    path:""
  },

]
export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 轮播图状态数据
      swipers: []
    }
  }
  // 获取轮播图数据
  async getSwipers() {
    let response = await axios.get("http://localhost:7501/home/swiper")
    this.setState(() => {
      return {
        swipers: response.data.body
      }
    })
  }
  // 渲染沦轮播图
  renderSwipers = () => {
    return(
      <Carousel
      autoplay={true}
        infinite={true}
        autoplayInterval={1000}>
        {this.state.swipers.map(val => (
          <a
            key={val.id}
            style={{ display: 'inline-block', width: '100%', height: "212px" }}
          >
            <img
              src={`http://localhost:7501${val.imgSrc}`}
              alt=""
              style={{ width: '100%', height: "100%" }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  // 渲染导航菜单
  renderNavs = ()=>{
    return navs.map((item)=>{
      return(
        <Flex.Item onClick={()=>this.props.history.push(item.path)}>
          <img src={item.img} alt="" />
          <h2>{item.title}</h2>
        </Flex.Item>
      )
    })
  }
  componentDidMount() {
    this.getSwipers()
  }
  render() {
    return (
      <div>
        {/* 轮播 */}
        <div className="index">
          {
            this.state.swipers.length &&
            this.renderSwipers() 
          }
        </div>
        {/* 导航菜单 */}
        <Flex className="nav">
          {this.renderNavs()}
        </Flex>
      
      </div>
    )
  }
}