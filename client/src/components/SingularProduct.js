import React from 'react';
import "../css/Product.css";

function SingularProduct(props) {
  return (
    <div className="product-box">
      <h3>{props.data.Nazwa_gry}</h3>
      <p>Gatunek: {props.data.Gatunek}</p>
      <p>Wydawnictwo: {props.data.Wydawnictwo}</p>

    </div>
  );
}

export default SingularProduct;
