import React, { useEffect, useState } from "react";
import "../styles/modalConnectStyle.css";

export default function ModalConnect({ displayModal, setDisplayModal, iframeRef }) {
  const [hideStyle, setHideStyle] = useState({ zIndex: -1 });

  function hideModal() {
    setDisplayModal("hideModalConnect");

    // Esperar que termine animación para ocultar iframe y bajar zIndex
    setTimeout(() => {
      iframeRef.current?.hideIframe();
      setHideStyle({ zIndex: -1 });
    }, 500); // Igual que modalInfo (CSS transition debe ser 0.5s)
  }

  useEffect(() => {
    if (displayModal === "showModalConnect") {
      setHideStyle({});
      iframeRef.current?.showIframe();
    }
  }, [displayModal]);

  return (
    <div
      className={`modalInfoOverlay ${displayModal}`}
      style={hideStyle}
      onClick={hideModal}
    >
      <div className="modalInfoWrapper" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={hideModal}>X</button>
        <section className="modalInfoContent">
          <h2>🔌 Conectar con Protobject</h2>
          <p>Escanea el código QR con tu celular.</p>
        </section>
      </div>
    </div>
  );
}
