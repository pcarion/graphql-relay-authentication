import React from 'react';

export default class Application extends React.Component {
  render() {
    return (
      <div>
        email:{ this.props.user.email },
        id:{ this.props.user.id }
      </div>
    );
  }
}