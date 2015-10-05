import Relay from 'react-relay';

export default class extends Relay.Route {
  static path = '/';
  static queries = {
    user: (Component) => Relay.QL`
      query {
        user {
          ${Component.getFragment('user')}
        }
      }
    `
  };
  static routeName = 'UserRoute';
}