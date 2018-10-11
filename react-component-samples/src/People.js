/*!
 * This is a simple example of a stateful component with its own render() function
 *
*/

import React, { Component } from 'react';
import './App.css';

class People extends Component {

  render() {
    console.log(this.props);
    const { people } = this.props;
    const peopleList = people.map(person => {
      return (
        <div  key={ person.key } className="person">
          <div>Name: { person.name }</div>
          <div>Age: { person.age }</div>
          <div>Sex: { person.sex }</div>
        </div>
      )
    });

    return(
      <div className="people-list">
        { peopleList }
      </div>
    )
  }
}

export default People;
