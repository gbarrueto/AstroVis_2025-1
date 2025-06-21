// ModalConnect.jsx
import React, { useEffect, useState } from "react";
import "../styles/modalConnectStyle.css";

export default function ModalConnect({ displayModal, setDisplayModal, iframeRef }) {
  const [hideStyle, setHideStyle] = useState({ zIndex: -1 });

  // Cierra el modal y oculta el iframe visualmente
  function hideModal() {
    iframeRef.current?.hideIframe();
    setDisplayModal("hideModalConnect");

    // Espera a que termine animación de salida para bajar z-index
    setTimeout(() => {
      setHideStyle({ zIndex: -1 });
    }, 300); // Ajusta según tu animación CSS
  }

  // Cuando el modal se abre, se muestra el iframe visualmente
  useEffect(() => {
    if (displayModal === "showModalConnect") {
      setHideStyle({}); // Vuelve a poner el zIndex para que sea clickeable
      iframeRef.current?.showIframe();
    }
  }, [displayModal]);


  return (
    <div
      className={`modalConnectOverlay ${displayModal}`}
      style={hideStyle}
      onClick={hideModal}
    >
      <div className="modalConnectWrapper" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={hideModal}>
          X
        </button>
        <section className="modalConnectContent">
          <h2>🔌 Conectar con Protobject</h2>
          <p>Escanea el código QR con tu celular.</p>

        </section>
      </div>
    </div>
  );
}
