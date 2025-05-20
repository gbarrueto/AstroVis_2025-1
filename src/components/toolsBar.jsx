import { useState, useContext } from "react";
import { Link } from "wouter";
import { DataContext } from '../app.jsx';
import "../styles/toolsBarStyle.css";

export default function ToolsBar({ hemisphereSelected, onHemisphereSelected, fovSelected, onFovSelected }) {
  
  return (
    <section className="toolsBarContainer">
      <section className="hemisphereSelectorContainer">
        <Link
          to={`/north/${fovSelected || '0.7'}`}
          className={`hemisphereSelector ${hemisphereSelected === "N" ? "activeSelector" : ""}`}
          onClick={() => onHemisphereSelected("N")}
        > Hemisferio Norte
        </Link>
        <Link
          to={`/south/${fovSelected || '0.7'}`}
          className={`hemisphereSelector ${hemisphereSelected === "S" ? "activeSelector" : ""}`}
          onClick={() => onHemisphereSelected("S")}
        > Hemisferio Sur
        </Link>
      </section>
      
      <section className="fovSelector">
        <Link
          to={`/${hemisphereSelected}/0.7`}
          className={`hemisphereSelector ${hemisphereSelected === "S" ? "activeSelector" : ""}`}
          onClick={() => onHemisphereSelected("S")}
        > Hemisferio Sur
        </Link>
        <button>1.5</button>
        <button>3.5</button>
        <button>7.0</button>
      </section>
    </section>
  )
}