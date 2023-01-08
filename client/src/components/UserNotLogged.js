import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Modal from "./Modal.js"
import Login from "./Login.js"

function UserNotLogged() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ul className='nav-bar'>
        <li className="hover-animation" onClick={() => { setIsOpen(true)} }><p>Sign in</p></li>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <Login/>
        </Modal>
        <li className="hover-animation"><Link to="/register"><p>Register</p></Link></li>
    </ul>   
  );
}

export default UserNotLogged;
