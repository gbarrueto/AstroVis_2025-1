import { useState, useContext, useEffect } from "react";
import { Link } from "wouter";
import "../styles/toolsBarStyle.css";


const fovColors = {
  "07": "#1f78b4", // azul fuerte
  "15": "#33a02c", // verde accesible
  "35": "#ff7f00", // naranja accesible
  "70": "#ff6ec7", // violeta fuerte
};


export default function ToolsBar({ hemisphereSelected, onHemisphereSelected, fovSelected, onFovSelected }) {

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
        
        <Link
          to={`/${hemisphereSelected}/07`}
          className={`fovSelector ${fovSelected === "07" ? "activeFovSelector" : ""}`}
          onClick={() => onFovSelected("07")}
          style={ fovSelected === '07' ? { backgroundColor: fovColors[fovSelected] } : {}}
        > 0.7
        </Link>
        
        <Link
          to={`/${hemisphereSelected}/15`}
          className={`fovSelector ${fovSelected === "15" ? "activeFovSelector" : ""}`}
          onClick={() => onFovSelected("15")}
          style={ fovSelected === '15' ? { backgroundColor: fovColors[fovSelected] } : {}}
        > 1.5
        </Link>
        
        <Link
          to={`/${hemisphereSelected}/35`}
          className={`fovSelector ${fovSelected === "35" ? "activeFovSelector" : ""}`}
          onClick={() => onFovSelected("35")}
          style={ fovSelected === '35' ? { backgroundColor: fovColors[fovSelected] } : {}}
        > 3.5
        </Link>
        
        <Link
          to={`/${hemisphereSelected}/70`}
          className={`fovSelector ${fovSelected === "70" ? "activeFovSelector" : ""}`}
          onClick={() => onFovSelected("70")}
          style={ fovSelected === '70' ? { backgroundColor: fovColors[fovSelected] } : {}}
        > 7.0
        </Link>
        
      </section>
    </section>
  )
}