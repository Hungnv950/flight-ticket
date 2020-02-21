import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <div>
          {/* <Navbar /> */}
          <Component {...props} />
          <Footer />
        </div>
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.id
});

export default connect(mapStateToProps)(PublicRoute);