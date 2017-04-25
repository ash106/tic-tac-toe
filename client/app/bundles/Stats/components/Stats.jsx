import React from 'react';
import { Container, Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import D3DonutChart from './D3DonutChart';
import ChartLabel from './ChartLabel';

export default class Stats extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={{ size: 4, offset: 4 }} className="align-self-center">
            <h3 className="stats-label text-center">Wins</h3>
            <div className="chart-wrapper text-center">
              <D3DonutChart data={this.props.data} />
            </div>
            <ChartLabel label="X" data={this.props.data[0]} />
            <ChartLabel label="O" data={this.props.data[1]} />
          </Col>
        </Row>
      </Container>
    );
  } 
}
