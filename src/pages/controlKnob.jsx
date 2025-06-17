import React, { useEffect } from "react";
import { setupProtobject } from "../protobjectConfig";

const ControlKnob = () => {
  useEffect(() => {
    // Cargar Protobject
    const script = document.createElement("script");
    script.src = "https://app.protobject.com/framework/p.js";
    script.async = true;
    script.onload = () => {
      setupProtobject(); // aquí usamos tu misma estructura

      // Crear la perilla
      const knob = new window.Protobject.Knob({ min: -1500, max: 1500 });

      // Enviar los datos cuando cambie
      knob.onChange((value) => {
        window.Protobject.Core.send({ speed: value }).to("/arduino");
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2>Control del Servo</h2>
      {/* El botón "Connect" será autoinyectado por Protobject usando este ID */}
      <div id="ProtobjectPlusButton" style={styles.connect}></div>
    </div>
  );
};

export default ControlKnob;

const styles = {
  container: {
    fontFamily: "sans-serif",
    padding: "40px",
    textAlign: "center",
  },
  connect: {
    width: "80px",
    height: "40px",
    margin: "20px auto",
    backgroundColor: "#007bff",
    borderRadius: "20px",
    color: "#fff",
    cursor: "pointer",
  },
};
