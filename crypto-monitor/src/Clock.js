import React from "react";

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString(),
      otherData: [1,2,3,4],
      cryptoData: "",
      isLoading: true,
      numUrgentTrades: 0,
      numGaining: 0,
      numLosingTrades: 0
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
      let numUrgentTrades = 0;
      let numGaining = 0;
      let numLosingTrades = 0;
      const maxLosingDisplayed = 25;
      // Set date to be Jan 1, 1970
      let mostRecentUpdate = new Date();
      mostRecentUpdate.setTime(0);
      responseJSON.sort(function(a, b){return(b.arbPercent - a.arbPercent)});
      for(let k=0; k<responseJSON.length; k++) {
      //Object.keys(responseJSON).forEach(function(k) {
        let timeStamp = new Date(responseJSON[k].timeStamp);
        if (timeStamp > mostRecentUpdate)
          mostRecentUpdate = timeStamp;
        if(responseJSON[k].urgentTrade) {
          bigGains.push(responseJSON[k].tradeInstructions);
          numUrgentTrades++;
        }
        if(!responseJSON[k].urgentTrade && responseJSON[k].gainLoss==="GAIN") {
          smallGains.push(responseJSON[k].tradeInstructions);
          numGaining++;
        }
        if(responseJSON[k].gainLoss==="LOSS") {
          numLosingTrades++;
          if (numLosingTrades < maxLosingDisplayed)
            losingTrades.push(responseJSON[k].tradeInstructions);
        }
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
        mostRecentUpdateStr,
        numUrgentTrades,
        numGaining,
        numLosingTrades
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

  soundTheAlert() {
      //if you have another AudioContext class use that one, as some browsers have a limit
    var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

    //All arguments are optional:

    //duration of the tone in milliseconds. Default is 500
    //frequency of the tone in hertz. default is 440
    //volume of the tone. Default is 1, off is 0.
    //type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
    //callback to use on end of tone
    function beep(duration, frequency, volume, type, callback) {
        var oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (volume){gainNode.gain.value = volume;};
        if (frequency){oscillator.frequency.value = frequency;}
        if (type){oscillator.type = type;}
        if (callback){oscillator.onended = callback;}

        oscillator.start();
        setTimeout(function(){oscillator.stop()}, (duration ? duration : 500));
    };  

    beep();
  }


  render() {
    let numUrgent = 0;
    if (this.state.cryptoUrgentTrade) {
      numUrgent = this.state.cryptoUrgentTrade.length;
      // Alert when the size of the urgent list increases.
      if (numUrgent > this.numUrgentTrades)
      {
        this.numUrgentTrades = numUrgent;
        console.log("this.state.numUrgentAlert:", this.numUrgentTrades);
        this.soundTheAlert();
      }
      if (numUrgent===0)
        this.numUrgentTrades = 0;
    }
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
            <b>Urgent Trades: {this.state.numUrgent}</b><br/>
            <div className="grid-container">
            {!this.state.isLoading && (
              this.state.cryptoUrgentTrade.map(function(listElement){
                return <div className="grid-item-urgent">
                  {listElement.slice(0, listElement.indexOf(" "))}<br/>
                  {listElement.slice(listElement.indexOf(" ")+1)}
                </div>
            }))}
            </div>
          </p>
          <br/>
          <p>
            <b>Gaining Trades: {this.state.numGaining}</b><br/>
            <div className="grid-container">
            {!this.state.isLoading && (
              this.state.cryptoGains.map(function(listElement){
                return <div className="grid-item-gain">
                  {listElement.slice(0, listElement.indexOf(" "))}<br/>
                  {listElement.slice(listElement.indexOf(" ")+1)}
                </div>
            }))}
            </div>
          </p>
          <br/>
          <p>
            <b>Losing Trades: {this.state.numLosingTrades} (Only a subset are displayed)</b> 
            <div class="grid-container">
            {!this.state.isLoading && (
              this.state.cryptoLoss.map(function(listElement){
                return <div className="grid-item-loss">{listElement}</div>
            }))}
            </div>
          </p>
        </div>
      );
    }
  }
}

export default Clock;


