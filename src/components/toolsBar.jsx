import { useState, useContext, useEffect } from "react";
import { Link } from "wouter";
import "../styles/toolsBarStyle.css";


const fovColors = {
  "07": "#1f78b4", // azul fuerte
  "15": "#33a02c", // verde accesible
  "35": "#ff7f00", // naranja accesible
  "70": "#ff6ec7", // violeta fuerte
};


export default function ToolsBar({ hemisphereSelected, onHemisphereSelected, fovSelected, onFovSelected, setHoveredFov }) {

  function handleMouseEnter(fov) {
    setHoveredFov?.(fov);
  }
  
  function handleMouseLeave() {
    setHoveredFov?.(null);
  }
  
  return (
    <section className="toolsBarContainer">
      <section className="hemisphereSelectorContainer">
        <Link
          to={`/N/${fovSelected || '07'}`}
          className={`hemisphereSelector ${hemisphereSelected === "N" ? "activeSelector" : ""}`}
          onClick={() => onHemisphereSelected("N")}
        > Hemisferio Norte
        </Link>
        <Link
          to={`/S/${fovSelected || '07'}`}
          className={`hemisphereSelector ${hemisphereSelected === "S" ? "activeSelector" : ""}`}
          onClick={() => onHemisphereSelected("S")}
        > Hemisferio Sur
        </Link>
      </section>
      
      <section className="fovSelectorContainer">
        
        {["07", "15", "35", "70"].map((fov) => (
          <Link
            key={fov}
            to={`/${hemisphereSelected}/${fov}`}
            className={`fovSelector ${fovSelected === fov ? "activeFovSelector" : ""}`}
            onClick={() => onFovSelected(fov)}
            onMouseEnter={() => handleMouseEnter(fov)}
            onMouseLeave={handleMouseLeave}
            style={fovSelected === fov ? { backgroundColor: fovColors[fov] } : {}}
          >
            {fov === "07" ? "0.7" : fov === "15" ? "1.5" : fov === "35" ? "3.5" : "7"}
          </Link>
        ))}
        
      </section>
    </section>
  )
}