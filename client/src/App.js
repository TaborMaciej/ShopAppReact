import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Header from "./components/Header.js"
import Cart from "./components/Cart.js"

const DataContext = createContext();

function App() {

  const [userData, setUserData] = useState({});
  const [gameData, SetGameData] = useState([]);
  const value = { userData, setUserData, gameData, SetGameData }
  return (
    <DataContext.Provider value={value}>
      <Router>
        <Header />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
export { DataContext };
