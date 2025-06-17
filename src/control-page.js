// src/ControlPage.js
import React, { useEffect } from "react";

const ControlPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.protobject.com/framework/p.js";
    script.async = true;
    script.onload = () => {
      const perilla = new window.Protobject.Knob({ min: -1500, max: 1500 });
      perilla.onChange((value) => {
        window.Protobject.Core.send({ speed: value }).to("arduino.html");
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h1>Control del Servo</h1>
      <div id="ProtobjectPlusButton"></div>
    </div>
  );
};

export default ControlPage;
