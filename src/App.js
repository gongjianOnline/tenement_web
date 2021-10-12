import React from "react";
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom"
import Home from "./pages/Home"
import CityList from "./pages/CityList"
import Map from "./pages/Map";

function App() {
  return (
    <Router>
      <div className="App">
        {/* 重定向 */}
        <Route exact path="/" render={()=><Redirect to="/home"/>}/>
        <Route path="/home" component={Home}></Route>
        <Route path="/cityList" component={CityList}></Route>
        <Route path="/Map" component={Map}></Route>
      </div>
    </Router>
  );
}

export default App;
