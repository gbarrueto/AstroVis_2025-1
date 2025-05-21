import React from "react";
import "../styles/fovTable.css";

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

const FovTable = ({ objectsByHemisphereFov, fovSelected }) => {
  return (
    <div className="tableWrapper">
      <section id="topTitleContainer">
        <h3 style={{ color: "#c7a4ff" }}>Campo visual {`${fovSelected[0]}.${fovSelected[1]}`}°</h3>
      </section>
      
      <section id="fovTopContainer">
        <aside id="tablesWrapper">
          {Object.entries(objectsByHemisphereFov).map(([fovLabel, objects], index) => (
            <section key={fovLabel} id={`deg${index}`} className="tableContainer"> {/*Edi pon los campos visuales como intervalos*/}
              <table className="objectsTable">/* que me asusto */
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
          ))}
        </aside>
      </section>
    </div>
  );
};

export default FovTable;
