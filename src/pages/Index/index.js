/*eslint-disable */
import React from "react";
import { Carousel , Flex, Grid, WingBlank, Icon} from 'antd-mobile';
import axios from "axios"
import "./Index.scss"
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
      swipers: [],// 轮播图状态数据
      groups:[],// 租房小组的数据
      mewsData:[],// 资讯数据
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

  // 获取小组数据
  async getGroups(){
    const response = await axios.get("http://localhost:7501/home/groups?area=AREA%7C88cff55c-aaa4-e2e0")
    this.setState(()=>{
      return{
        groups:response.data.body
      }
    })
  }

  // 获取资讯数据
  async getNews(){
    const response  = await axios.get("http://localhost:7501/home/news?area=AREA%7C88cff55c-aaa4-e2e0")
    this.setState(()=>{
      return{
        mewsData:response.data.body
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

  // 渲染资讯列表
  renderNews = ()=>{
    return this.state.mewsData.map((item,index)=>{
      return (
        <div className="newList" key={item.id}>
          <Flex>
            <div> 
              <img src={`http://localhost:7501${item.imgSrc}`} alt="" />
            </div>
            <div className="newInfo newInfoContainer">
              <Flex direction="column" className="newInfo" justify="between">
                <h3>{item.title}</h3>
                <Flex justify="between" className="newOrigin">
                  <div>{item.from}</div>
                  <div>{item.date}</div>
                </Flex>
              </Flex>
            </div>
          </Flex>
        </div>
      )
    })
  }

  componentDidMount() {
    this.getSwipers();
    this.getGroups();
    this.getNews()
  }

  render() {
    return (
      <div className="indexWrapper">
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
        {/* 租房小组 */}
        <div className="group">
          <h3 className="title">租房小组</h3>
          <div> 
            <Grid data={this.state.groups} 
              columnNum={2} 
              hasLine={false} 
              activeStyle={false}
              square={false}
              renderItem={(item)=>{
                return(
                  <Flex className="group-item" justify="around">
                    <div className="desc"> 
                      <p className="title">{item.title}</p>
                      <span className="info">{item.desc}</span>
                    </div>
                    <img src={`http://localhost:7501${item.imgSrc}`} alt="" />
                  </Flex>
                )
              }}/>
          </div>
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="title">最新资讯</h3>
          <div className="">
            <WingBlank>{this.renderNews()}</WingBlank>
          </div>
        </div>
        {/* 搜索框 */}
        <div className="SearchBox">
            <Flex justify="around">
              <div className="inpurtWrapper">
                <Flex>
                  <div className="inpurtWrapperItem placeTitle">
                    上海
                    <Icon type="down" size="xs" className="placeIcon"/>
                  </div>
                  <div className="inpurtWrapperItem SearchInput">
                    <input type="text" placeholder="请输入小区或地址"/>
                  </div>
                </Flex>
              </div>
              <div className="iconWrapper">
                <svg className="icon iconItem" aria-hidden="true">
                  <use xlinkHref="#icon-wode"></use>
                </svg>
              </div>
            </Flex>
        </div>
      </div>
    )
  }
  
}