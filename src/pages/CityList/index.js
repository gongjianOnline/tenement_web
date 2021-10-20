import React from "react";
import { NavBar } from 'antd-mobile';
import axios from "axios"
import "./index.scss"

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
class CityList extends React.Component {
  constructor(props){
    super(props)
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
    CityList.hot = {...hotList.data.body};
    CityListFirst.unshift('hot')
    console.log(CityListFirst)
  }
  

  componentDidMount(){
    this.getCityList();
  }
  render() {
    return (
      <div>
        <NavBar
          className="NavBar"
          mode="light"
          icon={<i className="iconfont icon-back"></i>}
          onLeftClick={() => this.props.history.go(-1)}>城市选择</NavBar>
      </div>
    )
  }
}
export default CityList