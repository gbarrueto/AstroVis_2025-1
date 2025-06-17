// src/ArduinoPage.js
import React, { useEffect } from "react";

const ArduinoPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.protobject.com/framework/p.js";
    script.async = true;
    script.onload = () => {
      window.Protobject.Arduino.start();
      window.Protobject.Core.onReceived((data) => {
        window.Protobject.Arduino.servoWrite({ pin: 5, value: data.speed });
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h1>Arduino conectado</h1>
      <div id="ProtobjectPlusButton"></div>
    </div>
  );
};

export default ArduinoPage;
