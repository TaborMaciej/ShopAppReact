import React from 'react';
import {Link} from "react-router-dom";

function UserLogged() {
  return (
    <ul>
        <li className="hover-animation"><Link to="/login">Sign in </Link></li>
        <li className="hover-animation"><Link to="/register">Register</Link></li>
    </ul>   
  );
}

export default UserLogged;
