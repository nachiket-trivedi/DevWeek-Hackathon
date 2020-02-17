import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Landing from './components/Landing/Landing';
import Landing1 from './components/Landing/Landing1';
import Login from "./components/login/Login";
import Signup from "./components/Signup/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';

/*
Sarthak Component
*/

import BusinessHome from './components/BusinessHome/BusinessHome'
import DisplayMap from './components/DisplayMap/DisplayMap'

class Routes extends React.Component {
  render() {
    return (
      <Router>

        <Route exact path="/" component={Landing} />
        
        <Route path="/landing" component={Landing} />
        <Route path="/landingGooey" component={Landing1} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <Route path="/chat" component={() => {
          if (localStorage.getItem('role') == 'Admin') {
            window.location.href = "http://localhost:8080/admin?username=" + localStorage.getItem('username') + "&" + "role=" + localStorage.getItem('role') + "";
            return null;
          } else {
            window.location.href = "http://localhost:8080?username=" + localStorage.getItem('username') + "&" + "role=" + localStorage.getItem('role') + "";
            return null;
          }
        }} />

        <Route path = '/businessHome' exact component = {BusinessHome} />
        <Route path = '/displayMap' exact component = {DisplayMap} />

      </Router>

    );
  }
}
ReactDOM.render(<Routes />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
