import React, { Component } from 'react';
import './App.css';
import Clock from "./Clock";

class App extends Component {

  // Track the state of the application.
  state = {
    allPrices: "Not loaded yet.  Please wait.",
    lowestAskBTC: [],
    highestBidUSDC: [],
    USDC_BTClowestAsk: 1,
    name: "Luigi"
  }
  
  render() {
    return (
      <div className="App">
        <p className="App-intro">Crypto Arbitrage Monitoring Tool</p>
        <br/>
        <Clock></Clock>
      </div>
    );
  }
}
//<a href="https://poloniex.com" target="_blank">Poloniex</a>&nbsp; &nbsp;
//<a href="https://bittrex.com" target="_blank">Bittrex</a>&nbsp; &nbsp;
//<a href="https://hitbtc.com" target="_blank">Hitbtc</a>
export default App;
