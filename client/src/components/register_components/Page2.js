import React from 'react'

export default function Page2({registerData, setRegisterData}) {
    return (
        <div className='login'>
            <input
                className='input_b'
                placeholder='Ulica'
                required
                type='text'
                value={registerData.Street} onChange={e => { setRegisterData({...registerData, Street: e.target.value}) }}
            />

            <input
                className='input_b'
                placeholder='Kod pocztowy'
                required
                type='text'
                pattern='[0-9 \-]*'
                value={registerData.Zip}
                onChange={e => { setRegisterData({...registerData, Zip: e.target.value}) }}
            />
            
            <input
                className='input_b'
                placeholder='Nr domu'
                required 
                type='text'
                pattern='[0-9]*'
                value={registerData.Building}
                onChange={e => { setRegisterData({...registerData, Building: e.target.value}) }}
            />
            
            <input
                className='input_b'
                placeholder='Nr mieszkania'
                type='text'
                pattern='[0-9 ]*'
                value={registerData.House}
                onChange={e => { setRegisterData({...registerData, House: e.target.value}) }}
            />
            
            <input
                className='input_b'
                placeholder='Miasto'
                required
                type='text'
                value={registerData.City}
                onChange={e => { setRegisterData({...registerData, City: e.target.value}) }}
            />
            <select value={registerData.Voivodeship} onChange={e => {setRegisterData({...registerData, Voivodeship: e.target.value}) }}>
                <option key={2} value={2}>Dolnośląskie</option>
                <option key={3} value={3}>Kujawsko-Pomorskie</option>
                <option key={6} value={6}>Łódzkie</option>
                <option key={4} value={4}>Lubelskie</option>
                <option key={5} value={5}>Lubuskie</option>
                <option key={7} value={7}>Małopolskie</option>
                <option key={8} value={8}>Mazowieckie</option>
                <option key={1} value={1}>Opolskie</option>
                <option key={9} value={9}>Podkarpackie</option>
                <option key={10} value={10}>Podlaskie</option>
                <option key={11} value={11}>Pomorskie</option>
                <option key={12} value={12}>Śląskie</option>
                <option key={13} value={13}>Świętokrzyskie</option>
                <option key={14} value={14}>Warmińsko-mazurskie</option>
                <option key={15} value={15}>Wielkopolskie</option>
                <option key={16} value={16}>Zachodniopomorskie</option>
            </select>         
        </div>
    )
}
