import React from "react";
import {Link} from "react-router-dom";
import CartIMG from "../imgs/cart-img.svg";
import GlassIMG from "../imgs/glass-img.svg";
import UserIMG from "../imgs/user-img.svg";
import "../css/Header.css"

function Header(){
    return(
  
            <nav className="nav-bar">
            
            <Link to="/"><img src="#" alt="Company logo" className="nav-logo"/></Link>
                    <div className="search-bar">
                        <img className="nav-img" src={GlassIMG} alt="Search"/>
                        <input type="text"/>
                     
                        <Link to="/Cart"><img className="nav-img" src={CartIMG} alt="Cart"/></Link>
                        <img className="nav-img" src={UserIMG} alt="User"/>                   
                        <p><Link to="/Login">Sign in </Link></p>
                        <p><Link to="/register">Register</Link></p>
                  

                    </div>
            </nav>

    );
}

export default Header;