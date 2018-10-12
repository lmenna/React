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
import Person from './Person';
import People from './People';
import PeopleFunc from './PeopleFunc';
import AddPeople from './AddPeople';

class App extends Component {

  constructor(){
    super();
  }

  // Track the state of the application.
  state = {
    name: 'Luigi',
    age: 30,
    allPrices: 'Not loaded yet.  Please wait.',
    people : [
      { key: 1, name: 'Person1', age: 1, sex: "F" },
      { key: 2, name: 'Person2', age: 2, sex: "F" },
      { key: 3, name: 'Person3', age: 3, sex: "M" },
      { key: 4, name: 'Person Over21', age: 30, sex: "M" }
    ],
    ageLimit: 21
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

  // React lifecycle event componentDidMount() will be used to asynchronously load
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
    console.log("Loading data from : Http.send(", url, ")");
    var that = this;
    Http.onreadystatechange = function() {
      if (this.readyState===4 && this.status===200) {
        exchangeData = Http.responseText;
        console.log(exchangeData.substring(0,250));
        that.setState( {allPrices : exchangeData });
      }
    }
    console.log("END: componentDidMount()");
  }

  // React Lifecycle method called whenever a data change resulted in a UI update
  componentDidUpdate(previousProps, previousState) {
    console.log("BEGIN: componentDidUpdate()");
    console.log("END: componentDidUpdate()");
  }

  getNextPersonKey = () => {
    var allPeople = this.state.people;
    var MaxId = 0;
    allPeople.map(person => {
      if (person.key > MaxId)
        MaxId = person.key;
    })
    MaxId++;
    return MaxId;
  }

  PersonExistsInList = (personToAdd) => {

    var Dup = false;
    this.state.people.map(person => {
      if(personToAdd === person) {
        Dup = true;
        return;
      }
    });
    return(Dup);
  }

  // Create a method to add a person to the peopleList
  // This will be passed into the AddPeople component which will call it.
  addPerson = (personToAdd) => {
    console.log("addPerson:", personToAdd);
    if (this.PersonExistsInList(personToAdd)) {
        console.log("Person:", personToAdd, " already exists.  Will not add them.")
        return;
    }
    var currentPeople = this.state.people;
    personToAdd.key = this.getNextPersonKey();
    // setState() is the only place we'd like to modify the state.
    // So we make a copy on the people in the current state and add the new person
    // to the list.
    var peopleCopy = [...currentPeople, personToAdd];
    // Now use the copy of the people list with the new person added
    // to set the state.
    this.setState({
      people: peopleCopy
    });
    console.log("NextId:", personToAdd.key);
  }

  deletePerson = (key) => {
    console.log("Delete person #", key);
    // Use filter to find and remove the correct person.
    // filter doesn't alter the original array.  It returns a new array
    // with the element removed.
    var people = this.state.people.filter( person => {
      return(person.key !== key)
    });
    this.setState({
      people: people
    });
  }

  // Boiler plate render function created when
  render() {
    return(
      <div className="app-content">

        {/* Display some basic state */}
        Display some basic state
        <p>Name: {this.state.name}</p>
        <p>The age is: {this.state.age}</p>

        {/* Use a subcomponent to store and display people */}
        Display person1 and person2
        <p>Here is a person</p>
        <Person name={this.state.name} age={this.state.age} sex="M"/>
        <p>Another person</p>
        <Person name="Someone" age="21" sex="F"/>
        <br />

        {/* Use a subcomponent to store and display people from an array*/}
        // Display people using a Component and render() function
        <People people={this.state.people}/>
        <br />

        {/* Use a stateless function to display the people*/}
        // Display people using stateless component / function
        <PeopleFunc deletePerson={this.deletePerson} people={this.state}/>
        <br />

        // Display the form contained in the AddPeople component
        <br />
        Add a person to the list.
        <AddPeople addPerson={this.addPerson}/>

        <br />
        // Test form displayed directly in the app
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
