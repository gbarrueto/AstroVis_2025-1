// src/components/IframeManager.jsx
import React, { forwardRef, useRef, useImperativeHandle } from "react";

const IframeManager = forwardRef((props, ref) => {
  const iframeRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getIframeWindow: () => iframeRef.current?.contentWindow,
    showIframe: () => {
      iframeRef.current.style.opacity = "1";
      iframeRef.current.style.pointerEvents = "auto";
    },
    hideIframe: () => {
      iframeRef.current.style.opacity = "0";
      iframeRef.current.style.pointerEvents = "none";
    },
  }));

  return (
    <iframe
      ref={iframeRef}
      title="Protobject Iframe"
      src="/index.html"
      style={{
        width: "250px",
        height: "350px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "0px",
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.3s",
        zIndex: 1000,
        
      }}
    />
  );
});

export default IframeManager;
