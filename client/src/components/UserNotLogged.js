import React, {useState} from 'react';
import Modal from "./Modal.js"
import Login from "./Login.js"
import Register from "./Register.js"


function UserNotLogged() {
  const [isLogin, setIsLogin] = useState(false);
  const [isReg, setIsReg] = useState(false);


  return (
    <ul className='nav-bar'>
        <li className="hover-animation" onClick={() => { setIsLogin(true)} }><p>Zaloguj się</p></li>
        <Modal open={isLogin} onClose={() => setIsLogin(false)}>
          <Login/>
        </Modal>
        <li className="hover-animation"  onClick={() => { setIsReg(true)} }><p>Zarejestruj konto</p></li>
        <Modal open={isReg} onClose={() => setIsReg(false)}>
          <Register/>
        </Modal>
    </ul>   
  );
}

export default UserNotLogged;
