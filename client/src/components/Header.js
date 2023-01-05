import React, {useContext, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import CartIMG from "../imgs/cart-img.svg";
import GlassIMG from "../imgs/glass-img.svg";
import { DataContext } from "../App.js"
import "../css/Header.css"
import UserLogged from "./UserLogged";
import UserNotLogged from "./UserNotLogged";




function Header(){
    
    const { userData, gameData, SetGameData } = useContext(DataContext)
    const [ searchInput, setSearchInput ] = useState("")
    const[sticky, setSticky]  = useState(false);

    useEffect(()=>{
        const handleScroll = () =>{
            setSticky(window.scrollY > 5);
        };
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    });

    const SearchGames = () => {
        console.log(gameData)
    }

    return(
     <nav className={"navbar"+ (sticky ? " sticky" : "")}>        
        <Link to="/"><img src="#" alt="Company logo" className="nav-logo"/></Link>
        <div className="right-nav">
            <input className="search-bar" type="text" name="searchInput" onChange={ (e) => setSearchInput(e.target.value) }/>
            <button onClick={SearchGames}><img className="nav-img"src={GlassIMG} alt="search"></img></button>
                

            <Link to="/Cart"><img className="nav-im" src={CartIMG} alt="Cart"/></Link>

            {userData.Nazwa ? <UserLogged /> :<UserNotLogged />}
        </div>
    </nav>
    );
}

export default Header;