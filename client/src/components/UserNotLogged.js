import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Modal from "./Modal.js"
import Login from "./Login.js"

function UserLogged() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <ul>
        <li className="hover-animation" onClick={() => { setIsOpen(true)} }>Sign in</li>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <Login/>
        </Modal>
        <li className="hover-animation"><Link to="/register">Register</Link></li>
    </ul>   
  );
}

export default UserLogged;
