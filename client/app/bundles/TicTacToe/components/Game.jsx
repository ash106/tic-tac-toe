import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Container, Row, Col } from 'reactstrap';
import Board from './Board';
import StatusLabel from './StatusLabel';
import RestartButton from './RestartButton';

export default class Game extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col className="game-wrapper align-self-center">
            <RestartButton 
              restartButtonVisible={this.props.restartButtonVisible} 
              onClick={() => this.props.handleRestart()}
            />
            <div className="game justify-content-center">
              <div className="game-board">
                <Board 
                  squares={this.props.squares}
                  onClick={(i) => this.props.handleClick(i)}
                  line={this.props.line}
                />
              </div>
            </div>
            <StatusLabel status={this.props.status} />
          </Col>
        </Row>
      </Container>
    );
  }
}
