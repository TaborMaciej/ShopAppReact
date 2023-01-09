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
        Nazwa_gry: "",
        sciezka_okladki: "",
        ID_gatunek: 1,
        ID_wydawnictwo: 1
      }
    ) 
    const [systemData, setSystemData] = useState([])

    /*
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
      */
    
    const insertProduct = (callback) =>{

        Axios
        .post("http://localhost:3001/api/add-product", {data: productData})
        .then((response) => {
          callback(response.data)
        })
        .catch((err) => console.log(err));
    }

    const [openSuccess, setOpenSuccess] = useState(false)

    const HandleSubmit = (event) =>{
      event.preventDefault()
      console.log(productData)
      setOpenSuccess(true)
      /*
      insertProduct(result =>{
    })
    */
    }

    return (
        <div>
          <h3 className='title'>Dodawanie gry:</h3>
          <form onSubmit={(event) => {HandleSubmit(event)}}>
            <input
              placeholder='Nazwa_gry'
              required 
              type='text'
              value={productData.Nazwa_gry}
              onChange={(e) => { setProductData({...productData, Nazwa_gry: e.target.value})}}
            />

            <input
              placeholder='sciezka_okladki'
              required 
              type='text'
              value={productData.sciezka_okladki}
              onChange={(e) => { setProductData({...productData, sciezka_okladki: e.target.value})}}
            />

            <select value={productData.ID_gatunek} onChange={(e) => { setProductData({...productData, ID_gatunek: e.target.value})}}>
              {Object.keys(gameData).map(key =>{
                return <option key={gameData[key].ID_gatunek} value={gameData[key].ID_gatunek}>{gameData[key].ID_gatunek}</option>
              })}
            </select>

            <select value={productData.ID_wydawnictwo} onChange={(e) => { setProductData({...productData, ID_wydawnictwo: e.target.value})}}>
              {Object.keys(systemData).map(key =>{
                return <option key={systemData[key].ID_wydawnictwo} value={systemData[key].ID_wydawnictwo}>{systemData[key].ID_wydawnictwo}</option>
              })}
            </select>
            <button type="submit">Dodaj grę</button>
          </form>
          <Modal open={openSuccess} onClose={() => {setOpenSuccess(false)}}>
            <p>Pomyślnie dodano produkt</p>
          </Modal>
        </div>
    )
}
