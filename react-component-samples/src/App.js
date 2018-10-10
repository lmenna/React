/*!
 * React JavaScript application sample.
 *
 * This app was created using,
 * npx create-react-app polo-exchange
 *
 * To run the application use,
 * npm start
 *
 * This has a collection of various usefull examples of how react works and
 * can be used to build web applications.  The examples here can be used as building
 * blocks to quickly build up a react application.
 */

import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();
  }

  // Track the state of the application.
  state = {
    name: 'Luigi',
    age: 30,
    allPrices: 'Not loaded yet.  Please wait.'
  }

  // Show how a button click can be used to modify the application state.
  handleClick = (e) => {
    console.log(e.target);
    console.log(this.state);
    this.setState(
      {
        name: "Yoshi"
      });
  }

  // Show how a onMouseOver event works
  handleMouseOver = (e) => {
    console.log(e);
  }

  // Show how we can protect data by catching when someone is trying to copy it
  handleCopy = (e) => {
    console.log("Please don't make a copy");
  }

  // Show how we can track use input from the keyboard character by character as they type
  // This also updates the state and other parts of the screen based on the user entry
  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  // Form submission example with page refresh suppressed.
  handleSubmit = (e) => {
      e.preventDefault();
      console.log('form submitted', this.state.name);
  }

  // Using the componentDidMount() react method to asynchronously load
  // crypto market data from poloniex using their https JSON service
  // Note the strange method used to store the "var that=this" to store the this pointer for later use
  componentDidMount() {
    console.log("BEGIN: componentDidMount()");
    const Http = new XMLHttpRequest();
    const url = "https://poloniex.com/public?command=returnTicker";
    var exchangeData = "start";
    let name = "nope";
    Http.open("GET", url);
    Http.send();
    console.log("Http.send(", url, ")");
    var that = this;
    Http.onreadystatechange = function() {
      if (this.readyState===4 && this.status===200) {
        exchangeData = Http.responseText;
        console.log(exchangeData);
        that.setState( {allPrices : exchangeData });
      }
    }
  }


  // Boiler plate render function created when
  render() {
    return(
      <div className="app-content">
        <p>Name: {this.state.name}</p>
        <p>The age is: {this.state.age}</p>
        <button onClick={this.handleClick}>Click Me</button>
        <button onMouseOver={this.handleMouseOver}>Hover Me</button>
        <p onCopy={this.handleCopy}>What we think, we become</p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange}/>
          <button>Submit</button>
        </form>
        <h1>Check the prices</h1>
        {this.state.allPrices}
      </div>
    );
  }


}


export default App;