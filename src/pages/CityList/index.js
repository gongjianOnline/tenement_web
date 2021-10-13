import React from "react";
import { NavBar, Icon } from 'antd-mobile';
import "./index.scss"
class CityList extends React.Component {
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