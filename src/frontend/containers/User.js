import User from '../components/User';
import Relay from 'react-relay';

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        email,
        id
      }
    `
  }
});