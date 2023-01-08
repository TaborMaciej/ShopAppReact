import React, {useContext, useState} from 'react'
import { DataContext } from "../App.js"
import "../css/Cart.css"
import Axios from 'axios'
import Modal from '../components/Modal.js'

const ChangeAmount = (amount, productID, gameID, callback) =>{

  import("../App.js").then( func =>{
      const result = func.CartChangeAmount(amount, productID, gameID)
      callback(result)
  })
}

const checkAvailability = (products_, callback) =>{

  Axios
  .post("http://localhost:3001/api/available", {products: products_})
  .then((response) => {
    callback(response.data)
  })
  .catch((err) => console.log(err));
}

const PlaceOrder = (products_, user_, callback) =>{

  Axios
  .post("http://localhost:3001/api/order", {products: products_, user: user_})
  .then((response) =>{
      console.log(response)
      callback(response.data)
  })
  .catch((err) => console.log(err))
}


function Cart(itemState) {
  const { gameData, userData } = useContext(DataContext);
  const [openAmountTooBig, SetAmountTooBig] = useState(false)
  const [openAvailable, SetOpenAvailable] = useState(false)
  const [openError, SetOpenError] = useState(false)
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
        <li className='list' key={key}>
          
          <img src={ require("../imgs/okladki_gier/" + gameData[GameID].Path) } alt={"Zdjecie gry: " + gameData[GameID].Nazwa_gry} className="cart-img"/>

          <span className='title'>{ gameData[GameID].Nazwa_gry}</span>
          
          <p className='inf'>Platforma: { gameData[GameID].Platformy[ProductID].Platforma}</p>
          <p className='inf'> { Amount * gameData[GameID].Platformy[ProductID].Cena_sprzedazy} zł</p>
          <button className='change_amount' onClick={() => {ChangeAmount(-1, ProductID, GameID, result => (result) )}}>-</button>
          <span className='amount'>{ "Ilosc sztuk: " + Amount }</span>
          <button className='change_amount' onClick={() => {ChangeAmount(1, ProductID, GameID, result => { SetAmountTooBig(!result) })}}>+</button>
          <button className='change_amount' onClick={() => {ChangeAmount(Amount * -1, ProductID, GameID, result => (result))}}>Delete</button>
        </li>
        )
      })}
      </ul>
      <button onClick={() => {checkAvailability(itemState.itemState, response => {
        if (!response) SetOpenAvailable(true)
        else PlaceOrder(itemState.itemState, userData, response => {SetOpenError(!response)}) 
      })}}>Zamow produkty</button>
      <Modal open={openAmountTooBig} onClose={() => { SetAmountTooBig(false) }}>
        <p>Osiągnięto maksymalną ilość sztuk tego produktu</p>
      </Modal>

      <Modal open={openAvailable} onClose={() => { SetOpenAvailable(false) }}>
        <p>Wybrane produkty są niedostępne</p>
      </Modal>

      <Modal open={openError} onClose={() => { SetOpenError(false) }}>
        <p>Wystąpił błąd podczas składania zamówienia</p>
      </Modal>

    </div>
  );
}

export default Cart;
