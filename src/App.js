import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import CityList from "./pages/CityList"

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/home">首页</Link>
        <Link to="/cityList">城市选择</Link>

        <Route path="/home" component={Home}></Route>
        <Route path="/cityList" component={CityList}></Route>
      </div>
    </Router>
  );
}

export default App;
