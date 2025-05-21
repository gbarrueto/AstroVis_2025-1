// Home.jsx
import React, { useState, createContext, useEffect } from "react";
import { Router, useLocation } from "wouter";

import "./styles/styles.css";
import PageRouter from "./components/router.jsx";
import Seo from './components/seo.jsx';
import ToolsBar from './components/toolsBar.jsx';
import LeftPanel from './components/leftSidePanel.jsx';

export const DataContext = createContext(null);
export const SelectorsContext = createContext(null);

export default function Home() {
  const [location, setLocation] = useLocation();
  
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
  
  const selectorsContext = {
    hemisphere, setHemisphere,
    fov, setFov
  };
  
  useEffect(() => {
    setLocation(`/${hemisphere}/${fov}`)
  }, [])

  return (
    <DataContext.Provider value={context}>
      <SelectorsContext.Provider value={selectorsContext}>
      </SelectorsContext.Provider>
      <Router>
        <Seo />
        <main role="main" className="wrapper">
          <div className="content">
            <LeftPanel selected={hemisphere} />
            <PageRouter />
            <ToolsBar hemisphereSelected={hemisphere} onHemisphereSelected={setHemisphere} fovSelected={fov} onFovSelected={setFov} />
          </div>
        </main>
      </Router>
    </DataContext.Provider>
  );
}
