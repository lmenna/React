/*!
 * React component.  Implements a form that allows adding items to the list
 * displayed on the screen.
 *
 */

import React, { Component } from 'react';

class AddItem extends Component {

  state = {
    content: ''
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  handleSubmit = (e)  => {
    e.preventDefault();
    this.props.addItem(this.state);
    this.setState({
      content: ''
    });
  }
  render()  {
    return(
    <div>
      <form onSubmit={this.handleSubmit}>
        <label>Add new item:</label>
        <input type="text" onChange={this.handleChange} value={this.state.content}/>
      </form>
    </div>
  );
  }
}

export default AddItem;
