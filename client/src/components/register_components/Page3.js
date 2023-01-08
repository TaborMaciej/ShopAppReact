import React from 'react'

export default function Page3({registerData, setRegisterData}) {
  return (
    <div>
        <input
            placeholder='Email'
            required
            type='email'
            value={registerData.Email}
            onChange={e => { setRegisterData({...registerData, Email: e.target.value}) }}
        />
        
        <input
            placeholder='Haslo'
            required
            type='password'
            value={registerData.Password}
            onChange={e => { setRegisterData({...registerData, Password: e.target.value}) }}
        />

    </div>
  )
}
