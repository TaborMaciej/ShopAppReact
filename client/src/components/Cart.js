import React, {useContext, useState} from 'react'
import { DataContext } from "../App.js"
import "../css/Cart.css"
import Axios from 'axios'
import Modal from '../components/Modal.js'

const ChangeAmount = (amount, productID, gameID, callback) =>{
  let result
  import("../App.js").then( func =>{
      result = func.CartChangeAmount(amount, productID, gameID)
      callback(result)
  })
}

const PlaceOrder = (products_, user_) =>{

  Axios
  .post("http://localhost:3001/api/order", {products: products_})
  .then((response) => {
    console.log(response)
  })
  .catch((err) => console.log(err));
}

function Cart(itemState) {
  const { gameData } = useContext(DataContext);
  const [openModal, SetOpenModal] = useState(false)
  //If cart empty \/
  if (itemState.itemState.length <= 0)
    return (
      <div>
        <h1>EMPTY!!!</h1>
      </div>
    )
  console.log(gameData)
  console.log(itemState.itemState)

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
          <button onClick={() => {ChangeAmount(-1, ProductID, GameID)}}>-</button>
          <p>{ "Ilosc sztuk: " + Amount }</p>
          <button onClick={() => {ChangeAmount(1, ProductID, GameID, result => { SetOpenModal(!result) })
          }}>+</button>
          <button onClick={() => {ChangeAmount(Amount * -1, ProductID, GameID)}}>Delete</button>
        </li>
        )
      })}
      </ul>
      <button onClick={() => {PlaceOrder(itemState.itemState, 3)}}>Zamow produkty</button>
      <Modal open={openModal} onClose={() => { SetOpenModal(false) }}>
        <p>Osiagnieto maksymalna ilosc sztuk tego produktu</p>
      </Modal>

    </div>
  );
}

export default Cart;
