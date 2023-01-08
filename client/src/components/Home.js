import React, { useState, useEffect, useContext } from 'react'
import { DataContext } from "../App.js"
import Axios from 'axios'
import Product from "./SingularProduct.js"
import "../css/Home.css"
import meme from "../imgs/meme.png"
import wyprzedaz from "../imgs/wyprzedaz.png"


function Home({searchInput}) {
  const { gameData, SetGameData } = useContext(DataContext);
  const [selectRequest, SetSelectRequest] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  

  const slides = [
    <img id="slide1" alt="reklama" src={wyprzedaz} />,
    <img id="slide2" alt="meme" src={meme} />
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    
    SetGameData([]);
    SetSelectRequest(true);
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

  const getFilteredItems = () => {
      const filteredItems = ( Object.values(gameData).filter(product => {
        
      return product.Gatunek.toLowerCase().includes(searchInput.toLowerCase()) 
          || product.Nazwa_gry.toLowerCase().includes(searchInput.toLowerCase())
          || ( (Object.values(product.Platformy).filter(platforma =>{
                return platforma.Platforma.toLowerCase().includes(searchInput.toLowerCase())
              })).length !== 0)
        }) 
      )

      return filteredItems
  }
  
  
  return (
    <div className='whole'>
      <div className='page'>
      {!selectRequest ? ( <h3>Error! Could not load data.</h3> ) :
        (
        gameData.length <= 0 ? (
          <h3>Loading...</h3>) : 
          (
            <div>
              {(searchInput !== "" ? 
                (
                  <div className='lol'>
                    {getFilteredItems().map((item, key) => <Product data={item} key={key}/>) }
                  </div>
                )
                : 
                (
                  <>
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
                  
                      <div className='Big_three'>
                        {Object.keys(gameData).slice(0, 3).map(key => <Product data={gameData[key]} key={key}/>) }
                      </div>

                      <h4 className='title'>Gry Akcji</h4>
                      <div className='lol'>
                        {Object.keys(gameData).filter(key => gameData[key].Gatunek === "Gra akcji").map(key => <Product data={gameData[key]} key={key}/>)}
                      </div>

                      <h4 className='title'>Gry Fantasy</h4>
                      <div className='lol'>
                        {Object.keys(gameData).filter(key => gameData[key].Gatunek === "Fantasy").slice(0, 5).map(key => <Product data={gameData[key]} key={key}/>)}
                      </div>

                      <h4 className='title'>Gry Przygodowe</h4>
                      <div className='lol'>
                        {Object.keys(gameData).filter(key => gameData[key].Gatunek === "Przygodowa").map(key => <Product data={gameData[key]} key={key}/>)}
                      </div>

                      <h4 className='title'>Bijatyka</h4>
                      <div className='lol'>
                        {Object.keys(gameData).filter(key => gameData[key].Gatunek === "Bijatyka").map(key => <Product data={gameData[key]} key={key}/>)}
                      </div>

                      <h4 className='title'>Gry Muzyczne</h4>
                      <div className='lol'>
                        {Object.keys(gameData).filter(key => gameData[key].Gatunek === "Muzyczna").map(key => <Product data={gameData[key]} key={key}/>)}
                      </div>

                      <h4 className='title'>Symulacja</h4>
                      <div className='lol'>
                        {Object.keys(gameData).filter(key => gameData[key].Gatunek === "Symulacja").map(key => <Product data={gameData[key]} key={key}/>)}
                      </div>

                      <h4 className='title'>VR</h4>
                      <div className='lol'>
                        {Object.keys(gameData).filter(key => gameData[key].Gatunek === "VR").map(key => <Product data={gameData[key]} key={key}/>)}
                      </div>
                    
                    </div>
                  </>
                )
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
