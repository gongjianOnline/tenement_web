import React from "react"
import FilterTitle from "../FilterTitle"
import FilterMore from "../FilterMore"

export default class Filter extends React.Component{
  constructor(props){
    super(props)
    this.state={
      filterIndex:1
    }
  }
  getFilterIndex=(data)=>{
    this.setState({
      filterIndex:data
    })
  }
  render(){
    return (
      <div>
        <FilterTitle getFilterIndex={this.getFilterIndex}/>
        <FilterMore FilterIndex={this.state.filterIndex}/>
      </div>
    )
  }
}