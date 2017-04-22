import ReactOnRails from 'react-on-rails';

import HelloWorld from '../components/HelloWorld';
import Square from '../components/Square';
import Board from '../components/Board';
import Game from '../components/Game';
import D3DonutChart from '../components/D3DonutChart';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  Square,
  Board,
  Game,
  D3DonutChart
});
