import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Header from "./components/Header.js"
import Cart from "./components/Cart.js"
import Footer from "./components/Footer.js"

function App() {
  return (
      <Router>
        <Header />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        <Footer />
      </Router>
  );
}

export default App;
