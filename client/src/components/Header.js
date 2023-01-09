import React, {useContext, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import CartIMG from "../imgs/Cart.png";
import { DataContext } from "../App.js"
import "../css/Header.css"
import UserLogged from "./UserLogged";
import UserNotLogged from "./UserNotLogged";
import {Helmet} from "react-helmet";
import logo from "../imgs/LogoShopp.png";
import search from "../imgs/WhiteSearch.png";
import Axios from "axios";



function Header({searchInput, setSearchInput}){
    // eslint-disable-next-line
    const { userData, gameData, SetGameData } = useContext(DataContext)
    const[sticky, setSticky]  = useState(false);

    useEffect(()=>{
        const handleScroll = () =>{
            setSticky(window.scrollY > 5);
        };
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    });

    const test = ()=>{
        Axios
        .post("http://localhost:3001/api/userOrders", {userID: userData.ID})
        .then((response) => {
          console.log(response.data)
        })
        .catch((err) => console.log(err));
    }
    return(
    <>
        <Helmet>
            {/* eslint-disable-next-line*/}
            <body className="bo" style="background: linear-gradient(90deg, rgba(32,7,47,1) 0%, rgba(19,18,18,1) 10%, rgba(19,18,18,1) 90%, rgba(32,7,47,1) 100%);"/>
        </Helmet>  

        <nav className={"navbar"+ (sticky ? " sticky" : "")}>  
            <Link to="/"><img src={logo} alt="Company logo" className="nav-logo"/></Link>
            <button onClick={() => test()}>TEST</button>
            <div className="right-nav">
                <input className="search-bar" type="text" name="searchInput" value={searchInput} onChange={ (e) => setSearchInput(e.target.value) }/>
                <button><img className="nav-img"src={search} alt="search"></img></button>
                    

                <Link to="/Cart"><img className="nav-im" src={CartIMG} alt="Cart"/></Link>

                {Object.keys(userData).length === 0 ? <UserNotLogged /> :<UserLogged /> }
            </div>
        
        </nav>
    </>
    );
}

export default Header;