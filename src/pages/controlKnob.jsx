// src/pages/ControlKnob.jsx
import React, { useEffect } from "react";
import { setupProtobject } from "../protobjectConfig"; // Este archivo debe definir Protobject.initialize()

const ControlKnob = () => {
  useEffect(() => {
    // Cargar la librería de Protobject
    const script = document.createElement("script");
    script.src = "https://app.protobject.com/framework/p.js";
    script.async = true;

    script.onload = () => {
      // Configurar como en el antiguo config.js
      window.Protobject.setProduction(true);
      window.Protobject.initialize([
        {
          name: "Servo",
          page: "/arduino",
        },
        {
          name: "Knob",
          page: "/control",
          main: true,
        },
      ]);

      // Crear la perilla
      const perilla = new window.Protobject.Knob({ min: -1500, max: 1500 });

      // Enviar el valor cuando cambie
      perilla.onChange((value) => {
        window.Protobject.Core.send({ speed: value }).to("/arduino");
      });
    };

    document.body.appendChild(script);

    return () => {
      // Limpieza del script si el componente se desmonta
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2>Control del Servo</h2>
      <div id="ProtobjectPlusButton" style={styles.connectButton}></div>
    </div>
  );
};

export default ControlKnob;

const styles = {
  container: {
    textAlign: "center",
    paddingTop: "40px",
    fontFamily: "sans-serif",
  },
  connectButton: {
    width: "80px",
    margin: "20px auto",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
