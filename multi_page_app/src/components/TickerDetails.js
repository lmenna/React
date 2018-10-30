/**
 * @title TickerDetails.js
 * React component to display details for a single ticker.  It is accessed using
 * route parameters in the URL.
 */

import React, {Component} from 'react'

class TickerDetails extends Component {

  state = {
    ticker: null
  }

  componentDidMount() {
    var ticker = this.props.match.params.ticker;
    this.setState({
      ticker: ticker
    });
  }

  render() {
    return(
      <div className="container">
        <h4>{this.state.ticker}</h4>
        </div>
    );
  }

}

export default TickerDetails;
