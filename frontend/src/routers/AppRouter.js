import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from '../history'
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Search from "../components/Search";
import Cart from "../components/Cart";
import Home from "../components/Home";
import SearchResult from "../components/SearchResult";
import Booking from "../components/Booking";
import Register from "../components/Register";
import Login from "../components/Login";
import Tour from "../components/tours/Tour";
import TourDetail from "../components/tours/TourDetail";
import TourPreview from "../components/tours/TourPreview";
import TourBooking from "../components/tours/TourBooking";
import TourCheckout from "../components/tours/TourCheckout";

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/home" exact component={Home} />
      <PublicRoute exact path="/search" component={Search} />
      <PublicRoute exact path="/" component={Search} />
      <PublicRoute exact path="/search/result" component={SearchResult} />
      <PublicRoute path="/booking" component={Booking} />

      <PublicRoute path="/tours" component={Tour} />
      <PublicRoute path="/tour/:id/booking" component={TourBooking} />
      <PublicRoute path="/tour/:id/preview" component={TourPreview} />
      <PublicRoute path="/tour/:id/checkout" component={TourCheckout} />
      <PublicRoute path="/tour/:id/waiting" component={TourBooking} />
      <PublicRoute path="/tour/:id/invoice" component={TourBooking} />
      <PublicRoute path="/tour/:id" component={TourDetail} />

      <PublicRoute path="/register" component={Register} />
      <PublicRoute path="/login" component={Login} />

      <PrivateRoute path="/cart" component={Cart} />
    </Switch>
  </Router>
);

export default AppRouter;
