import React from 'react';
import {Motion, spring} from 'react-motion';
import d3 from "d3";

export default class D3DonutChart extends React.Component {
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
        
    var displayedData = pie(this.props.data);
        
    return (
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
    );

  }
}
