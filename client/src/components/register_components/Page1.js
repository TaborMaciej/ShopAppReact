import React from 'react'


export default function Page1({registerData, setRegisterData}) {
    console.log(registerData)
  return ( 
    <div className='login'>
        <input className='input_b'
            placeholder='Imie'
            required type='text'
            value={registerData.Name}
            onChange={(e) => { setRegisterData({...registerData, Name: e.target.value}); console.log(e.target.value) }}
        />
        
        <input className='input_b'
            placeholder='Nazwisko'
            required
            type='text'
            value={registerData.LastName}
            onChange={(e) => { setRegisterData({...registerData, LastName: e.target.value}) }}
        />
        
        <input className='input_b'
            placeholder='Nr telefonu'
            type='text'
            pattern="^[0-9 ]{0,9}$"
            value={registerData.Phone}
            onChange={(e) => { setRegisterData({...registerData, Phone: e.target.value}) }}
        />
        
        <div className='date-form'>
            <label className='date'>Data urodzenia</label>
            <input 
                className='cal'
                type='date'
                value={registerData.Birthday}
                onChange={e => { setRegisterData({...registerData, Birthday: e.target.value}) }}
            />
        </div>
    </div>
  )
}
