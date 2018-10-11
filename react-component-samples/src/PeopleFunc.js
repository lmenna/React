/*!
 * This is a simple example of a functional component that just displays data passed
 * into it but doesn't contain state.
 *
 *  This seperates the UI from the system state
*/

import React from 'react';
import './App.css';

const PeopleFunc = (props) => {

    console.log("In PeopleFunc");
    console.log(props);
    const { people } = props.people;
    const ageLimit = props.people.ageLimit;
    const deletePerson = props.deletePerson;
    console.log(ageLimit);

    const peopleFuncList = people.map(person => {
      if (person.age > ageLimit) {
        return (
          <div  key={ person.key } className="person">
            <div>Name: { person.name }</div>
            <div>Age: { person.age }</div>
            <div>Sex: { person.sex }</div>
            {/* Surround the deletePerson(key) call in an annonymous function */ }
            {/* to prevent it from running till the click occurs.  */ }
            <button onClick={() => {deletePerson(person.key)}}>Delete</button>
          </div>
        )
      }
      else {
        return(null);
      }
    });

    return(
      <div className="peoplefunc-list">
        { peopleFuncList }
      </div>
    )
}

export default PeopleFunc;
