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
      <div className="modalInfoWrapper" onClick={e => e.stopPropagation()}>
        <h1>¿Qué es esto?</h1>
        <p>
          Esta visualización muestra cuáles son los objetos o regiones del cielo nocturno más fotografiados por astrofotógrafos de todo el mundo.

          Cada punto en el gráfico representa uno de estos objetos. Su posición corresponde a sus coordenadas reales en el cielo, y su tamaño indica qué tan frecuentemente aparece en fotografías.

          Dado que las imágenes provienen de muchas fuentes distintas, los datos están organizados mediante dos filtros clave: el hemisferio y el campo visual. A continuación te daremos la información necesaria para entender esto:

        </p>
      </div>
    </div>
  )
}