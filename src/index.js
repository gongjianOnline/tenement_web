import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import 'antd-mobile/dist/antd-mobile.css'
import './index.css';
import "./assets/fonts/iconfont.css"
import "./utils/url"


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(<App/>,document.getElementById("root"))