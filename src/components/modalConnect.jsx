// ModalConnect.jsx
import React, { useEffect, useState } from "react";
import "../styles/modalConnectStyle.css";

export default function ModalConnect({ displayModal, setDisplayModal, iframeRef }) {
  const [isVisible, setIsVisible] = useState(false);

  function hideModal() {
    setDisplayModal("hideModalConnect");
    setIsVisible(false);
  }

  useEffect(() => {
    if (displayModal === "showModalConnect") {
      setIsVisible(true);
    }
  }, [displayModal]);

  function sendRandomToIframe() {
    const win = iframeRef.current?.getIframeWindow?.();
    if (win) {
      const randomValue = Math.floor(Math.random() * 2001) - 1000;
      win.postMessage({ type: "knob-move", value: randomValue }, "*");
    }
  }

  return (
    <>
      <div
        className={`modalInfoOverlay ${displayModal}`}
        style={displayModal === "showModalConnect" ? {} : { zIndex: -1 }}
        onClick={hideModal}
      >
        <div className="modalInfoWrapper" onClick={(e) => e.stopPropagation()}>
          <button className="closeButton" onClick={hideModal}>
            X
          </button>
          <section className="modalInfoContent">
            <h2>🔌 Conectar con Protobject</h2>
            <p>Escanea el código QR con tu celular.</p>

            {/* Mostrar el iframe existente pero reposicionado */}
            {isVisible && (
              <div
                style={{
                  width: 250,
                  height: 350,
                  border: "1px solid #ccc",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Reubica el iframe existente */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  {iframeRef.current?.getIframeElement?.() &&
                    React.cloneElement(iframeRef.current.getIframeElement(), {
                      style: {
                        width: "100%",
                        height: "100%",
                        border: "none",
                        pointerEvents: "auto",
                        opacity: 1,
                        position: "static",
                      },
                    })}
                </div>
              </div>
            )}

            <button onClick={sendRandomToIframe}>Mover perilla</button>
          </section>
        </div>
      </div>
    </>
  );
}
