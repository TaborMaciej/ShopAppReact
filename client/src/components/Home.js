import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from "../App.js"
import Axios from 'axios';
import Product from "./SingularProduct.js"
import "../css/Home.css"
import meme from "../imgs/meme.png";
import wyprzedaz from "../imgs/wyprzedaz.png";

function Home() {



  const { gameData, SetGameData } = useContext(DataContext);
  const [selectRequest, SetSelectRequest] = useState(true);
  let keys = {}
  const slides = [
    <img id="slide1" alt="reklama" src={wyprzedaz} />,
    <img id="slide2" alt="meme" src={meme} />,
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);


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


  
  keys = Object.keys(gameData)
  return (
    <div className='whole'>
    <div className='page'>

      {!selectRequest ? ( <h3>Error! Could not load data.</h3> ) :
      (
        
        gameData.length <= 0 ? (
          <h3>Loading...</h3>) : 
        (


          /*
          <div className="products-box">
            {
              keys.map(key => <Product data={gameData[key]} key={key}/>)
            }
          </div>
            */
            <div>
              <section className='container'>
                <div className='Slide-holder'>
                  <div className='slider'>
                  {slides[slideIndex]}
                  </div>
                  <div className='slider-nav'>
                  </div>
                </div>
              </section>
              <div>
            {keys.map(key => <Product data={gameData[key]} key={key}/>) } 
            </div>
            </div>


        )
      )}
    </div>
    </div>
  );
}

export default Home;
