import React from 'react'
import ReactDOM from 'react-dom';
import '../css/Modal.css';

function Modal({ open, children, onClose }) {
  if(!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="background-shade"/>
      <div className="modal-box">
        <button onClick={onClose}>x</button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  )
}

export default Modal;