import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

  state = {
      market: [],
      MarketTicker: 'BTC_DGB'
  };

  componentDidMount() {
    axios.get('https://poloniex.com/public?command=returnTicker')
      .then(res => {
        this.setState({
          market: res.data[this.state.MarketTicker]
        });
      });
  }

  render() {
    const { market } = this.state;
    console.log("Market:", market);
    const marketList = market.id ? (
          <div className="post card" key={market.id}>
          <div className="card-content">
            <span className="card-title">{this.state.MarketTicker} Last Price: {market.last}</span>
          </div>
          </div>
    ) : (
      <div className="center">Market loading.  Please wait...</div>
    )
    return (
      <div className="container">
        <h4 className="center">Home</h4>
        {marketList}
      </div>
    );
  }
}

export default Home;
