import React from 'react';
import { Row, Col } from 'reactstrap';

export default class ChartLabel extends React.Component {
  render() {
    return (
      <Row className="chart-label-row">
        <Col sm="6" className="text-right">
          <h3 className={this.props.label.toLowerCase() + "-label"}>{this.props.label}:</h3>
        </Col>
        <Col sm="6">
          <h3>{this.props.data}</h3>
        </Col>
      </Row>
    );
  }
}
