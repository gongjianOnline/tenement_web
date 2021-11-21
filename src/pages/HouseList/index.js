/*eslint-disable */
import React from "react";

// 导入导航栏组件
import SearchHeader from "../../compoents/SearchHeader"
// 获取城市信息
const {label} = JSON.parse(localStorage.getItem('hkzf_city'))
export default class HouseList extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <SearchHeader cityName="label"/>    
            </div>
        )
    }
}