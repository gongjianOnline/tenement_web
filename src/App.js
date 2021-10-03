import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/Home"
import CityList from "./pages/CityList"

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/home" component={Home}></Route>
        <Route path="/cityList" component={CityList}></Route>
      </div>
    </Router>
  );
}

export default App;
