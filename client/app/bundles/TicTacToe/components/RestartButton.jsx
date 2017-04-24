import React from 'react';

export default class RestartButton extends React.Component {
  render() {   
    const visibilityClass = this.props.restartButtonVisible ? '' : 'invisible';
    return (
      <p 
        className={"restart-button text-right " + visibilityClass}
        onClick={() => this.props.onClick()}>
        restart
      </p>
    );
  }
}
