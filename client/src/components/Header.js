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
                    <div className="right-nav">

                      
                        <input className="serach-bar" type="text"/>
                        <button type="button"><img className="nav-img"src={GlassIMG} alt="search"></img></button>
                     
                        <Link to="/Cart"><img className="nav-im" src={CartIMG} alt="Cart"/></Link>
                        <img className="nav-img-user" src={UserIMG} alt="User"/>     
                        <ul>
                        
                        <li className="hover-animation"><Link to="/Login">Sign in </Link></li>
                        <li className="hover-animation"><Link to="/register">Register</Link></li>
                            
                        </ul>              
                  

                    </div>
            </nav>

    );
}

export default Header;