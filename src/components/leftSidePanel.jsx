import React from "react";
import FovTable from "./fovTable.jsx";
import { DataContext } from '../app.jsx';
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


export default function LeftPanel({ topObjectsByFov }) {
  return (
    <aside className="leftPanel">
      
      <!-- Title -->
      <div id="pageTitleContainer">
        <h1 id="pageTextTitle">
          Objetos de <span className="highlightText">Espacio Profundo</span> más 
          <span className="highlightText"> Fotografiados</span>
        </h1>
        <h3 id="pageSubTextTitle">(por amateurs)</h3>
      </div>
      
      
      <!-- Table -->
      
      
    </aside>
  )
}