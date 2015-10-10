import React from 'react';
import {findDOMNode} from 'react-dom';
import { History } from 'react-router';

import auth from '../helpers/auth';

export default React.createClass({
  displayName: 'Login',

  propTypes: {
    location: React.PropTypes.object.isRequired,
  },

  mixins: [History],

  getInitialState() {
    return {
      error: false,
    };
  },

  handleSubmit(event) {
    event.preventDefault();

    const {location} = this.props;
    const email = findDOMNode(this.refs.email).value;
    const pass = findDOMNode(this.refs.pass).value;

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({
          error: true,
        });
      }

      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname);
      } else {
        this.history.replaceState(null, '/about');
      }
    });
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
      );
  },
});

