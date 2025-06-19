import { useState, useEffect, useRef, useContext } from "react";
import ProtobjectPanel from "./ProtobjectPanel";
import "../styles/modalConnectStyle.css";
import { Context } from "../app.jsx";

export default function ModalConnect({ displayModal, setDisplayModal }) {
  const [hideStyle, setHideStyle] = useState({});
  const iframeRef = useRef(null);
  const { setIframeRef } = useContext(Context); // setter global

  function hideModal() {
    setDisplayModal("hideModalConnect");
    setIframeRef(null); // Limpia al cerrar
  }

  useEffect(() => {
    if (displayModal === "showModalConnect") {
      setHideStyle({});
    } else {
      setTimeout(() => {
        setHideStyle({ zIndex: -1 });
      }, 500);
    }
  }, [displayModal]);

  // Espera hasta que iframeRef esté disponible
  useEffect(() => {
    const interval = setInterval(() => {
      if (iframeRef.current) {
        setIframeRef(iframeRef.current);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [setIframeRef]);

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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>🔌 Conectar con Protobject</h2>
          <p style={{ textAlign: "center" }}>
            Usa el control deslizante para mover los servos en tiempo real.
            Asegúrate de tener tu placa conectada a través del sistema
            Protobject.
          </p>

          {displayModal === "showModalConnect" && (
            <ProtobjectPanel iframeRef={iframeRef} />
          )}
        </section>
      </div>
    </div>
  );
}
