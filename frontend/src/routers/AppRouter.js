import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Search from "../components/Search";
import Cart from "../components/Cart";
import Home from "../components/Home";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/home" exact component={Home} />
      <PublicRoute path="/search" component={Search} />
      {/* <PublicRoute path="/search/result" component={SearchResult} />
      <PublicRoute path="/booking" component={Booking} /> */}
      <PrivateRoute path="/cart" component={Cart} />
    </Switch>
  </Router>
);

export default AppRouter;