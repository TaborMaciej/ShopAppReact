import React, {useContext, useState, useEffect} from 'react'
import { DataContext } from "../App.js"
import Axios from 'axios'
import "../css/Orders.css"




function Orders() {    
    const {userData} = useContext(DataContext)
    const [selectRequest, SetSelectRequest] = useState(true);
    const [orderList, SetOrdersList] = useState({})

    useEffect(() => {
    
      SetOrdersList({});
      SetSelectRequest(true);
      const source = Axios.CancelToken.source();
    
      Axios
        .post("http://localhost:3001/api/userOrders", {userID: userData.ID},{
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
    }, [userData.ID]);

    return (
      (!selectRequest ?
        (
          <div>
            <h1 className='error'>Wystąpił błąd podczas ładowania danych</h1>
          </div>
        )
        :
        ( (Object.keys(orderList).length <= 0 ?
            (
              <div>
                  <h1 className='error'>Brak zamówień, zamów coś! :D</h1>
              </div>
            )
            :
            (
              <div className='page-order'>
                <h3 className="title">Twoje zamówienia</h3>
                {Object.keys(orderList).map(key =>{
                  return (
                  
                    <div key={key} className="whole-order">
                    <div className='pagee'>
                      <div>
                        <p className="title">ID zamówienia: {orderList[key].ID_zamowienie}</p>
                        <p className="order-p">Data zamówienia: {(orderList[key].Data).substr(0, 10)}</p>
                        <p className="order-p">Status zamówienia: {(orderList[key].Status)}</p>
                      </div>

                        <div className='all-products'>
                          {
                            
                            Object.keys(orderList[key].Produkty).map(key_ =>{
                              return (

                                <div key={key_} className="products-order">

                                  <p className="product-p-order">{orderList[key].Produkty[key_].Nazwa_gry}</p>
                                  <p className="product-p-order">{orderList[key].Produkty[key_].System}</p>
                                  <p className="product-p-order">{(orderList[key].Produkty[key_].Cena * orderList[key].Produkty[key_].Ilosc).toFixed(2)}zł</p>
                                  <p className="product-p-order">Ilość sztuk: {orderList[key].Produkty[key_].Ilosc}</p>
                                </div>
                              )
                            })
                          }
                          </div>
                    </div>      
                    </div>
                  
                  )
                  }) 
                }
              </div>
            )
          )
        )
      )
    );
}

export default Orders;
