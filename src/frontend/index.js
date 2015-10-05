/*global document*/
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

// purposefully calling Relay 'routes' roots (as in Query Root)
import UserRoot from './roots/UserRoot';
import Application from './containers/User';

class Root extends React.Component {
  render() {
    return (
      <Relay.RootContainer
        Component={ Application }
        route={ new UserRoot() } />
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('container')
);