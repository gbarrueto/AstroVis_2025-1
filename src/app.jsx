// Home.jsx
import React, { useState, createContext } from "react";
import { Router } from "wouter";

import "./styles/styles.css";
import PageRouter from "./components/router.jsx";
import Toggler from './components/hemisphereToggler.jsx';
import Seo from './components/seo.jsx';
import ToolsBar from './components/toolsBar.jsx';

export const DataContext = createContext(null);

export default function Home() {
  const [hemisphere, setHemisphere] = useState("N");
  const [fov, setFov] = useState('0.7');
  const [loading, setLoading] = useState(true);
  const [topPorFovNorth, setTopPorFovNorth] = useState({});
  const [topPorFovSouth, setTopPorFovSouth] = useState({});
  const [listasPorFovNorth, setListasPorFovNorth] = useState({});
  const [listasPorFovSouth, setListasPorFovSouth] = useState({});

  // Añadir estados de Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  const context = {
    loading, setLoading,
    topPorFovNorth, setTopPorFovNorth,
    topPorFovSouth, setTopPorFovSouth,
    listasPorFovNorth, setListasPorFovNorth,
    listasPorFovSouth, setListasPorFovSouth,
    // Estados del Modal
    isModalOpen, setIsModalOpen,
    selectedObject, setSelectedObject
  };

  return (
    <DataContext.Provider value={context}>
      <Router>
        <Seo />
        <main role="main" className="wrapper">
          <div className="content">
            <Toggler selected={hemisphere} onSelect={setHemisphere} />
            <PageRouter />
            <ToolsBar hemisphereSelected={hemisphere} onHemispehereSelected={setHemisphere} fovSelected={fov} onFovSelected={setFov} />
          </div>
        </main>
      </Router>
    </DataContext.Provider>
  );
}
