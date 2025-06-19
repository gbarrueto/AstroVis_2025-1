import React from "react";

export default function ProtobjectPanel({ iframeRef }) {
  const sendRandomValue = () => {
    const randomValue = Math.floor(Math.random() * 3001) - 1500; // entre -1500 y 1500
    iframeRef?.current?.contentWindow.postMessage(
      { type: "knob-move", value: randomValue },
      "*" // Cambia por origen exacto si es externo
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <iframe
        ref={iframeRef}
        title="Controlador"
        src="/index.html"
        width="400"
        height="300"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
}
