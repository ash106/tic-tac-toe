import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Container, Row, Col } from 'reactstrap';
import Board from './Board';
import StatusLabel from './StatusLabel';

export default class Game extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={{ size: 4, offset: 4 }}>
            <StatusLabel status={this.props.status} />
            <div className="game-board">
              <Board 
                squares={this.props.squares}
                onClick={(i) => this.props.handleClick(i)}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
