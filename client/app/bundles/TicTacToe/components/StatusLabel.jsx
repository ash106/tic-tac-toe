import React from 'react';

export default class StatusLabel extends React.Component {
  render() {    
    return (
      <h1 className="status text-center">{this.props.status}</h1>
    );
  }
}
