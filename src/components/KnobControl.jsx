import React, { useEffect, useRef } from "react";

export default function KnobControl() {
    const knobContainer = useRef(null);

    useEffect(() => {
        // Verifica que Protobject esté disponible en el objeto global window
        if (window.Protobject) {
            // Instanciar la perilla con los mismos parámetros que en el ejemplo
            const perilla = new window.Protobject.Knob({ min: -1500, max: 1500 });

            // Agregar el elemento generado por Protobject al contenedor
            if (knobContainer.current && perilla.element) {
                knobContainer.current.appendChild(perilla.element);
            }

            // Configurar el evento onChange para enviar datos al Arduino
            perilla.onChange((value) => {
                window.Protobject.Core.send({ speed: value }).to("arduino");
            });
        }
    }, []);

    return (
        <div style={{textAlign: "center", marginTop: "40px"}}>
            <h2>Control de Arduino vía Protobject</h2>
            <div ref={knobContainer}></div>
        </div>
    );
}