import React from 'react';

export default class StatusLabel extends React.Component {
  render() {
    var status = this.props.status.split('');
    var spanText = status.pop();
    var highlightClass = spanText == "X" ? "x-span" : "o-span";
    if (status.length < 4) {
      highlightClass = "";
    }
    status = status.join('');
    return (
      <h1 className="status text-center">{status}<span className={highlightClass}>{spanText}</span></h1>
    );
  }
}
