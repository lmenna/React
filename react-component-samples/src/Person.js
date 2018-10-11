import React, { Component } from 'react';
import './App.css';

class Person extends Component {

  render() {
    console.log(this.props);
    const { name, age, sex } = this.props;
    return(
      <div className="person">
        <div>Name: { name }</div>
        <div>Age: { age }</div>
        <div>Sex: { sex }</div>
      </div>
    )
  }
}

export default Person;
