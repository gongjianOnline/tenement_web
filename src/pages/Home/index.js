
/*eslint-disable */
import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route } from "react-router-dom"
import { TabBar } from 'antd-mobile';
import "./index.css"
import News from "../News"
import Index from "../Index";
import HouseList from "../HouseList";
import Profile from "../Profile";


const tatItems = [
  {
    title:"首页",
    icon:"icon-ind",
    path:"/home"
  },
  {
    title:"找房",
    icon:"icon-findHouse",
    path:"/home/houseList"
  },
  {
    title:"资讯",
    icon:"icon-ind",
    path:"/home/news"
  },
  {
    title:"我的",
    icon:"icon-my",
    path:"/home/profile"
  },
]
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.location.pathname
    };
  }
  renderTabBarItem = ()=>{
    return tatItems.map((item)=>{
      return (
        <TabBar.Item
          title={item.title}
          key={item.title}
          icon={<i className={`iconfont ${item.icon}`}></i>}
          selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
          selected={this.state.selectedTab === item.path}
          onPress={() => {
            this.setState({
              selectedTab: item.path,
            });
            this.props.history.push(item.path)
          }}
          data-seed="logId"
        >
        </TabBar.Item>
      )
    })
  }
  componentDidUpdate(prevPros){
    if(prevPros.location.pathname !== this.props.location.pathname){
      this.setState(()=>{
        return{
          selectedTab:this.props.location.pathname
        }
      })
    }
  }
  render() {
    return (
      <div className="home">
        {/* 渲染子路由 */}
        <Route path="/home/news" component={News}></Route>
        <Route exact path="/home" component={Index}></Route>
        <Route path="/home/houseList" component={HouseList}></Route>
        <Route path="/home/profile" component={Profile}></Route>
        <TabBar
          tintColor="#21b97a"
          barTintColor="white"
        >
          {this.renderTabBarItem()}
        </TabBar>

      </div>
    )
  }
}
export default Home