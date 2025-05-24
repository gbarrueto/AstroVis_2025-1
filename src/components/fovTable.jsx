import React, { useContext } from "react";
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
}

const fovListEntries = {
  "07": "< 0.7 deg",
  "15": ">= 0.7 AND < 1.5 deg",
  "35": ">= 1.5 AND < 3.5 deg",
  "70": ">= 3.5 AND < 7 deg"
}

const FovTable = ({ objectsByHemisphereFov, fovSelected, hemisphereSelected }) => {
  const {
    listasPorFovNorth,
    listasPorFovSouth,
    selectedObject,
    setSelectedObject,
    setHoveredTableObject
  } = useContext(Context);
  
  function handleTableClick(object) {
    setSelectedObject(object);
  }
  
  function handleMouseEnter(object) {
    setHoveredTableObject(object);
  }
  
  function handleMouseLeave() {
    setHoveredTableObject(null);
  }
  
  
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
            {hemisphereSelected === 'N' ? (listasPorFovNorth[fovListEntries[fovSelected]] ? listasPorFovNorth[fovListEntries[fovSelected]].map((obj, i) => (
              <tr key={i} 
                onClick={() => handleTableClick(obj)} 
                onMouseEnter={() => handleMouseEnter(obj)}
                
                style={(selectedObject && selectedObject.id === obj.id) ? { backgroundColor: 'aqua' } : {}}>
                <td style={{ color: fovColors[fovListEntries[fovSelected]] }}>{obj.object}</td>
                <td style={{ color: fovColors[fovListEntries[fovSelected]] }}>
                  {obj.frecuencia.toFixed(2)}%
                </td>
              </tr>
            )) : <></>) : (listasPorFovSouth[fovListEntries[fovSelected]] ? listasPorFovSouth[fovListEntries[fovSelected]].map((obj, i) => (
              <tr key={i} onClick={() => handleTableClick(obj)} style={(selectedObject && selectedObject.id === obj.id) ? { backgroundColor: 'aqua' } : {}}>
                <td style={{ color: fovColors[fovListEntries[fovSelected]] }}>{obj.object}</td>
                <td style={{ color: fovColors[fovListEntries[fovSelected]] }}>
                  {obj.frecuencia.toFixed(2)}%
                </td>
              </tr>
            )) : <></>)}
          </tbody>
        </table>
          {/* 
          Object.entries(objectsByHemisphereFov).map(([fovLabel, objects], index) => (
            <section key={fovLabel} id={`deg${index}`} className="tableContainer"> 
              <table className="objectsTable">
                { 
                  index === 0 ? (
                    <thead>
                      <tr>
                        <th>Objeto</th>
                        <th>Frecuencia</th>
                      </tr>
                    </thead> 
                  ) : null
                }
                <tbody>
                  {objects.map((obj, i) => (
                    <tr key={i}>
                      <td style={{ color: fovColors[fovLabel] }}>{obj.object}</td>
                      <td style={{ color: fovColors[fovLabel] }}>
                        {obj.frecuencia.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))
          */}
      </section>
    </div>
  );
};

export default FovTable;
