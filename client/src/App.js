import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Header from "./components/Header.js"
import Cart from "./components/Cart.js"

const DataContext = createContext();

let CartAdd, CartChangeAmount


function App() {
  // eslint-disable-next-line
  const [cartState, setCartState] = useState([]);
  CartAdd = (gameID, productID) => {
    
    for (let i = 0; i < cartState.length; i++){
      if (cartState[i].ProductID === productID){
        cartState[i].Amount += 1
        return
      }
    }
    cartState.push( {GameID: gameID, ProductID: productID, Amount: 1} )
  }

  
  const [gameData, SetGameData] = useState([]);

  CartChangeAmount = (amount, productID, gameID) => {


    const newCartState = [...cartState];
    for (let i = 0; i < newCartState.length; i++){
      if (newCartState[i].ProductID === productID){
        console.log(gameData[gameID].Platformy[productID].Ilosc_sztuk)
        console.log(newCartState[i].Amount + amount)
        if(newCartState[i].Amount + amount > gameData[gameID].Platformy[productID].Ilosc_sztuk ){
          console.log("PIUPIU")
          return false
        }
        newCartState[i].Amount += amount
      }
    }
  
    setCartState(newCartState.filter((item) => item.Amount > 0));
    return true
  }


  const [userData, setUserData] = useState({});
  const value = { userData, setUserData, gameData, SetGameData }
  return (
    <DataContext.Provider value={value}>
      <Router>
        <Header />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cart" element={<Cart itemState={cartState} />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
export { DataContext };
export { CartAdd };
export { CartChangeAmount };
