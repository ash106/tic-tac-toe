import ReactOnRails from 'react-on-rails';

import HelloWorld from '../components/HelloWorld';
import GameContainer from '../containers/GameContainer';
import Game from '../components/Game';
import Board from '../components/Board';
import Square from '../components/Square';
import StatusLabel from '../components/StatusLabel';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  GameContainer,
  Game,
  Board,
  Square,
  StatusLabel
});
