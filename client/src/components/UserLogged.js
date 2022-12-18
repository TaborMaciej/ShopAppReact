import React, {useContext} from 'react';
import UserIMG from "../imgs/user-img.svg";
import { userDataContext } from "../App.js"

function UserNotLogged() {    
    const {userData, setUserData} = useContext(userDataContext);

    const Logout = () =>{
        setUserData({});
    }

    return (
        <ul>
            <li className="hover-animation">{"Witaj, " + userData.Nazwa}</li>
            <li className="hover-animation"><img className="nav-im" src={UserIMG} alt="User"/></li>
            <li className="hover-animation" onClick={Logout}>Sign out</li>
        </ul>
    );
}

export default UserNotLogged;
