import React, { useEffect, useState } from "react";
import "../styles/modalConnectStyle.css";

export default function ModalConnect({ displayModal, setDisplayModal, iframeRef }) {
  const [hideStyle, setHideStyle] = useState({ zIndex: -1 });

  function hideModal() {
    iframeRef.current?.hideIframe();
    setDisplayModal("hideModalConnect");

    setTimeout(() => {
      setHideStyle({ zIndex: -1 });
    }, 300); // duración animación CSS
  }

  useEffect(() => {
    if (displayModal === "showModalConnect") {
      setHideStyle({}); // vuelve visible el modal

      setTimeout(() => {
        iframeRef.current?.showIframe(); // asegúrate que eleve z-index y haga visible el iframe
      }, 50); // espera un poco a que termine transición inicial
    }
  }, [displayModal]);

  return (
    <div
      className={`modalConnectOverlay ${displayModal}`}
      style={hideStyle}
      onClick={hideModal}
    >
      <div className="modalConnectWrapper" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={hideModal}>X</button>
        <section className="modalConnectContent">
          <h2>🔌 Conectar con Protobject</h2>
          <p>Escanea el código QR con tu celular.</p>
        </section>
      </div>
    </div>
  );
}
