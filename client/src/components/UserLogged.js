import React, {useContext, useState} from 'react';
import User from "../imgs/user.png";
import { DataContext } from "../App.js"
import Modal from './Modal.js'
import { useNavigate } from 'react-router-dom';

function UserLogged() {    
    const {userData, setUserData} = useContext(DataContext);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [isWorkBoxOpen, setIsWorkBoxOpen] = useState(false);
    const navigation = useNavigate();

    const Logout = () =>{
        setIsLogoutOpen(false)
        setUserData({});
        navigation("/")
    }


    return (
        <ul className="nav-bar">
            <li className="hover-animatio">{"Witaj, " + userData.Nazwa}</li>
            <li className="hover-animation sign-out" onClick={() => setIsWorkBoxOpen(true)}> <p className='box-animation'><img src={User} alt="user" className="user_work"/></p></li>
            <Modal open={isWorkBoxOpen}  onClose={() => setIsWorkBoxOpen(false)}>
                {userData.isEmployee ? 
                    (
                        <>
                        <button onClick={() => {  setIsWorkBoxOpen(false);  navigation("/employee-orders")}}  className='butt'><p className='ins'>Zamówienia</p></button>
                        <button onClick={() => {  setIsWorkBoxOpen(false);  navigation("/employee-add")}} className='butt'><p className='ins'>Dodawanie produktów</p></button>
                        <button onClick={() => {  setIsWorkBoxOpen(false);  navigation("/employee-add-game")}} className='butt'><p className='ins'>Dodawanie gry</p></button>
                        </>
                    )
                    :
                    (
                        <button onClick={() => {  setIsWorkBoxOpen(false);  navigation("/orders")}}  className='butt'><p>Moje Zamówienia</p></button>
                    )
                }
                <button onClick={() => setIsLogoutOpen(true)} className='butt'><p>Wyloguj mnie</p></button>
            </Modal>
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
