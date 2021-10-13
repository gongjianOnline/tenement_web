import React from "react";
import { NavBar } from 'antd-mobile';
import axios from "axios"
import "./index.scss"
class CityList extends React.Component {
  constructor(props){
    super(props)
  }
  // 获取城市列表数据
  getCityList = ()=>{
    axios({
      methods:"get",
      url:"http://localhost:7501/area/city?level=1"
    }).then((response)=>{
      console.log("获取城市列表的数据",response)
    })
  }

  componentDidMount(){
    this.getCityList()
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