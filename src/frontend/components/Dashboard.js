import React from 'react';

import auth from '../helpers/auth';

export default React.createClass({
  displayName: 'Dashboard',

  propTypes: {
  },

  render() {
    const token = auth.getToken();

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
      );
  },
});
