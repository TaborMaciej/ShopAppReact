import React from "react";
import ReactDOM from 'react-dom';
import '../css/Modal.css';



function Modal({ open, children, onClose }) {

  
    if (open) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    }
  

    else if(!open) 
    { 
      document.body.style.overflow = 'scroll'
      return null;
    }


  
  return ReactDOM.createPortal(
    <>
    
      <div className="background-shade"/>
      <div className="modal-box">
      
        <button className="exit" onClick={onClose}>x</button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  )
}


export default Modal;