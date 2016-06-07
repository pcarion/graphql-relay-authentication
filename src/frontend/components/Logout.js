import React from 'react';

import auth from '../helpers/auth';

export default React.createClass({
  displayName: 'Logout',

  propTypes: {
  },

  componentDidMount() {
    auth.logout();
  },

  render() {
    return (
      <p>You are now logged out</p>
      );
  },
});
