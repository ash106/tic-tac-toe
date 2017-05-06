import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  renderSquare(i) {
    var highlightClass;
    if (this.props.squares[i] == "X") {
      highlightClass = "x-box";
    } else if (this.props.squares[i] == "O") {
      highlightClass = "o-box";
    }
    if (this.props.line.includes(i)) {
      highlightClass = "highlight-text";
    }

    var marginClass = "";
    if (i < 3) {
      marginClass = "no-top-border";
    }
    if ([0,3,6].includes(i)) {
      marginClass += " no-left-border";
    }

    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)} 
        highlightClass={highlightClass}
        marginClass={marginClass}
      />
    );
  }
  render() {    
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
