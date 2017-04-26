import React from 'react';

export default class NavLink extends React.Component {
  render() {
    return (
      <div className="text-center">
        <a href={this.props.link}>{this.props.name}</a>
      </div>
    );
  }
}
