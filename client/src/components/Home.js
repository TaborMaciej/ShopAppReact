import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Product from "./SingularProduct.js"
import "../css/Home.css"

function Home() {

  const [gameData, SetGameData] = useState([]);
  const [selectRequest, SetSelectRequest] = useState(true);
  
  useEffect(() => {
    SetGameData([]);
    SetSelectRequest(true);
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
  }, []);
  
  return (
    <div>
      <h1>Home page</h1>

      {!selectRequest ? ( <h3>Error! Could not load data.</h3> ) :
      (
        gameData.length <= 0 ? (
          <h3>Loading...</h3>) : 
        (
          <div className="products-box">
            {gameData.map((element) => <Product data={element} key={element.ID} />)}
            {console.log(gameData)}
          </div>
        )
      )}
    </div>
  );
}

export default Home;
