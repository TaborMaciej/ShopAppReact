import React, {useState, useContext} from 'react';
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App.js"
import '../css/Login.css';

function Login() {
  // eslint-disable-next-line
  const {userData, setUserData} = useContext(DataContext);
  const [email_val, setEmail] = useState("");
  const [password_val, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const navigation = useNavigate();
  const TryLogin = () => {
  
    Axios
      .post("http://localhost:3001/api/login", {email: email_val, password: password_val})
      .then((response) => {
        if (response.data === false)
          setLoginMsg("Logowanie nieudane")
          
        else{
          setUserData(response.data);
          setLoginMsg("");
          navigation("/");
        }
      })
      .catch((err) => console.log(err));
  }



  return (
      <div className="App">
        <h2 className='login'>Login</h2>
        <div className="input-box">
        <div>
          <input className='input_box' id="email_" type="email" name="email_val" placeholder='E-mail' onChange={ (e) => setEmail(e.target.value) }></input>
        </div>
        <div>
          <input className='input_box' id="password_" type="password" placeholder='Password' name="password" onChange={ (e) => setPassword(e.target.value) }></input>
        </div>
          <button onClick={ () => {TryLogin()} } className="login-button">Login</button>
        </div>
        <p className="login-message">{loginMsg}</p>
      </div>
  );
}

export default Login;
