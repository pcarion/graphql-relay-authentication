import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

// componets for the application
import App from './components/App';
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import About from './components/About';

import auth from './helpers/auth';

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
}

render((
  <Router>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="about" component={About} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('container'));

