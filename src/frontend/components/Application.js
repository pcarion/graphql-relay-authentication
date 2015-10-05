import React from 'react';

export default class Application extends React.Component {
  render() {
    return (
      <div>
        text:{ this.props.example.text },
        version:{ this.props.example.version },
        id:{ this.props.example.id }
      </div>
    );
  }
}