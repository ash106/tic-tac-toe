import React from 'react';
import Stats from '../components/Stats';

export default class StatsContainer extends React.Component {
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { data: this.props.data };
  }

  componentWillMount() {
    var self = this;
    if (typeof App !== 'undefined'){
      App.messages = App.cable.subscriptions.create('GamesChannel', {  
        received: function(data) {
          console.log("data received");
          return self.setState({ data: data.stats });
        }
      });
    }
  }

  render() {        
    return <Stats data={this.state.data} />
  }
}
