import React from 'react';
import { Container, Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import D3DonutChart from './D3DonutChart';
import ChartLabel from './ChartLabel';

export default class Stats extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md={{ size: 4, offset: 4 }}>
              <Card block>
                <CardTitle className="text-center">Wins</CardTitle>
                <CardText className="text-center">
                  <D3DonutChart data={this.props.data} />
                </CardText>
                <ChartLabel label="X" data={this.props.data[0]} />
                <ChartLabel label="O" data={this.props.data[1]} />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } 
}
