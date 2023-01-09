import React, {useContext, useState, useEffect, useRef} from 'react'
import { DataContext } from '../App'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import Modal from './Modal'

export default function EmployeeOrders() {
    // eslint-disable-next-line
    const {userData, gameData} = useContext(DataContext)
    const navigation = useNavigate()

    useEffect(() => {
        if (!userData.isEmployee || userData === {}) {
          navigation("/")
        }
      }, [userData, navigation])
      
      
      const [selectRequest, SetSelectRequest] = useState(true);
      const [orderList, SetOrdersList] = useState({})
      const [openSuccess, setOpenSuccess] = useState(false)
      
    useEffect(() => {
      
      SetOrdersList({});
      SetSelectRequest(true);
      const source = Axios.CancelToken.source();
    
      Axios
        .post("http://localhost:3001/api/employeeOrders", {employeeID: userData.ID},{
            cancelToken: source.token,
        })
        .then((response) => {
            SetOrdersList(response.data);
        })
        .catch((err) => {
            SetSelectRequest(false);
            if (Axios.isCancel(err)) {
                console.log("Request canceled", err.message);
            } else {
                console.log(err);
            }
        });
  
  
  
      return () => {
        source.cancel();
      };
    }, [userData.ID, openSuccess]);

    const updateStatus = (status, ID, callback) =>{

        Axios
        .post("http://localhost:3001/api/status", {ID: ID, status: status})
        .then((response) => {
          callback(response.data)
        })
        .catch((err) => console.log(err));
      }

    const selectRef = useRef(null);

    const HandleSubmit = (event, ID) =>{
        event.preventDefault()
        const selectValue = selectRef.current.value;
        console.log(ID)
        updateStatus(selectValue, ID, result =>{
            setOpenSuccess(result)
        })

    }

    return (
        (!selectRequest ?
            (
            <div>
                <h1 className='error'>Wystąpił błąd podczas ładowania danych</h1>
            </div>
            )
            :
            (   (Object.keys(orderList).length <= 0 ?
                (
                    <div>
                        <h1 className='error'>Brak zamówień</h1>
                    </div>
                )
                :
                (
                    <div className='page-order'>
                <h3 className="title">Zamówienia</h3>
                {Object.keys(orderList).map(key =>{
                  return (
                  
                    <div key={key} className="whole-order">
                    <p className="title">ID zamówienia: {orderList[key].ID_zamowienie}</p>

                        <div className='tog'>
                            <div>
                            <p className="order-p">Data zamówienia: {(orderList[key].Data).substr(0, 10)}</p>
                            <p className="order-p">Status zamówienia: {(orderList[key].Status)}</p>
                            </div>

                            <div>
                            <p className="title">Adres Klienta:</p>
                            <p className="order-p-a">Województwo: {orderList[key].Wojewodztwo}</p>
                            <p className="order-p-a">Miasto: {orderList[key].Data.Miasto}</p>
                            <p className="order-p-a">Kod pocztowy: {(orderList[key].Kod_pocztowy)}</p>
                            <p className="order-p-a">Ulica: {orderList[key].Ulica}</p>
                            <p className="order-p-a">Numer_budynku: {orderList[key].Numer_budynku}</p>
                            {orderList[key].Numer_mieszkania !== null ? <p className="order-p-a">Numer mieszkania: {(orderList[key].Numer_mieszkania)}</p> : {}}
                            </div>
                          </div>
                        <div className='all-products'>
                          {
                            Object.keys(orderList[key].Produkty).map(key_ =>{
                              return (
                                <div key={key_} className="products-order">
                                    <p className="product-p-order">ID produktu: {orderList[key].Produkty[key_].ID_produkt}</p>
                                    <p className="product-p-order">Nazwa produktu: {orderList[key].Produkty[key_].Nazwa_gry}</p>
                                    <p className="product-p-order">System: {orderList[key].Produkty[key_].System}</p>
                                    <p className="product-p-order">Ilość sztuk: {orderList[key].Produkty[key_].Ilosc}</p>
                                </div>
                              )
                            })
                          }
                          </div>
                    <form key={key} onSubmit={(event) => HandleSubmit(event, orderList[key].ID_zamowienie)}>
                      <div className='sub'>

                        <select className="woj" id="status_"  ref={selectRef}>
                            <option value={1}>Wysłane</option>
                            <option value={2}>W trakcie realizacji</option>
                            <option value={3}>Przyjęte do realizacji</option>
                        </select>
                        <button className='but' type="submit">Zmień status</button>
                      </div>
                    </form>
                    <br/>
                    <br/>
                    </div>
                  )
                  }) 
                }
                   <Modal open={openSuccess} onClose={() => {setOpenSuccess(false)}}>
                    <p className='question'>Zmieniono status zamówienia</p>
                  </Modal>
              </div>
                ))
            )
        )


    )
}
