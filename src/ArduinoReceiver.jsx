// src/components/ArduinoReceiver.jsx
import React, { useEffect } from "react";

const ArduinoReceiver = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.protobject.com/framework/p.js";
    script.async = true;
    script.onload = () => {
      window.Protobject.Core.init({
        app: "TU_APP_ID", // igual que antes
      });

      window.Protobject.Arduino.start();

      window.Protobject.Core.onReceived((data) => {
        if (data.speed !== undefined) {
          window.Protobject.Arduino.servoWrite({ pin: 5, value: data.speed });
        }
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h2>Arduino conectado</h2>
      <div id="ProtobjectPlusButton"></div>
    </div>
  );
};

export default ArduinoReceiver;
