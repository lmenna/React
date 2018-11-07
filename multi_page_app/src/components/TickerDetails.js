/**
 * @title TickerDetails.js
 * React component to display details for a single ticker.  It is accessed using
 * route parameters in the URL.
 */

import React, {Component} from 'react'
import axios from 'axios';
import './table.css';

class TickerDetails extends Component {

  state = {
    ticker: null,
    marketDetailsAsks: null,
    marketDetailsBids: null,
    marketDetailsFrozen: null
  }

  componentDidMount() {
    var ticker = this.props.match.params.ticker;

    var URL = "https://poloniex.com/public?command=returnOrderBook&currencyPair=";
    URL += ticker;
    URL += "&depth=10";
    console.log("Loading URL:", URL);
    axios.get(URL)
      .then(res => {
        console.log(res);
        this.setState({marketDetailsAsks: res.data.asks});
        this.setState({marketDetailsBids: res.data.bids});
        this.setState({marketDetailsFrozen: res.data.isFrozen});
      }
    );
    this.setState({
      ticker: ticker
    });
  }

  getListFromArray(Ary) {
      if(!Ary)
        return([]);
      return(Ary.map((value, index) => {
          return( <tr key={index} className="inner1">
          <td className="inner1">{value[0]}</td><td className="inner1">{value[1]}</td>
          </tr> )
      }))
  }

  displayFrozen = (IsFrozen) => {

    return(IsFrozen ?
      "Market is FROZEN" :
      "Market is OPEN");
  }

  render() {
    return(
      <div className="container">
        <h4>{this.state.ticker}</h4>
        <br/>
        <table>
        <tbody>
        <tr><th className="top">SELL Orders</th><th className="top">BUY Orders</th></tr>
        <tr>
        <td>
          <table className="inner1">
          <tbody>
          <tr className="inner1"><th className="inner1">Ask</th><th className="inner1">Depth</th></tr>
          {this.getListFromArray(this.state.marketDetailsAsks)}
          </tbody>
          </table>
        </td>
        <td>
          <table className="inner1">
          <tbody>
          <tr className="inner1"><th className="inner1">Bids</th><th className="inner1">Depth</th></tr>
          {this.getListFromArray(this.state.marketDetailsBids)}
          </tbody>
          </table>
        </td>
        </tr>
        </tbody>
        </table>
        <br/>
        <p>{this.displayFrozen(this.state.marketDetailsFrozen===1)}</p>
        </div>
    );
  }

}

export default TickerDetails;
