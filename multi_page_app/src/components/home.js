import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Home extends Component {

  state = {
      market: [],
      MarketTicker: ['USDT_BTC','USDT_ETH','BTC_DGB','BTC_ETH']
  };

  componentDidMount() {
    axios.get('https://poloniex.com/public?command=returnTicker')
      .then(res => {
        var market = this.state.MarketTicker.map(ticker => {
          var retItem = res.data[ticker];
          retItem["ticker"] = ticker;
          return(retItem);
        }
        );
        this.setState({
          market: market
        });
      });
  }

  render() {
    const { market } = this.state;
    const marketList = market.map(ticker => ticker.id ? (
          <div className="post card" key={ticker.id}>
          <div className="card-content">
            <Link to={'/' + ticker.ticker}>
            <span className="card-title">{ticker.ticker} Last Price: {ticker.last}</span>
            </Link>
          </div>
          </div>
    ) : (
      <div className="center">Market loading.  Please wait...</div>
    ));
    return (
      <div className="container">
        <h4 className="center">Home</h4>
        {marketList}
      </div>
    );
  }
}

export default Home;
