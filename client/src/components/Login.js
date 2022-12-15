import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import '../css/Login.css';

function Login() {

  const [email_val, setEmail] = useState("");
  const [password_val, setPassword] = useState("");

  const navigate = useNavigate();
  const TryLogin = () => {
  console.log(email_val);
  console.log(password_val);
  
  Axios
    .post("http://localhost:3001/api/login", {email: email_val, password: password_val})
    .then((response) => {
      if (response.data === true){
        console.log("Logging succesful!");
        navigate('/Main');
      }
      else
        console.log("Bledne dane!");
    })
    .catch((err) => console.log(err));
  }

  return (
      <div className="App">
        <h1>Login</h1>
        <label for="email_">E-mail</label>
        <input id="email_" type="email" name="email_val" onChange={ (e) => setEmail(e.target.value) }></input>
        <label for="password_">Haslo</label>
        <input id="password_" type="password" name="password" onChange={ (e) => setPassword(e.target.value) }></input>
        <button onClick={ TryLogin }>Login</button>
      </div>
  );
}

export default Login;
