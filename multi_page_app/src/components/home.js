import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

class Home extends Component {

  state = {
      market: [],
      displayedMarketTickers: ['USDT_BTC','USDT_ETH','BTC_DGB','BTC_ETH'],
      allTickers: []
  };

  componentDidMount() {
    axios.get('https://poloniex.com/public?command=returnTicker')
      .then(res => {
        var allTickers = [];
        for (let elem in res.data) {
          allTickers.push(elem);
        }
        console.log("allTickers:", allTickers);
        var market = this.state.displayedMarketTickers.map(ticker => {
          var retItem = res.data[ticker];
          retItem["ticker"] = ticker;
          return(retItem);
        }
        );
        this.setState({
          market: market,
          allTickers : allTickers
        });
      });
  }

  render() {
    const { market } = this.state;
    console.log("market:", market);
    const marketList = market.map(ticker => ticker.id ? (
          <div className="post card" key={ticker.id}>
          <div className="card-content">
            <Link to={'/details/' + ticker.ticker}>
            <span className="card-title">{ticker.ticker} Last Price: {ticker.last}</span>
            </Link>
          </div>
          </div>
    ) : (
      <div className="center">Market loading.  Please wait...</div>
    ));
    console.log("allTickers:", this.state.allTickers);

    const allTickers = this.state.allTickers.map(ticker => ticker ? (
          { label: ticker, value: ticker }
    ) : (
      <div className="center">Market loading.  Please wait...</div>
    ));
    return (
      <div className="container">
        <br/>
        {marketList}
        <br/>

        <div className="container">
          <Select options={allTickers} />
        </div>
      </div>
    );
  }
}

export default Home;
