import React from "react";
import { PickerView, WhiteSpace } from 'antd-mobile';
import styles from "./index.module.css"
import axios from "axios"

const province = [];
export default class FilterMore extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.get_areaData()
  }
  render_area() {
    return (
      <div className={styles.areaWrapper}>
        <div className={styles.areaPickerView}>
          <PickerView
            data={province}
            value={[]}
          />
        </div>
        {/* 取消&确定 */}
        <div className={styles.handleWrapper}>
          <div className={styles.handleCancel}>取消</div>
          <div className={styles.handleConfirm}>确定</div>
        </div>
      </div>
    )
  }
  get_areaData(){
    axios({
      methods:"get",
      url:'../../../../../public/json/area.json'
    }).then((response)=>{
      console.log("获取地区数据",response)
    })
  }

  render_mode() {
    return (
      <div>选择方式</div>
    )
  }

  render_rental() {
    return (
      <div>选择租金</div>
    )
  }

  renderElm = () => {
    let renderHtml = ""
    switch (Number.parseInt(this.props.FilterIndex)) {
      case 1:
        renderHtml = this.render_area()
        break;
      case 2:
        renderHtml = this.render_mode()
        break;
      case 3:
        renderHtml = this.render_rental()
        break;
    }
    return renderHtml
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {
          this.renderElm()
        }
      </div>
    );
  }
}
