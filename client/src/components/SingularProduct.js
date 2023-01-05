import React from 'react';
import "../css/Product.css";

function SingularProduct(props) {
  return (
      <div className="product-box">
        <img src={"../imgs/okladki_gier/" + props.data.path} alt={"Zdjecie gry: "+props.data.Nazwa_gry}/>
        <h3>{props.data.Nazwa_gry}</h3>
        <p>Gatunek: {props.data.Gatunek}</p>
        <p>Wydawnictwo: {props.data.Wydawnictwo}</p>

      </div>
  );
}

export default SingularProduct;
