import React, {useContext} from 'react'
import { DataContext } from "../App.js"
import "../css/Cart.css"
//(gameID, productID, amount)
const ChangeAmount = (amount, ID) =>{

  import("../App.js").then( func =>{
      func.CartChangeAmount(amount, ID)
  })
}

function Cart(itemState) {
  const { gameData } = useContext(DataContext);

  //If cart empty \/
  if (itemState.itemState.length <= 0)
    return (
      <div>
        <h1>EMPTY!!!</h1>
      </div>
    )


  //If cart not empty \/
  return (
    <div>
      <ul className="list-cart">
      {Object.keys(itemState.itemState).map(key => {
        const { GameID, ProductID, Amount } = itemState.itemState[key];
        return (
        <li key={key}>
          
          <img src={ require("../imgs/okladki_gier/" + gameData[GameID].Path) } alt={"Zdjecie gry: " + gameData[GameID].Nazwa_gry} className="cart-img"/>
          <p>{ gameData[GameID].Nazwa_gry}</p>
          <p>{ gameData[GameID].Platformy[ProductID].Platforma}</p>
          <p>{ gameData[GameID].Platformy[ProductID].Cena_sprzedazy}</p>
          <button onClick={() => {ChangeAmount(-1, ProductID)}}>-</button>
          <p>{ Amount }</p>
          <button onClick={() => {ChangeAmount(1, ProductID)}}>+</button>
          <button onClick={() => {ChangeAmount(Amount * -1, ProductID)}}>Delete</button>
        </li>
        )
        })}
      </ul>
    </div>
  );
}

export default Cart;
