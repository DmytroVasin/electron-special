import React from 'react';
import { Switch, Route } from 'react-router';

import InitPage from './containers/InitPage'
import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';

export default () => (
  <Switch>
    <Route exact path="/" component={InitPage} />
    <Route exact path="/signin" component={LoginPage} />
    <Route exact path="/loggedin" component={LoggedInPage} />
  </Switch>
);
