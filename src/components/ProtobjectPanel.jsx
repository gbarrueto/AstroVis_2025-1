import React, { useRef } from "react";

export default function ProtobjectPanel() {
  const iframeRef = useRef(null);

  const sendRandomValue = () => {
    const randomValue = Math.floor(Math.random() * 3001) - 1500; // entre -1500 y 1500
    iframeRef.current?.contentWindow.postMessage(
      { type: "knob-move", value: randomValue },
      "*" // O especifica el origen exacto si es externo, como "https://app.protobject.com"
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
      <button onClick={sendRandomValue}>Mover perilla</button>
    </div>
  );
}
