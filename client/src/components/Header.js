import React from "react";
import {Link} from "react-router-dom";
import CartIMG from "../imgs/cart-img.svg";
import GlassIMG from "../imgs/glass-img.svg";
import UserIMG from "../imgs/user-img.svg";

function Header(){
    return(
        <nav className="nav-bar">
            <div className="nav-right-box">
                <Link to="/"><img src="#" alt="Company logo" className="nav-logo"/></Link>
            </div>

            <div className="nav-left-box">
                    <div className="search-bar">
                        <img src="#" alt="Search"/>
                        <input type="text"/>
                    </div>
                    <Link to="/Cart"><img src={CartIMG} alt="Cart"/></Link>
                    <Link to="/Login"><img src={UserIMG} alt="User"/>Sign in</Link>
            </div>
        </nav>

    );
}

export default Header;