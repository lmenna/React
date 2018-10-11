/*!
 * AddPeople.js
 *
 * This will implement a form to enter new people to the people peopleList
 *
 */

import React, { Component } from 'react';

class AddPeople extends Component {

  state = {
    name: null,
    age: null,
    MF : null,
    key: null
  }

  handleChange = (e) => {
      console.log(e.target.id, "=", e.target.value);
      this.setState({
        [e.target.id]: e.target.value
      });
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.addPerson(this.state);
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" onChange={this.handleChange} />
          <label htmlFor="age">Age:</label>
          <input type="text" id="age" onChange={this.handleChange} />
          <label htmlFor="MF">M/F:</label>
          <input type="text" id="MF" onChange={this.handleChange} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddPeople;
