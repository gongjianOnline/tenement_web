import React from "react"
import {Flex,Icon} from "antd-mobile"
import {withRouter} from "react-router-dom"
import "./index.scss"

const handelClick = ()=>{
  console.log("handelClick",history)
}
const handelMap = ()=>{
  console.log("handelMap",history)
}
function SearchHeader({cityName}) {
  return (
    <div className="SearchBox">
      <Flex justify="around">
        <div className="inpurtWrapper">
          <Flex>
            <div className="inpurtWrapperItem placeTitle" onClick={handelClick(history)}>
              {cityName}
              <Icon type="down" size="xs" className="placeIcon" />
            </div>
            <div className="inpurtWrapperItem SearchInput">
              <input type="text" placeholder="请输入小区或地址" />
            </div>
          </Flex>
        </div>
        <div className="iconWrapper" onClick={handelMap(history)}>
          <svg className="icon iconItem" aria-hidden="true">
            <use xlinkHref="#icon-ditu"></use>
          </svg>
        </div>
      </Flex>
    </div>
  )
}

export default withRouter(SearchHeader)