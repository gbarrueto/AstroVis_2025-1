import React, { useContext, useRef, useEffect } from "react";
import "../styles/fovTable.css";
import { Context } from "../app.jsx";

const fovLabels = {
  "< 0.7 deg": "0° - 0.7°",
  ">= 0.7 AND < 1.5 deg": "0.7° - 1.5°",
  ">= 1.5 AND < 3.5 deg": "1.5° - 3.5°",
  ">= 3.5 AND < 7 deg": "3.5° - 7°",
};

const fovColors = {
  "< 0.7 deg": "#1f78b4", // azul fuerte
  ">= 0.7 AND < 1.5 deg": "#33a02c", // verde accesible
  ">= 1.5 AND < 3.5 deg": "#ff7f00", // naranja accesible
  ">= 3.5 AND < 7 deg": "#ff6ec7", // violeta fuerte
};

const tableTitleByFov = {
  "07": "0° - 0.7°",
  "15": "0.7° - 1.5°",
  "35": "1.5° - 3.5°",
  "70": "3.5° - 7°"
};

const fovListEntries = {
  "07": "< 0.7 deg",
  "15": ">= 0.7 AND < 1.5 deg",
  "35": ">= 1.5 AND < 3.5 deg",
  "70": ">= 3.5 AND < 7 deg"
};

const FovTable = ({ objectsByHemisphereFov, fovSelected, hemisphereSelected }) => {
  const {
    listasPorFovNorth,
    listasPorFovSouth,
    selectedObject,
    setSelectedObject,
    setHoveredTableObject,
    setIsModalOpen
  } = useContext(Context);

  const rowRefs = useRef({});

  function handleTableClick(object) {
    setSelectedObject(object);
    setIsModalOpen(true);
  }

  function handleMouseEnter(object) {
    setHoveredTableObject(object);
  }

  function handleMouseLeave() {
    setHoveredTableObject(null);
  }

  // Scroll automático al objeto seleccionado
  useEffect(() => {
    if (selectedObject && rowRefs.current[selectedObject.id]) {
      rowRefs.current[selectedObject.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedObject]);

  const currentList = hemisphereSelected === 'N'
    ? listasPorFovNorth[fovListEntries[fovSelected]]
    : listasPorFovSouth[fovListEntries[fovSelected]];

  return (
    <div className="tableWrapper">
      <section id="topTitleContainer">
        <h3 style={{ color: "#c7a4ff" }}>Campo visual {tableTitleByFov[fovSelected]}</h3>
      </section>

      <section id="fovTopContainer">
        <table className="objectsTable">
          <thead>
            <tr>
              <th>Objeto</th>
              <th>Frecuencia</th>
            </tr>
          </thead>
          <tbody>
            {currentList ? currentList.map((obj, i) => (
              <tr
                key={i}
                ref={(el) => rowRefs.current[obj.id] = el}
                onClick={() => handleTableClick(obj)}
                onMouseEnter={() => handleMouseEnter(obj)}
                onMouseLeave={handleMouseLeave}
                style={(selectedObject && selectedObject.id === obj.id)
                  ? { backgroundColor: 'aqua' }
                  : {}}
              >
                <td style={{ color: fovColors[fovListEntries[fovSelected]] }}>{obj.object}</td>
                <td style={{ color: fovColors[fovListEntries[fovSelected]] }}>
                  {obj.frecuencia.toFixed(2)}%
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default FovTable;
