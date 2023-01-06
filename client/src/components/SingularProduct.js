import React, {useState} from 'react';
import { CartAdd } from "../App.js";
import "../css/Product.css";


function SingularProduct(props) {

  const keys = Object.keys(props.data.Platformy)
  const [choice, setChoice] = useState(-1)

  return (
      <div className="product-box">
        <img src={ require("../imgs/okladki_gier/" + props.data.Path) } alt={"Zdjecie gry: " + props.data.Nazwa_gry} className="product-img"/>
        <h3>{props.data.Nazwa_gry}</h3>
        <p>Gatunek: {props.data.Gatunek}</p>
        <p>Wydawnictwo: {props.data.Wydawnictwo}</p>
        <div className="platform-list">
          {
            keys.map( (key) =>
              <button className="product-platform" onClick={ () => {setChoice(key)}}>{props.data.Platformy[key].Platforma}</button>
            )
          }
        </div>
        <br/>
        {choice !== -1 ? <button onClick = { () => { CartAdd(props.data.ID_gra, choice)} } className="buy-button">Dodaj do koszyka: {props.data.Platformy[choice].Cena_sprzedazy}zł</button> : ""}
      </div>
  );
}

export default SingularProduct;
