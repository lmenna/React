/*!
 * This is a simple example of a functional component that just displays data passed
 * into it but doesn't contain state.
 *
 *  This seperates the UI from the system state
*/

import React from 'react';
import './App.css';

const PeopleFunc = (props) => {

    console.log(props);
    const { people } = props;
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

export default PeopleFunc;
