import React from 'react';
import ReactOnRails from 'react-on-rails';
import Game from '../components/Game';

export default class GameContainer extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill("")
      }],
      xIsNext: true,
      stepNumber: 0,
      status: 'Next player: X',
      restartButtonVisible: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }
  handleClick(i) {
    const squares = this.currentSquares();
    let status;
    let restartButtonVisible = this.state.restartButtonVisible;
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const winner = this.calculateWinner(squares);
    if (winner) {
      status = 'Winner: ' + winner;
      restartButtonVisible = true;
    } else {
      status = 'Next player: ' + (!this.state.xIsNext ? 'X' : 'O');
    }
    this.setState({
      history: this.state.history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.history.length,
      status: status,
      restartButtonVisible: restartButtonVisible
    });
  }
  currentSquares() {
    const current = this.state.history[this.state.stepNumber];
    const squares = current.squares.slice();
    return squares;
  }
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  handleRestart() {
    this.setState({
      history: [{
        squares: Array(9).fill("")
      }],
      xIsNext: true,
      stepNumber: 0,
      status: 'Next player: X',
      restartButtonVisible: false
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const current = this.state.history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    if (winner) {
      $.ajax({
        url:'/games',
        type:'POST',
        dataType:'json',
        data:{
            game: {winner: winner,  history: this.state.history}
        }
      });
    }
  }
  render() {
    return (
      <Game 
        status={this.state.status} 
        handleClick={this.handleClick} 
        history={this.state.history}
        stepNumber={this.state.stepNumber}
        xIsNext={this.state.xIsNext}
        squares={this.currentSquares()}
        handleRestart={this.handleRestart}
        restartButtonVisible={this.state.restartButtonVisible}
      />
    );
  }
}
