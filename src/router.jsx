import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { history } from "./store.js";
import App from "./containers/main/App";
import Home from "./components/Home";
import {Appointment} from "./containers/appointement/Appointment";
import NotFound from "./components/NotFound";

const router = (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/appointment" component={Appointment}/>
        <Route path="/404" component={NotFound}/>
        <Redirect to="/404"/>
      </Switch>
    </App>
  </Router>
);

export { router };