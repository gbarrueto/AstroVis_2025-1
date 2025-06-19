import { useState, useEffect } from 'react';
import ProtobjectPanel from "./ProtobjectPanel"
import '../styles/modalConnectStyle.css';

export default function ModalConnect({ displayModal, setDisplayModal }) {
  const [hideStyle, setHideStyle] = useState({});

  function hideModal() {
    setDisplayModal('hideModalConnect');
  }

  useEffect(() => {
    if (displayModal === 'showModalConnect') {
      setHideStyle({});
    } else {
      setTimeout(() => {
        setHideStyle({ zIndex: -1 });
      }, 500); // misma duración de animación
    }
  }, [displayModal]);

  return (
    <div
      className={`modalInfoOverlay ${displayModal}`}
      style={hideStyle}
      onClick={hideModal}
    >
      <div className="modalInfoWrapper" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={hideModal}>
          X
        </button>
        <section className="modalInfoContent" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>🔌 Conectar con Protobject</h2>
          <p style={{ textAlign: 'center' }}>
            Usa el control deslizante para mover los servos en tiempo real. Asegúrate de tener tu placa conectada a través del sistema Protobject.
          </p>

          <ProtobjectPanel/>


        </section>
      </div>
    </div>
  );
}
