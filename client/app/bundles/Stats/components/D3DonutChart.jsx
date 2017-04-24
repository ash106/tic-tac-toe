import React from 'react';
import {Motion, spring} from 'react-motion';
import d3 from "d3";
import { Container, Row, Col, Card, Button, CardTitle, CardText } from 'reactstrap';

export default class D3DonutChart extends React.Component {
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { data: props.data };
  }

  componentWillMount() {
    var self = this;
    if (typeof App !== 'undefined'){
      App.messages = App.cable.subscriptions.create('GamesChannel', {  
        received: function(data) {
          return self.setState({ data: data.stats });
        }
      });
    }
  }

  render() {
    var width = 300,
        height = 300,
        radius = Math.min(width, height) / 2;
    
    var color = d3.scale.category10();
    
    var pie = d3.layout.pie()
        .value(d => d)
        .sort(null);
    
    var arc = d3.svg.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 20);
        
    var displayedData = pie(this.state.data);
        
    return <div>
        <Container>
          <Row>
            <Col md={{ size: 4, offset: 4 }}>
              <Card block>
                <CardTitle className="text-center">Wins</CardTitle>
                <CardText className="text-center">
                  <svg width={width} height={height}>
                    <g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
                      {displayedData.map((slice, i) =>
                        <Motion
                          key={i}
                          defaultStyle={{
                            startAngle: slice.startAngle,
                            endAngle: slice.endAngle,
                            padAngle: slice.padAngle,
                          }}
                          style={{
                            startAngle: spring(slice.startAngle),
                            endAngle: spring(slice.endAngle),
                            padAngle: spring(slice.padAngle)
                          }}>{value => <path
                            fill={color(i)}
                            d={arc(value)} />
                          }</Motion>
                      )}
                    </g>
                  </svg>
                </CardText>
                <Row>
                  <Col sm="6" className="text-right">
                    <h3 className="x-label">X:</h3>
                    <h3 className="o-label">O:</h3>
                  </Col>
                  <Col sm="6">
                    <h3>{this.state.data[0]}</h3>
                    <h3>{this.state.data[1]}</h3>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
        
      </div>;
  }
}
