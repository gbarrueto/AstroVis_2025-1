import { useState, useEffect } from 'react';
import '../styles/modalInfoStyle.css';

export default function ModalInfo({ displayModal, setDisplayModal }) {
  const [hideStyle, setHideStyle] = useState({});
  
  function hideModal() {
    setDisplayModal('hideModalInfo');
  }
  
  useEffect(() => {
    if (displayModal === 'showModalInfo') {
      setHideStyle({});
    }
    else {
      setTimeout(() => {
      setHideStyle({
        zIndex: -1
      })
    }, 500);
    }
  }, [displayModal])
  
  return (
    <div className={`modalInfoOverlay ${displayModal}`} style={hideStyle} onClick={hideModal}>
      <div className="modalInfoWrapper">
        <h1>TRABAJO EN PROCESO.</h1>
        <h2>Aqui deberian ir los textos explicativos de cada área que tienden a confundir su significado</h2>
        <h6><i>Deje de revisar esta información y vaya a apreciar los objetos mostrados.</i></h6>
      </div>
    </div>
  )
}