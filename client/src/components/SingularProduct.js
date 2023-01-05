import React from 'react';
import "../css/Product.css";


function SingularProduct(props) {
  return (
      <div className="product-box">
        <img src={ require("../imgs/okladki_gier/" + props.data.Path) } alt={"Zdjecie gry: " + props.data.Nazwa_gry} className="product-img"/>
        <h3>{props.data.Nazwa_gry}</h3>
        <p>Gatunek: {props.data.Gatunek}</p>
        <p>Wydawnictwo: {props.data.Wydawnictwo}</p>

      </div>
  );
}

export default SingularProduct;
