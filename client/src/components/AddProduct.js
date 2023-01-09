import React, {useContext, useState, useEffect} from 'react'
import { DataContext } from '../App'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import Modal from './Modal'
import "../css/AddEmployee.css"


export default function AddProduct() {
    const {userData, gameData} = useContext(DataContext)
    const navigation = useNavigate()

    useEffect(() => {
      if (!userData.isEmployee || userData === {}) {
        navigation("/")
      }
    }, [userData, navigation])


    const [productData, setProductData] = useState(
      {
        Cena_sprzedazy: "",
        Cena_zakupu: "",
        Rok_wydania: "",
        Ilosc_sztuk: "",
        ID_system: 1,
        ID_gra: 1
      }
    ) 
    const [systemData, setSystemData] = useState([])

    useEffect(() => {
      Axios
        .get("http://localhost:3001/api/system")
        .then((response) => {
            setSystemData(response.data);
        })
        .catch((err) => {
          console.log(err)
        });

      }, [])
    
    const insertProduct = (callback) =>{

        Axios
        .post("http://localhost:3001/api/add-product", {data: productData})
        .then((response) => {
          callback(response.data)
        })
        .catch((err) => console.log(err));
    }

    const [openSuccess, setOpenSuccess] = useState(false)
    const [openExists, setOpenExists] = useState(false)

    const HandleSubmit = (event) =>{
      event.preventDefault()
      insertProduct(result =>{
        console.log(result)
        setOpenSuccess(result)
        setOpenExists(!result)
    })
    }

    return (
        <div>
          <h3 className='title'>Dodawanie produktu:</h3>
          <div className='pagee'>

          <form onSubmit={(event) => {HandleSubmit(event)}}>
          <div className='inpu'>
            <input
              className='input_box'
              placeholder='Cena sprzedazy'
              required 
              type='text'
              value={productData.Cena_sprzedazy}
              onChange={(e) => { setProductData({...productData, Cena_sprzedazy: e.target.value})}}
            />

            <input
              className='input_box'
              placeholder='Cena zakupu'
              required 
              type='text'
              value={productData.Cena_zakupu}
              onChange={(e) => { setProductData({...productData, Cena_zakupu: e.target.value})}}
            />

            <input
            className='input_box'
              placeholder='Rok wydania'
              type='text'
              value={productData.Rok_wydania}
              onChange={(e) => { setProductData({...productData, Rok_wydania: e.target.value})}}
            />

            <input
            className='input_box'
              placeholder='Ilosc sztuk'
              type='text'
              value={productData.Ilosc_sztuk}
              onChange={(e) => { setProductData({...productData, Ilosc_sztuk: e.target.value})}}
            />

            </div>
            <div className='sel'>
            <select className='woj' value={productData.ID_gra} onChange={(e) => { setProductData({...productData, ID_gra: e.target.value})}}>
              {Object.keys(gameData).map(key =>{
                return <option key={gameData[key].ID_gra} value={gameData[key].ID_gra}>{gameData[key].Nazwa_gry}</option>
              })}
            </select>

            <select className='woj' value={productData.ID_system} onChange={(e) => { setProductData({...productData, ID_system: e.target.value})}}>
              {Object.keys(systemData).map(key =>{
                return <option key={systemData[key].ID} value={systemData[key].ID}>{systemData[key].Nazwa}</option>
              })}
            </select>
            </div>
            <button className='add' type="submit"><p className='ins'>Dodaj produkt</p></button>
          </form>
          <Modal open={openSuccess} onClose={() => {setOpenSuccess(false)}}>
            <p className='question'>Pomyślnie dodano produkt</p>
          </Modal>

          <Modal open={openExists} onClose={() => {setOpenExists(false)}}>
            <p className='question'>Wystąpił błąd</p>
          </Modal>
          </div>

        </div>
    )
}
