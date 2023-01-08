import React, {useContext, useState} from 'react';
//import UserIMG from "../imgs/user-img.svg";
import { DataContext } from "../App.js"
import Modal from './Modal.js'

function UserLogged() {    
    const {userData, setUserData} = useContext(DataContext);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const Logout = () =>{
        setIsLogoutOpen(false)
        setUserData({});
    }

    return (

        <ul className="nav-bar">
            <li className="hover-animatio">{"Witaj, " + userData.Nazwa + (userData.isEmployee ? " !!!": "")}</li>
            <li className="hover-animation sign-out" onClick={() => setIsLogoutOpen(true)}> <p className='box-animation'>Sign out</p></li>
            <Modal open={isLogoutOpen} onClose={() => setIsLogoutOpen(false)}>
                <h3 className='question'>Czy na pewno chcesz sie wylogowac?</h3>
                <div className='buttons'>
                <button className='but' onClick={Logout}>Tak</button>
                <button className='but' onClick={() => setIsLogoutOpen(false)}>Nie</button>
                </div>
            </Modal>
        </ul>
    );
}

export default UserLogged;
