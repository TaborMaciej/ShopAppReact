import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from "../App.js"
import Axios from 'axios';
import Product from "./SingularProduct.js"
import "../css/Home.css"

function Home() {


  const { gameData, SetGameData } = useContext(DataContext);
  const [selectRequest, SetSelectRequest] = useState(true);
  
  useEffect(() => {
    
    SetGameData([]);
    SetSelectRequest(true);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const source = Axios.CancelToken.source();
  
    Axios
      .get("http://localhost:3001/api/games", {
        cancelToken: source.token,
      })
      .then((response) => {
        SetGameData(response.data);
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
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className='whole'>
    <div className='page'>

      {!selectRequest ? ( <h3>Error! Could not load data.</h3> ) :
      (
        
        gameData.length <= 0 ? (
          <h3>Loading...</h3>) : 
        (
          <div className="products-box">
          
            {gameData.map((element) => <Product data={element} key={element.ID} />)}
          </div>
        )
      )}
    </div>
    </div>
  );
}

export default Home;
