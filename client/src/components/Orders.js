import React, {useContext, useState} from 'react'
import { DataContext } from "../App.js"
import "../css/Cart.css"



function Orders(itemState) {    

    const { gameData, zamowienieData} = useContext(DataContext);

    if (itemState.itemState.length <= 0)
    return (
      <div>1
        <h1 className='error'>Brak zamówień, zamów coś! :D</h1>
      </div>
    )

    return (

        <div>
            <div className='pagee'>
                <ul className="list-cart">
                    {Object.keys(itemState.itemState).map(key => {
                    const { GameID, ProductID, Amount } = itemState.itemState[key];
            return (
            <li className='list' key={key}>

            <img src={ require("../imgs/okladki_gier/" + gameData[GameID].Path) } alt={"Zdjecie gry: " + gameData[GameID].Nazwa_gry} className="cart-img"/>
            <span className='title'>{ gameData[GameID].Nazwa_gry}</span>
            <p className='inf'>Platforma: { gameData[GameID].Platformy[ProductID].Platforma}</p>
            <p className='inf'> { Amount * gameData[GameID].Platformy[ProductID].Cena_sprzedazy} zł</p>
            <span className='amount'>{ "Ilosc sztuk: " + Amount }</span>
      </li>
      )
    })}
                 </ul>
            </div>
        </div>
            );
        }

export default Orders;
