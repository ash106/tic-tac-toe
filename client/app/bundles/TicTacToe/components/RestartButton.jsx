import React from 'react';

export default class RestartButton extends React.Component {
  render() {   
    const visibilityClass = this.props.restartButtonVisible ? '' : 'invisible';
    return (
      <p 
        className={"restart-button text-center " + visibilityClass}
        onClick={() => this.props.onClick()}>
        <i className="fa fa-refresh fa-2x"></i>
      </p>
    );
  }
}
