import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Header from "./components/Header.js"
import Cart from "./components/Cart.js"
import Orders from "./components/Orders.js"
import EmployeeOrders from './components/EmployeeOrders.js';
import AddProduct from './components/AddProduct.js';

const DataContext = createContext();

let CartAdd, CartChangeAmount


function App() {
  // eslint-disable-next-line
  const [cartState, setCartState] = useState([]);
  CartAdd = (gameID, productID) => {
    
    for (let i = 0; i < cartState.length; i++){
      if (cartState[i].ProductID === productID){
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
        if(newCartState[i].Amount + amount > gameData[gameID].Platformy[productID].Ilosc_sztuk )
          return false

        newCartState[i].Amount += amount
      }
    }
  
    setCartState(newCartState.filter((item) => item.Amount > 0));
    return true
  }

  const [searchInput, setSearchInput] = useState("")

  const [userData, setUserData] = useState({});
  const value = { userData, setUserData, gameData, SetGameData }
  return (
    <DataContext.Provider value={value}>
      <Router>
        <Header searchInput={searchInput} setSearchInput= { setSearchInput }/>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cart" element={<Cart itemState={cartState} />} />
            <Route exact path="/" element={<Home searchInput={searchInput}/>} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/orders" element={<Orders/>} />
            <Route exact path="/employee-orders" element={<EmployeeOrders/>} />
            <Route exact path="/employee-add" element={<AddProduct/>} />
          </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
export { DataContext };
export { CartAdd };
export { CartChangeAmount };
