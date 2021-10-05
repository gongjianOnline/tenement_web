/*eslint-disable */
import React from "react";
import { Carousel , Flex} from 'antd-mobile';
import axios from "axios"
import "./Index.css"
import Nav1 from "../../assets/images/nav-1.png"
import Nav2 from "../../assets/images/nav-2.png"
import Nav3 from "../../assets/images/nav-3.png"
import Nav4 from "../../assets/images/nav-4.png"

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
  componentDidMount() {
    this.getSwipers()
  }
  render() {
    return (
      <div>
        <div className="index">
          {
            this.state.swipers.length &&
            this.renderSwipers() 
          }
        </div>
        {/* 导航菜单 */}
        <Flex className="nav">
          <Flex.Item>
            <img src={Nav1} alt="" />
            <h2>整租</h2>
          </Flex.Item>
          <Flex.Item>
            <img src={Nav2} alt="" />
            <h2>合租</h2>
          </Flex.Item>
          <Flex.Item>
            <img src={Nav3} alt="" />
            <h2>地图找房</h2>
          </Flex.Item>
          <Flex.Item>
            <img src={Nav4} alt="" />
            <h2>去出租</h2>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}