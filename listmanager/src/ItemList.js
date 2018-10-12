/*!
 *  Functional component to manage the UI for alist of items
 *
*/

import React from 'react'

const ItemList = ({items, deleteItem}) => {

  const iList = items.length ? (
    items.map(item => {
      return(
        <div className="collection-item" key={item.key}>
          <span onClick={() => {deleteItem(item.key)}}>{item.content}</span>
        </div>
      );
    })
  ) : (<p className="center">List is empty</p>);
  return(
    <div className="item collection">
      {iList}
    </div>
  )
}

export default ItemList;
