import React, { useState, useEffect, useContext } from 'react'
import { DataContext } from "../App.js"
import Axios from 'axios'
import Product from "./SingularProduct.js"
import "../css/Home.css"
import meme from "../imgs/meme.png"
import wyprzedaz from "../imgs/wyprzedaz.png"

function GenreList(data){
  let genres_ = {}
  Object.keys(data).forEach(key => {
      if(!genres_[data[key].Gatunek])
          genres_[data[key].Gatunek] = []
      else
          genres_[data[key].Gatunek].push(data[key].ID_gra)
  });
  return genres_
}

function Home() {
  const { gameData, SetGameData } = useContext(DataContext);
  const [selectRequest, SetSelectRequest] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [genres, SetGenres] = useState([])
  const akcja = "Gra akcji"
  const fantastyka = "Fantasy"
  const przygodowa = "Przygodowa"

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
        SetGenres(GenreList(gameData))
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
             
              <div className='Big_three'>
              {Object.keys(gameData).slice(0, 3).map(key => <Product data={gameData[key]} key={key}/>) }
              </div>
              <label>Gry Akcji</label>
              <div className='lol'>
              {Object.keys(gameData).filter(key => gameData[key].Gatunek === akcja).slice(0, 5).map(key => <Product data={gameData[key]} key={key}/>)}
              </div>
              <label>Gry Fantasy</label>
              <div className='lol'>
              {Object.keys(gameData).filter(key => gameData[key].Gatunek === fantastyka).slice(0, 5).map(key => <Product data={gameData[key]} key={key}/>)}
              </div>
              <label>Gry Przygodowe</label>
              <div className='lol'>
              {Object.keys(gameData).filter(key => gameData[key].Gatunek === przygodowa).map(key => <Product data={gameData[key]} key={key}/>)}

              </div>
              </div>
            </div>


        )
      )}
    </div>
    </div>
  );
}

export default Home;
