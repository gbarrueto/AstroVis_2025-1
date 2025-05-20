import { useState, useContext } from "react";
import { Link } from "wouter";
import { DataContext } from '../app.jsx';
import "../styles/toolsBarStyle.css";

export default function ToolsBar({ hemisphereSelected, onHemisphereSelect, fovSelected, onFovSelected }) {
  return (
    <section className="toolsBarContainer">
      <section className="hemisphereSelector">
        <button>Hermisferio Norte</button>
        <button>Hemisferio Sur</button>
      </section>
      
      <section className="fovSelector">
        <button>0.7</button>
        <button>1.5</button>
        <button>3.5</button>
        <button>7.0</button>
      </section>
    </section>
  )
}