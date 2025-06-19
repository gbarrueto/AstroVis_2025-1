import { useState, useEffect, useRef } from "react";
import ProtobjectPanel from "./ProtobjectPanel";
import "../styles/modalConnectStyle.css";

export default function ModalConnect({ displayModal, setDisplayModal }) {
  const [hideStyle, setHideStyle] = useState({});
  const iframeRef = useRef(null);

  function hideModal() {
    setDisplayModal("hideModalConnect");
  }

  function sendRandomToIframe() {
    const randomValue = Math.floor(Math.random() * 3001) - 1500;

    if (iframeRef.current?.contentWindow) {
      console.log("Enviando mensaje al iframe", randomValue);
      iframeRef.current.contentWindow.postMessage(
        { type: "knob-move", value: randomValue },
        "*"
      );

      console.log(`Valor enviado al iframe: ${randomValue}`);
    } else {
      console.warn("El iframe aún no está disponible.");
    }
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

          {/* Mostrar solo si está visible */}
          {displayModal === "showModalConnect" && (
            <>
              <ProtobjectPanel iframeRef={iframeRef} />
              <button onClick={sendRandomToIframe}>Mover perilla</button>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
