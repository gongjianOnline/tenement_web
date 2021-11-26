/*eslint-disable */
import React from "react"
import {Flex,Icon} from "antd-mobile"
import {withRouter} from "react-router-dom"
import "./index.scss"
import propTypes from "prop-types"
import { defaultProps } from "antd-mobile/lib/search-bar/PropsType"

const handelClick = (history)=>{
  history.push('/cityList')
}
const handelMap = (history)=>{
  history.push('/map')
}


function SearchHeader({history,cityName,className}) {
  return (
    <div className={['SearchBox',className||""].join(" ")}>
      <Flex justify="around">
        <div className="inpurtWrapper">
          <Flex>
            <div className="inpurtWrapperItem placeTitle" onClick={()=>handelClick(history)}>
              {cityName}
              <Icon type="down" size="xs" className="placeIcon" />
            </div>
            <div className="inpurtWrapperItem SearchInput">
              <input type="text" placeholder="请输入小区或地址" />
            </div>
          </Flex>
        </div>
        <div className="iconWrapper" onClick={()=>handelMap(history)}>
          <svg className="icon iconItem" aria-hidden="true">
            <use xlinkHref="#icon-ditu"></use>
          </svg>
        </div>
      </Flex>
    </div>
  )
}

SearchHeader.propTypes = {
  cityName:propTypes.string.isRequired
}

export default withRouter(SearchHeader)