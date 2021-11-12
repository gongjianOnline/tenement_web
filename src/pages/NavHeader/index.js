/*eslint-disable */
import React from "react";
import { withRouter } from "react-router-dom";
import { NavBar } from 'antd-mobile';
import styles from "./index.module.css"
class NavHeader extends React.Component {
  constructor() {
    super();
  }
  render(){
    return(
      <NavBar
          className={styles.navBar}
          mode="light"
          icon={<i className="iconfont icon-back"></i>}
          onLeftClick={() => this.props.history.go(-1)}>{this.props.children}</NavBar>
    )
  }
}
export default withRouter(NavHeader)
