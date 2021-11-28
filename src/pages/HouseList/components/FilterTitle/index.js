import React from "react";
import styles from "./index.module.css"

export default class FillterTitle extends React.Component {
  constructor() {
    super()
  }
  handelClick(type){
    this.props.getFilterIndex(type)
  }

  render(){
    return(
      <div className={styles.wrapper}> 
        <div onClick={()=>this.handelClick("1")}>区域</div>
        <div onClick={()=>this.handelClick("2")}>方式</div>
        <div onClick={()=>this.handelClick("3")}>租金</div>
        <div onClick={()=>this.handelClick("4")}>筛选</div>
      </div>
    )
  }


}
