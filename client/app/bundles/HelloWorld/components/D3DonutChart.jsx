import React from 'react';
import {Motion, spring} from 'react-motion';
import d3 from "d3";

export default class D3DonutChart extends React.Component {
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { data: props.data };
  }

  randomData = (e) => {
    // var new_data = [ Math.random(), Math.random() ];
    // console.log(new_data);
    // this.setState({ data: new_data });

    fetch("/games", {
        accept: 'application/json',
      })
    .then(res => { return res.json(); })
    .then(j => {
      // Yay, `j` is a JavaScript object
      var new_data = [ 0, 0 ];
      for(var i = 0; i < j.length; i++) {
        if (j[i].winner === "X") {
          new_data[0] += 1;
        } else if (j[i].winner === "O") {
          new_data[1] += 1;
        }
      } 
      console.log("Fetched data " + new_data);
      // this.setState({ stats });
      this.setState({ data: new_data });
    });
  };

  render() {
    var width = 640,
        height = 300,
        radius = Math.min(width, height) / 2;
    
    var color = d3.scale.category20();
    
    var pie = d3.layout.pie()
        .value(d => d)
        .sort(null);
    
    var arc = d3.svg.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 20);
        
    var displayedData = pie(this.state.data);
        
    return <div>
        <svg width={width} height={height} onClick={this.randomData}>
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
      </div>;
  }
}