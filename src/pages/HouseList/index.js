/*eslint-disable */
import React from "react";
// 导入导航栏组件
import SearchHeader from "../../compoents/SearchHeader";
import {Flex,Icon} from "antd-mobile"
import styles from "./index.module.css"
// 获取城市信息
const { label } = JSON.parse(localStorage.getItem("hkzf_city"));
export default class HouseList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Flex className={styles.header}>
          <i className="iconfont icon-back" onClick={()=>this.props.history.go(-1)}></i>
          <SearchHeader cityName={label} className={styles.searchHeader}/>
        </Flex>
        
      </div>
    );
  }
}
