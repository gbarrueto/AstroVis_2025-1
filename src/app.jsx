// Home.jsx
import React, { useState, createContext, useEffect } from "react";
import { Router, useLocation, useRoute } from "wouter";

import "./styles/styles.css";
import PageRouter from "./components/router.jsx";
import Seo from './components/seo.jsx';
import ToolsBar from './components/toolsBar.jsx';
import LeftPanel from './components/leftSidePanel.jsx';
import RightPanel from './components/rightSidePanel.jsx';
import ModalInfo from './components/modalInfo.jsx';


export const Context = createContext(null);


export default function Home() {
  const [ambientSound] = useState(
    new Audio('https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/02%20Cornfield%20Chase.mp3?v=1748135392471')
  );
  
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute("/:hemisphere/:fov");
  
  const [hemisphere, setHemisphere] = useState(match ? params.hemisphere : 'N');
  const [fov, setFov] = useState(match ? params.fov : '07');
  const [loading, setLoading] = useState(true);
  const [topPorFovNorth, setTopPorFovNorth] = useState({});
  const [topPorFovSouth, setTopPorFovSouth] = useState({});
  const [listasPorFovNorth, setListasPorFovNorth] = useState({});
  const [listasPorFovSouth, setListasPorFovSouth] = useState({});
  const [objectsByHemisphereFov, setObjectsByHemisphereFov] = useState({})
  const [displayModalInfo, setDisplayModalInfo] = useState(false);

  // Añadir estados de Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  
  const [hoveredTableObject, setHoveredTableObject] = useState(null);

  const context = {
    loading, setLoading,
    topPorFovNorth, setTopPorFovNorth,
    topPorFovSouth, setTopPorFovSouth,
    listasPorFovNorth, setListasPorFovNorth,
    listasPorFovSouth, setListasPorFovSouth,
    // Estados del Modal
    isModalOpen, setIsModalOpen,
    selectedObject, setSelectedObject,
    hoveredTableObject, setHoveredTableObject,
    objectsByHemisphereFov, setObjectsByHemisphereFov,
    displayModalInfo, setDisplayModalInfo
  };
  
  
  useEffect(() => {
    ambientSound.loop = true;
    ambientSound.volume = 0.2;
    ambientSound.play();
  }, [])
  
  
  function toggleModalInfo() {
    setDisplayModalInfo(!displayModalInfo);
  }
  

  return (
    <Context.Provider value={context}>
        <Router>
          <Seo />
          <main role="main" className="wrapper">
            <div className="content">
              <LeftPanel hemisphereSelected={hemisphere} fovSelected={fov} />
              <PageRouter />
              <RightPanel hemisphereSelected={hemisphere} setHemisphereSelected={setHemisphere} fovSelected={fov} setFovSelected={setFov} />
              { displayModalInfo ? <ModalInfo /> : null }
            </div>
          </main>
        </Router>
    </Context.Provider>
  );
}
