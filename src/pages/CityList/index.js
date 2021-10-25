/*eslint-disable */
import React from "react";
import { NavBar } from 'antd-mobile';
import axios from "axios"
import "./index.scss"
import {getCurrentCity} from "../../utils/index"
import { List, AutoSizer } from "react-virtualized"
// 城市列表格式化
const formatCityList = (data)=>{
  let CityList = {};
  let CityListFirst = [];
  data.forEach((item)=>{
    if(CityList[item.short[0]]){
      CityList[item.short[0]].push({
        label:item.label,
        pinyin:item.pinyin,
        value:item.value
      })
    }else{
      CityList[item.short[0]] = [{
        label:item.label,
        pinyin:item.pinyin,
        value:item.value
      }]
    }
  })
  CityListFirst = (Object.keys(CityList)).sort()
  return {
    CityList:CityList,
    CityListFirst:CityListFirst
  }
} 
// 处理字母索引的方法
const formatCityIndex = (letter)=>{
  switch(letter){
    case "#":
      return "当前定位"
    case "hot":
      return  "热门城市"
    default:
      return  letter.toUpperCase ();
      break; 
  }
}
// 索引的高度
const title_height = 36;
// 每个城市的高度
const name_height = 50
// 用于节流的闭包参数
let valid = true
class CityList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      CityList : {},
      CityListFirst : [],
      activeIndex:0
    }
    // 创建ref对象
    this.citylestComponent = React.createRef()
  } 
  // 获取城市列表数据
  async getCityList(){
    const response = await axios({
      methods:"get",
      url:"http://localhost:7501/area/city?level=1"
    })
    let { CityList, CityListFirst } = formatCityList(response.data.body)
    let hotList = await axios({
      methods:'get',
      url:"http://localhost:7501/area/hot"
    })
    CityList['hot'] = [...hotList.data.body];
    CityListFirst.unshift('hot');
    // 获取当前定位
    const curCity = await getCurrentCity();
    CityList['#'] = [curCity];
    CityListFirst.unshift("#");
    this.setState(()=>{
      return {
        CityList:CityList,
        CityListFirst:CityListFirst,
      }
    })
  }
  async componentDidMount(){
    await this.getCityList();
    this.citylestComponent.current.measureAllRows()
  }
  rowRenderer=({
    key, 
    index,
    isScrolling, 
    isVisible, 
    style,
  })=>{
    const {CityListFirst,CityList} = this.state;
    const letter = CityListFirst[index]
    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {
          CityList[letter].map((item,index)=>{
            return (
              <div className="name" key={item.value}>{item.label}</div>
            )
          })
        }
      </div>
    );
  }
  getRowHeight = ({index})=>{
    const {CityList,CityListFirst} = this.state;
    return title_height + CityList[CityListFirst[index]].length * name_height
  }
  // 渲染锚点列表
  renderCityIndex(){
    const {CityListFirst,activeIndex} = this.state;
    return CityListFirst.map((item,index)=>(
        <li className="city-index-item" key={index} onClick={()=>{
          // this.setState({
          //   activeIndex:index
          // })
          this.citylestComponent.current.scrollToRow(index)
        }}> 
          <span className={activeIndex==index?"index-active":""}>{item==='hot'?'热':item.toUpperCase()}</span>
        </li>
      )
    )
  }
  // 节流用于点击锚点高亮错位的问题
  throttle(startIndex){
    return (()=>{
      if(!valid){
        return false 
      }
      valid = false
      setTimeout(() => {
        if(!(this.state.activeIndex == startIndex)){
          this.setState({
            activeIndex:startIndex
          })
        }
        valid = true;
      }, 0)
    })()
  }
  // 用于获取List组件中渲染行的高亮
  onRowsRendered = ({startIndex})=>{
    this.throttle(startIndex)
  }
  render() {
    return (
      <div className="cityList">
        <NavBar
          className="NavBar"
          mode="light"
          icon={<i className="iconfont icon-back"></i>}
          onLeftClick={() => this.props.history.go(-1)}>城市选择</NavBar>
        <AutoSizer className="xxx">
          {
            ({width,height}) => (
              <List
                ref={this.citylestComponent}
                width={width}
                height={height-45}
                rowCount={this.state.CityListFirst.length}
                rowHeight={this.getRowHeight}
                rowRenderer={this.rowRenderer}
                onRowsRendered={this.onRowsRendered}
                scrollToAlignment='start'
              />
           )
          }
        </AutoSizer>
        {/* 锚点 */}
        <ul className="city-index">
          {
            this.renderCityIndex()
          }
        </ul>
      </div>
    )
  }
}
export default CityList