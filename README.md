# Tic Tac Toe

[Demo](https://sheltered-caverns-30642.herokuapp.com/)

![React Tic Tac Toe gif](http://i.imgur.com/m2ZJmWH.gif)

## Built With

* [React](https://github.com/shakacode/react_on_rails) - Used for the views
* [Ruby on Rails](http://rubyonrails.org/) - Mainly used as an API to communicate with React containers
* [Bootstrap 4](https://reactstrap.github.io/) - Used Reactstrap to style React components
* [D3](https://d3js.org/) - Used for the donut chart on stats page
* [React Motion](https://github.com/chenglou/react-motion) - Used to animate the donut chart updates

## ActionCable and React Code

When someone wins a game, a POST request is sent to `games#create`

```jsx
// client/app/bundles/TicTacToe/containers/GameContainer.jsx

componentDidUpdate(prevProps, prevState) {
  const current = this.state.history[this.state.stepNumber];
  const winner = this.calculateWinner(current.squares);
  if (winner.name) {
    $.ajax({
      url:'/games',
      type:'POST',
      dataType:'json',
      data:{
          game: {winner: winner.name,  history: this.state.history}
      }
    });
  }
}
```

On successful save, the `create` action broadcasts updated stats to the `games` ActionCable channel

```ruby
# app/controllers/games_controller.rb

def create
  @game = Game.new(game_params)

  if @game.save
    ActionCable.server.broadcast 'games',
      winner: @game.winner,
      stats: Game.stats
    render json: @game, status: :created, location: @game
  else
    render json: @game.errors, status: :unprocessable_entity
  end
end
```

The `StatsContainer` receives the updated stats and passes them to the `Stats` component

```jsx
// client/app/bundles/Stats/containers/StatsContainer.jsx

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
  return <Stats data={this.state.data} />
}
```

The `Stats` component passes the new data to the `D3DonutChart`

```jsx
// client/app/bundles/Stats/components/Stats.jsx

<Container>
  <Row>
    <Col lg={{ size: 4, offset: 4 }} className="align-self-center">
      <h3 className="stats-label text-center">Wins</h3>
      <div className="chart-wrapper text-center">
        <D3DonutChart data={this.props.data} />
      </div>
      <ChartLabel label="X" data={this.props.data[0]} />
      <ChartLabel label="O" data={this.props.data[1]} />
      <NavLink name="game" link="/" />
    </Col>
  </Row>
</Container>
```

Where it is finally rendered using D3 and React Motion

```jsx
render() {
  var width = 290,
      height = 290,
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
```

## Getting Started

### Prerequisites

```bash
ruby -v             # 2.3.4
node -v             # 7.9.0
brew install yarn
rails -v            # 5.0.2
gem install foreman
```

### Installing

Install dependencies

```bash
bundle && yarn
```

Setup database

```bash
rails db:setup
```

Run server

```bash
foreman start -f Procfile.dev
```

[Play some tic tac toe](http://localhost:3000/)
