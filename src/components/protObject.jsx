import React from "react";

export default function ProtobjectPanel() {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {/* Controlador: index.html */}
      <iframe
        title="Controlador"
        src="/index.html"
        width="400"
        height="300"
        style={{ border: "1px solid #ccc" }}
      />

      {/* Arduino receptor: arduino.html */}
      <iframe
        title="Arduino"
        src="/arduino.html"
        width="400"
        height="300"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
}
