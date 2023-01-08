import React, {useState} from 'react';
import '../css/Login.css';


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
      Voivodeship: "",
      //Login information
      Email: "",
      Password: ""
    }
  ) 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(registerData)
  }


  return (
    <div className="App">
      <h1>Rejestracja</h1>

      <form className='register-form' onSubmit={handleSubmit}>
        <input placeholder='Imie' required type='text' onChange={e => { setRegisterData({...registerData, Name: e.target.value}) }}/>
        
        <input placeholder='Nazwisko' required type='text' onChange={e => { setRegisterData({...registerData, LastName: e.target.value}) }}/>
        
        <input placeholder='Nr telefonu' required type='text' onChange={e => { setRegisterData({...registerData, Phone: e.target.value}) }}/>
        
        <div className='date-form'>
          <label>Data urodzenia</label>
          <input required type='date' onChange={e => { setRegisterData({...registerData, Birthday: e.target.value}) }}/>
        </div>
        <input placeholder='Ulica' required type='text' onChange={e => { setRegisterData({...registerData, Street: e.target.value}) }}/>

        <input placeholder='Kod pocztowy' required type='text' onChange={e => { setRegisterData({...registerData, Zip: e.target.value}) }}/>
        
        <input placeholder='Nr domu' required type='text' onChange={e => { setRegisterData({...registerData, Building: e.target.value}) }}/>
        
        <input placeholder='Nr mieszkania' required type='text' onChange={e => { setRegisterData({...registerData, House: e.target.value}) }}/>
        
        <input placeholder='Miasto' required type='text' onChange={e => { setRegisterData({...registerData, City: e.target.value}) }}/>
        
        <input placeholder='Wojewodztwo' required type='text' onChange={e => { setRegisterData({...registerData, Voivodeship: e.target.value}) }}/>
        
        <input placeholder='Email' required type='text' onChange={e => { setRegisterData({...registerData, Email: e.target.value}) }}/>
        
        <input placeholder='Haslo' required type='text' onChange={e => { setRegisterData({...registerData, Password: e.target.value}) }}/>

        <button type="submit">Prześlij</button>
      </form>

    </div>
  );
}


export default Register;