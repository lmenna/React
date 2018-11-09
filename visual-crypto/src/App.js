/* App.js
 * desc: Responsible for displaying the React components, loading the market data
 *       and launching the D3 line chart to display data.
 *       This combined React and D3 by allowing React to control the DOM updates
 *       while using D3 to compute the rendering for visual elements displays via SVG.
 *
 */
import React, { Component } from 'react';
import './App.css';
import LineChart from './visualize/LineChart';

//import BarChart from './visualize/BarChart';
//import RadialChart from './visualize/RadialChart';
import Chart from './visualize/Chart';

class App extends Component {
  state = {
    markets: {},
    ticker: 'btc',
  };

  /* componentDidMount()
   * desc: Load the market data when the component mounts.  Market data load is asynchronous so we wait for
   *       it to finish prior to displaying results.
   *
   */
  componentDidMount() {

    Promise.all([
      fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30`),
      fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=30`),
    ]).then(responses => Promise.all(responses.map(resp => resp.json())))
    .then(([btc, eth]) => {
      // D3 takes Date objects not strings.  Convert here.
      btc.Data.forEach(day => day.date = new Date(day.time*1000));
      eth.Data.forEach(day => day.date = new Date(day.time*1000));
      var markets = {};
      markets.btc = btc.Data;
      markets.eth = eth.Data;
      this.setState({markets: markets});
    });

  }

  /* updateTicker()
   * Handles changed to the selection in the dropdown selector.  Switches ticker symbol
   * which will affect the renering later.
   */
  updateTicker = (e) => {
    console.log("updateTicker to:", e.target.value);
    this.setState({ticker: e.target.value});
  }

  /* render()
   * desc: Typical React render().  We let react control the rendering while D3 updates
   *       the visual elements in the LineChart
   */
  render() {
    const data = this.state.markets[this.state.ticker];
    console.log("render() data:", data);
    return (
      <div className="App">
        <h2>
          Crypto Currency Market Data
          <select name='ticker' onChange={this.updateTicker}>
            {
              [
                {label: 'Bitcoin', value: 'btc'},
                {label: 'Ethereum', value: 'eth'},
              ].map(option => {
                return (<option key={option.value} value={option.value}>{option.label}</option>);
              })
            }
          </select>
        </h2>
        <p>
        Sample line charts using React
        </p>
        <LineChart data={data} />
        <br />
        <Chart data={data} />
        <br />
        <p>
        Crypto market data provided by cryptocompare.com
        </p>
      </div>
    );
  }
}

export default App;
