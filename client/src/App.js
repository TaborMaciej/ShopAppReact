import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Main from "./Main.js";
import Login from "./Login.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/main" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
