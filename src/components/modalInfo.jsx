import { useState, useEffect } from 'react';
import '../styles/modalInfoStyle.css';

export default function ModalInfo({ displayModal, setDisplayModal }) {
  const [hideStyle, setHideStyle] = useState({});
  
  function hideModal() {
    setDisplayModal('hideModalInfo');
  }
  
  useEffect(() => {
    if (displayModal === 'showModalInfo') {
      setHideStyle({});
    }
    else {
      setTimeout(() => {
      setHideStyle({
        zIndex: -1
      })
    }, 500);
    }
  }, [displayModal])
  
  return (
    <div className={`modalInfoOverlay ${displayModal}`} style={hideStyle} onClick={hideModal}>
      <div className="modalInfoWrapper" onClick={e => e.stopPropagation()}>
        <button className='closeButton' onClick={hideModal}>X</button>
        <section className="modalInfoContent">
          <h1>¿Qué es esto?</h1>
          <p>
            Esta visualización muestra cuáles son los objetos o regiones del cielo nocturno más fotografiados por astrofotógrafos de todo el mundo.

            Cada punto en el gráfico representa uno de estos objetos. Su posición corresponde a sus coordenadas reales en el cielo, y su tamaño indica qué tan frecuentemente aparece en fotografías.

            Dado que las imágenes provienen de muchas fuentes distintas, los datos están organizados mediante dos filtros clave: el hemisferio y el campo visual. A continuación te daremos la información necesaria para entender esto:
          </p>

          <h3>🔭 Los datos: objetos en el cielo</h3>
          <p>
            Cada punto visible representa un objeto o área del cielo. La ubicación de cada uno se basa en sus coordenadas astronómicas reales (ascensión recta y declinación), por lo que su posición en el gráfico refleja su posición aparente en el cielo nocturno.

            El tamaño del area indica su frecuencia relativa dentro de su conjunto de imágenes. A mayor frecuencia, más veces aparece ese objeto en fotografías dentro de ese grupo.
          </p>

          <h3>📊 ¿Qué significa la frecuencia?</h3>
          <p>
            La frecuencia refleja qué tan popular es un objeto dentro de su grupo específico de imágenes.

            Ejemplo: si el grupo contiene 1.000 imágenes, y un objeto tiene una frecuencia de 1%, significa que ese objeto aparece en 10 imágenes.

            ⚠ Ten en cuenta que los grupos no tienen el mismo número de imágenes, por lo tanto, las frecuencias no se pueden comparar entre grupos distintos, solo dentro del mismo campo visual.
          </p>

          <h3>🌍 Filtro por hemisferio</h3>
          <p>
          El cielo completo no puede mostrarse en un solo gráfico porque:

          - La esfera celeste se divide entre el hemisferio norte y sur.

          - Algunos objetos solo son visibles desde uno de los hemisferios (especialmente los cercanos a los polos celestes).

          Por este motivo, los datos están divididos por hemisferio, permitiendo una representación más clara y relevante para cada parte del mundo.
          </p>

          <h3>🎯 Filtro por campo visual</h3>
          <p>Cada astrofotografía cubre una región distinta del cielo, dependiendo del equipo utilizado. A esto lo llamamos campo visual: el tamaño del área del cielo que capta una imagen, medido en grados.

            Campo visual pequeño: producido por telescopios potentes (zoom alto), muestra detalles finos de objetos pequeños.

            Campo visual amplio: producido por lentes o telescopios cortos, muestra grandes regiones del cielo.

            Para ayudarte a visualizar esto, el selector de campo visual incluye ejemplos de:

            📷 Cómo se vería la Luna en cada escala.

            🔭 Qué tipo de telescopio o lente se necesitaría para obtener una imagen de ese campo visual, usando una cámara APS-C como referencia.
          </p>
        </section>
      </div>
    </div>
  )
}