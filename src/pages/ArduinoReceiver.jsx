import React, { useEffect } from "react";
import { setupProtobject } from "../protobjectConfig";


const ArduinoReceiver = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.protobject.com/framework/p.js";
    script.async = true;

    script.onload = () => {
      
      setupProtobject();
      
      window.Protobject.Arduino.start();
      window.Protobject.Core.onReceived((data) => {
        window.Protobject.Arduino.servoWrite({ pin: 5, value: data.speed });
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <h2>Arduino conectado</h2>;
};

export default ArduinoReceiver;
