import React, {useContext} from "react";
import {Link} from "react-router-dom";
import CartIMG from "../imgs/cart-img.svg";
import GlassIMG from "../imgs/glass-img.svg";
import { userDataContext } from "../App.js"
import "../css/Header.css"
import UserLogged from "./UserLogged";
import UserNotLogged from "./UserNotLogged";

function Header(){
    const {userData, setUserData} = useContext(userDataContext);

    return(
     <nav className="nav-bar">        
        <Link to="/"><img src="#" alt="Company logo" className="nav-logo"/></Link>
        <div className="right-nav">
            
            <input className="serach-bar" type="text"/>
            <button type="submit"><img className="nav-img"src={GlassIMG} alt="search"></img></button>

            <Link to="/Cart"><img className="nav-im" src={CartIMG} alt="Cart"/></Link>

            {userData.Nazwa ? 
                <UserLogged />
                :
                <UserNotLogged />
            }
           
        </div>
    </nav>
    );
}

export default Header;