// src/components/ControlKnob.jsx
import React, { useEffect } from "react";

const ControlKnob = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.protobject.com/framework/p.js";
    script.async = true;
    script.onload = () => {
      const perilla = new window.Protobject.Knob({ min: -1500, max: 1500 });
      perilla.onChange((value) => {
        window.Protobject.Core.send({ speed: value }).to("arduino");
      });

      window.Protobject.Core.init({
        app: "TU_APP_ID", // reemplaza esto con tu App ID real
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h2>Control del Servo</h2>
      <div id="ProtobjectPlusButton"></div>
    </div>
  );
};

export default ControlKnob;
