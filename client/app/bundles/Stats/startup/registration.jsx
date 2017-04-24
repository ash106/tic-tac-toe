import ReactOnRails from 'react-on-rails';

import StatsContainer from '../containers/StatsContainer';
import Stats from '../components/Stats';
import D3DonutChart from '../components/D3DonutChart';
import ChartLabel from '../components/ChartLabel';

ReactOnRails.register({
  StatsContainer,
  Stats,
  D3DonutChart,
  ChartLabel
});
