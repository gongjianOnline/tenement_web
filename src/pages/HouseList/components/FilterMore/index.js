import React from "react";

export default class FilterMore extends React.Component {
  constructor(props) {
    super(props);
  }
  render_area(){
    return (
      <div>选择区域</div>
    )
  }

  render_mode(){
    return(
      <div>选择方式</div>
    )
  }

  render_rental(){
    <div>选择租金</div>
  }

  renderElm=()=>{
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
      <div>  
        {
          this.renderElm()
        }
      </div>
    );
  }
}
