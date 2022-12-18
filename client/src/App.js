import React, { createContext, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Header from "./components/Header.js"
import Cart from "./components/Cart.js"
import Footer from "./components/Footer.js"

const userDataContext = createContext();

function App() {

  const [userData, setUserData] = useState({});
  const value = useMemo(
    () => ({ userData, setUserData }), 
    [userData]
  );
  return (
    <userDataContext.Provider value={value}>
      <Router>
        <Header />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        <Footer />   
      </Router>
    </userDataContext.Provider>
  );
}

export default App;
export { userDataContext };
