import { useState, useEffect, useRef, useContext } from 'react';
import ProtobjectPanel from "./ProtobjectPanel";
import '../styles/modalConnectStyle.css';
import { Context } from "../app.jsx";

export default function ModalConnect({ displayModal, setDisplayModal }) {
  const [hideStyle, setHideStyle] = useState({});
  const iframeRef = useRef(null);
  const { setIframeRef } = useContext(Context); // setter del iframe en contexto

  function hideModal() {
    setDisplayModal('hideModalConnect');
  }

  useEffect(() => {
    if (displayModal === 'showModalConnect') {
      setHideStyle({});
    } else {
      setTimeout(() => {
        setHideStyle({ zIndex: -1 });
      }, 500); // duración animación
    }
  }, [displayModal]);

  useEffect(() => {
    // Cuando el iframe está disponible en ProtobjectPanel, lo asignamos al contexto
    if (iframeRef.current) {
      setIframeRef(iframeRef.current);
    }
  }, [iframeRef.current, setIframeRef]);

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
        <section
          className="modalInfoContent"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2>🔌 Conectar con Protobject</h2>
          <p style={{ textAlign: 'center' }}>
            Usa el control deslizante para mover los servos en tiempo real. Asegúrate de tener tu placa conectada a través del sistema Protobject.
          </p>

          {/* Pasamos el ref para que ProtobjectPanel asigne la referencia del iframe */}
          <ProtobjectPanel iframeRef={iframeRef} />

        </section>
      </div>
    </div>
  );
}
