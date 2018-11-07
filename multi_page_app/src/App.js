import React, { Component } from 'react';
import Navbar from './components/navbar';
import Home from './components/home';
import Contact from './components/contact';
import About from './components/about';
import { BrowserRouter, Route } from 'react-router-dom';
import TickerDetails from './components/TickerDetails'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route path='/' exact component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/about' component={About} />
        <Route path="/details/:ticker" component={TickerDetails} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
