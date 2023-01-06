import React from 'react';
//(gameID, productID, amount)
function Cart(itemState) {
  return (
    <div>
      <h1>Cart</h1>
      <ul>
      {Object.keys(itemState.itemState).map(key => (
        <li key={key}>{itemState.itemState[key].GameID + "///" + itemState.itemState[key].ProductID + "///" + itemState.itemState[key].Amount}</li>
        
      ))}
    </ul>
    </div>
  );
}

export default Cart;
