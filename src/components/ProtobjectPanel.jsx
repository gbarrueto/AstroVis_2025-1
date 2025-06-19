import React from "react";

export default function ProtobjectPanel({ iframeRef }) {
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
