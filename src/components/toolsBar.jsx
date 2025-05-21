import { useState, useContext } from "react";
import { Link } from "wouter";
import { Context } from '../app.jsx';
import "../styles/toolsBarStyle.css";

export default function ToolsBar({ hemisphereSelected, fovSelected }) {
  const {
    onHemisphereSelected,
    onFovSelected
  } = useContext(Context);
  
  return (
    <section className="toolsBarContainer">
      <section className="hemisphereSelectorContainer">
        <Link
          to={`/N/${fovSelected || '0.7'}`}
          className={`hemisphereSelector ${hemisphereSelected === "N" ? "activeSelector" : ""}`}
          onClick={() => onHemisphereSelected("N")}
        > Hemisferio Norte
        </Link>
        <Link
          to={`/S/${fovSelected || '0.7'}`}
          className={`hemisphereSelector ${hemisphereSelected === "S" ? "activeSelector" : ""}`}
          onClick={() => onHemisphereSelected("S")}
        > Hemisferio Sur
        </Link>
      </section>
      
      <section className="fovSelectorContainer">
        
        <Link
          to={`/${hemisphereSelected}/0.7`}
          className={`fovSelector ${fovSelected === "0.7" ? "activeFovSelector" : ""}`}
          onClick={() => onFovSelected("0.7")}
        > 0.7
        </Link>
        
        <Link
          to={`/${hemisphereSelected}/1.5`}
          className={`fovSelector ${fovSelected === "1.5" ? "activeFovSelector" : ""}`}
          onClick={() => onFovSelected("1.5")}
        > 1.5
        </Link>
        
        <Link
          to={`/${hemisphereSelected}/3.5`}
          className={`fovSelector ${fovSelected === "3.5" ? "activeFovSelector" : ""}`}
          onClick={() => onFovSelected("3.5")}
        > 3.5
        </Link>
        
        <Link
          to={`/${hemisphereSelected}/7.0`}
          className={`fovSelector ${fovSelected === "7.0" ? "activeFovSelector" : ""}`}
          onClick={() => onFovSelected("7.0")}
        > 1.5
        </Link>
        
      </section>
    </section>
  )
}