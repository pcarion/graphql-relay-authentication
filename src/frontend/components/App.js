import React from 'react';
import { Link } from 'react-router';

import auth from '../helpers/auth';

export default React.createClass({
  displayName: 'App',

  propTypes: {
    children: React.PropTypes.element,
  },

  getInitialState() {
    return {
      loggedIn: auth.loggedIn(),
    };
  },

  componentWillMount() {
    auth.onChange = this.updateAuth;
    auth.login();
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn,
    });
  },

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link> (authenticated)</li>
        </ul>
        {this.props.children}
      </div>
    );
  },
});
