/*!
 * React JavaScript application that allows the user to manage a simple list of items.
 *
 * This app was created using,
 * npx create-react-app listmanager
 *
 * To run the application use,
 * npm start
 *
 */

import React, { Component } from 'react';
import ItemList from './ItemList'
import AddItem from './AddItem'

class App extends Component {
  state = {
    items: [
      {key: 1, content: 'First item to keep track of.'},
      {key: 2, content: 'Second item to keep track of.'},
    ]
  }

  deleteItem = (key) => {
    console.log(key);
    var newItemList = this.state.items.filter(item => {
      return(item.key !== key);
    });
    this.setState({
      items: newItemList
    })
  }

  getNextKey(allItems) {

    var MaxId = 0;
    allItems.map(item => {
      if (item.key > MaxId)
        MaxId = item.key;
    });
    MaxId++;
    return MaxId;
  }

  addItem = (item) => {
    if (item.content!=="") {
      item.key = this.getNextKey(this.state.items);
      var newItems = [...this.state.items, item];
      this.setState({
        items: newItems
      });
    }
  }

  render() {
    return (
      <div className="itemlist-app container">
        <h1 className="center blue-text">Item List</h1>
        <ItemList items={this.state.items} deleteItem={this.deleteItem}/>
        <AddItem addItem={this.addItem}/>
      </div>
    );
  }
}

export default App;
