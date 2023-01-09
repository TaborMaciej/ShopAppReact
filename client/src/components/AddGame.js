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
    const [genreData, setGenreData] = useState([])
    const [publisherData, setPublishertData] = useState([])



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
          <div className='pagee'>
          <form onSubmit={(event) => {HandleSubmit(event)}}>
          <div className='inpu'>
            <input
             className='input_box'
              placeholder='Nazwa_gry'
              required 
              type='text'
              value={productData.Nazwa_gry}
              onChange={(e) => { setProductData({...productData, Nazwa_gry: e.target.value})}}
            />

            <input
             className='input_box'
              placeholder='sciezka_okladki'
              required 
              type='text'
              value={productData.sciezka_okladki}
              onChange={(e) => { setProductData({...productData, sciezka_okladki: e.target.value})}}
            />
            </div>

            <div className='sel'>

            <select className='woj' value={genreData.ID_gatunek} onChange={(e) => { setGenreData({...genreData, ID_gatunek: e.target.value})}}>
              {Object.keys(genreData).map(key =>{
                return <option key={genreData[key].ID_gatunek} value={genreData[key].ID_gatunek}>{genreData[key].ID_gatunek}</option>
              })}
            </select>

            <select className='woj' value={publisherData.ID_wydawnictwo} onChange={(e) => { setPublishertData({...publisherData, ID_wydawnictwo: e.target.value})}}>
              {Object.keys(publisherData).map(key =>{
                return <option key={publisherData[key].ID_wydawnictwo} value={publisherData[key].ID_wydawnictwo}>{publisherData[key].ID_wydawnictwo}</option>
              })}
            </select>
            </div>
            <button className='add' type="submit"><p className='ins'>Dodaj grę</p></button>
          </form>
          <Modal open={openSuccess} onClose={() => {setOpenSuccess(false)}}>
            <p>Pomyślnie dodano produkt</p>
          </Modal>
          </div>
        </div>
    )
}
