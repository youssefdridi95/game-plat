import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";
import MainNavbar from "./components/homepage/MainNavbar";
import Spinner from "./components/layout/Spinner";


// Redux
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

const App = ({ loading, token }) => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Fragment>
      {loading && token ? (
        <Spinner />
      ) : (
        <Router>
          <MainNavbar />
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Router>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { App })(App);
