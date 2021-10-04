/*eslint-disable */
import React from "react";
import { Carousel } from 'antd-mobile';
import axios from "axios"
import "./Index.css"

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
      </div>
    )
  }
}