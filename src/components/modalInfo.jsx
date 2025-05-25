import { useState, useEffect } from 'react';
import '../styles/modalInfoStyle.css';

export default function ModalInfo({ displayModal, setDisplayModal }) {
  const [hideStyle, setHideStyle] = useState({});
  
  function hideModal() {
    setDisplayModal('hideModalInfo');
    setTimeout(() => {
      setHideStyle({
        zIndex: -1
      })
    }, 500);
  }
  
  return (
    <div className={`modalInfoOverlay ${displayModal}`} style={hideStyle} onClick={hideModal}>
      <div className="modalInfoWrapper">
        <h1>QUE PASAAAAAAAA QUE ANDAI SAPEANDO OEEEEEE SALE DE AQUI ANDA A VER LOS PUNTITOS ESOS</h1>
      </div>
    </div>
  )
}