import React, {useContext, useState} from 'react';
//import UserIMG from "../imgs/user-img.svg";
import { userDataContext } from "../App.js"
import Modal from './Modal.js'

function UserNotLogged() {    
    const {userData, setUserData} = useContext(userDataContext);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    
    const Logout = () =>{
        setIsLogoutOpen(false)
        setUserData({});
    }

    return (

        <ul className="nav-bar">
            <li className="logged-box-item">{"Witaj, " + userData.Nazwa}</li>
            {/*<li className="logged-box-item"><img className="nav-im" src={UserIMG} alt="User"/></li>*/}
            <li className="hover-animation sign-out" onClick={() => setIsLogoutOpen(true)}> <p className='box-animation'>Sign out</p></li>
            <Modal open={isLogoutOpen} onClose={() => setIsLogoutOpen(false)}>
                <h3>Czy na pewno chcesz sie wylogowac?</h3>
                <button onClick={Logout}>Tak</button>
                <button onClick={() => setIsLogoutOpen(false)}>Nie</button>
            </Modal>
        </ul>
    );
}

export default UserNotLogged;
