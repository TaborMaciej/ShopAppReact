import Axios from 'axios';

import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../css/Register.css'
import Page1 from './register_components/Page1';
import Page2 from './register_components/Page2';
import Page3 from './register_components/Page3';
import Modal from '../components/Modal.js'

function Register() {
  const [registerData, setRegisterData] = useState(
    {
      //Personal Details
      Name: "",
      LastName: "",
      Phone: "", //Null
      Birthday: "", //Null
      //Address
      Street: "",
      Zip: "",
      Building: "",
      House: "", //Null
      City: "",
      Voivodeship: 1,
      //Login information
      Email: "",
      Password: ""
    }
  ) 


  const [ pageIndex, setPageIndex] = useState(0)
  const pages =
  [
    <Page1 registerData={registerData} setRegisterData={(data) => {setRegisterData(data)}}/>,
    <Page2 registerData={registerData} setRegisterData={(data) => {setRegisterData(data)}}/>,
    <Page3 registerData={registerData} setRegisterData={(data) => {setRegisterData(data)}}/>
  ]

  const PrevPage = () =>{
    if (pageIndex <= 0)
      return
    setPageIndex(pageIndex - 1)
  }



  const checkEmail = (email, callback) =>{

    Axios
    .post("http://localhost:3001/api/checkEmail", {email: email})
    .then((response) => {
      callback(response.data)
    })
    .catch((err) => console.log(err));
  }

  const registerUser = (data, callback) =>{

    Axios
    .post("http://localhost:3001/api/register", {data: data})
    .then((response) => {
      callback(response.data)
    })
    .catch((err) => console.log(err));
  }

  const [openUserExists, setUserExists] = useState(false)
  const [openErrorRegister, setErrorRegister] = useState(false)
  const [openSuccesfulRegister, setSuccessRegister] = useState(false)

  const HandleSubmit = (event) => {
    event.preventDefault();
    if (pageIndex !== pages.length - 1){
      setPageIndex(pageIndex + 1)
      return
    }

    console.log("Submmited")
    checkEmail(registerData.Email, result =>{
      if (result){
        setUserExists(true)
        return
      }
      registerUser(registerData, result =>{
        if(!result){
          setErrorRegister(true)
          return
        }

        else
          setSuccessRegister(true)
      })

    })
  }
  const navigation = useNavigate();
  const refresh = () => window.location.reload(true)
  return (
    <div className="App">
      <h1 className='title_R'>Rejestracja</h1>

      <form className='register-form' onSubmit={(event) => {HandleSubmit(event)}}>
        {pages[pageIndex]}
        {pageIndex !== 0 && <button className='login-button' type="button" onClick={ () => {PrevPage()}}>Poprzedni</button>}
        <button className='login-button' type="submit">{pageIndex !== pages.length - 1? "Następny" : "Zarejestruj się"}</button>
      </form>
      <Modal open={openUserExists} onClose={() => { setUserExists(false) }}>
        <p className='par'>Podany e-mail jest zajęty. Spróbuj się zalogować.</p>
      </Modal>

      <Modal open={openErrorRegister} onClose={() => { setErrorRegister(false); refresh() }}>
        <p className='par'>Wystąpił błąd podczas rejestracji!</p>
      </Modal>

      <Modal open={openSuccesfulRegister} onClose={() => { setSuccessRegister(false); navigation("/") }}>
        <p className='par'>Pomyślnie utworzono konto</p>
      </Modal>

    </div>
  );
}


export default Register;