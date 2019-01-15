import React from "react";

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString(),
      otherData: [1,2,3,4],
      cryptoData: "",
      isLoading: true
    };
  }
  
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    // Do call to get crypto arbitrage data
    
    const Http = new XMLHttpRequest();
    const url='http://localhost:3000/arbdata';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
      let responseJSON = JSON.parse(Http.responseText);
      let responseText = [];
      let bigGains = [];
      let smallGains = [];
      let losingTrades = [];
      // Set date to be Jan 1, 1970
      let mostRecentUpdate = new Date();
      mostRecentUpdate.setTime(0);
      responseJSON.sort(function(a, b){return(b.arbPercent - a.arbPercent)});
      for(let k=0; k<responseJSON.length; k++) {
      //Object.keys(responseJSON).forEach(function(k) {
        let timeStamp = new Date(responseJSON[k].timeStamp);
        if (timeStamp > mostRecentUpdate)
          mostRecentUpdate = timeStamp;
        let msg = responseJSON[k].timeStamp + " " +
          responseJSON[k].tradeInstructions;
        responseText.push(msg);
        if(responseJSON[k].urgentTrade)
          bigGains.push(msg);
        if(!responseJSON[k].urgentTrade && responseJSON[k].gainLoss==="GAIN")
          smallGains.push(responseJSON[k].tradeInstructions);
        if(responseJSON[k].gainLoss==="LOSS")
          losingTrades.push(responseJSON[k].tradeInstructions);
      //});
      }
      const timeFormatOptions = { hour12: false };
      let mostRecentUpdateStr = mostRecentUpdate.toString().substring(0,24);
      this.setState({
        time: new Date().toLocaleTimeString("en-US", timeFormatOptions),
        cryptoUrgentTrade: bigGains,
        cryptoGains: smallGains,
        cryptoLoss: losingTrades,
        isLoading: false,
        mostRecentUpdateStr
      });
    }  
  }

  getCryptoDisplay(displayData) {

    if(!displayData)
      return("Data is loading.  Please wait...");

    return(displayData);
  }

  getMostRecentUpdatetime() {
    let mostRecentUpdate = "";
    if (this.state.cryptoUrgentTrade) {
      mostRecentUpdate = this.state.cryptoUrgentTrade
    }
  }

  render() {
    let numUrgent = 0;
    if (this.state.cryptoUrgentTrade)
      numUrgent = this.state.cryptoUrgentTrade.length;    
    let numGaining = 0;
    if (this.state.cryptoGains) 
      numGaining = this.state.cryptoGains.length;
    let numLosing = 0;
    if (this.state.cryptoLoss) 
      numLosing = this.state.cryptoLoss.length;

    if (this.state.isLoading) {
      return("Loading please wait...");
    }
    else { 
      return(
        <div className="App-clock">
          The current time is: {this.state.time}.
          <br/>
          Most recent update time is: {this.state.mostRecentUpdateStr}.
          <br/>
          <p>
            <b>Urgent Trades: {numUrgent}</b><br/>
            <ul class="arb-list-urgent">
            {!this.state.isLoading && (
              this.state.cryptoUrgentTrade.map(function(listElement){
                return <li>{listElement}</li>
            }))}
            </ul>
          </p>
          <br/>
          <p>
            <b>Gaining Trades: {numGaining}</b><br/>
            <ul class="arb-list">
            {!this.state.isLoading && (
              this.state.cryptoGains.map(function(listElement){
                return <li>{listElement}</li>
            }))}
            </ul>
          </p>
          <br/>
          <p>
            <b>Losing Trades: {numLosing}</b> 
            <ul class="arb-list">
            {!this.state.isLoading && (
              this.state.cryptoLoss.map(function(listElement){
                return <li>{listElement}</li>
            }))}
            </ul>
          </p>
        </div>
      );
    }
  }
}

export default Clock;


