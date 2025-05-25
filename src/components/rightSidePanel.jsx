import { useContext, useState, useEffect } from 'react';
import ToolsBar from './toolsBar';
import Modal from './modal';
import { Context } from "../app.jsx";
import '../styles/rightSidePanelStyle.css';


const fovImages = {
  "07": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/Selected-07.png?v=1747852148891",
  "15": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/Selected-15.png?v=1747852190914",
  "35": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/Selected-35.png?v=1747852253453",
  "70": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/Selected-70.png?v=1747852261877",
};

const zoomFovImages = {
  "07": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/_0.7%C2%B0.png?v=1747852068533",
  "15": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/0.7%C2%B0%20a%201.5%C2%B0.png?v=1747852092188",
  "35": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/1.5%C2%B0%20a%203.5%C2%B0.png?v=1747852095693",
  "70": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/3.5%C2%B0%20a%207.0%C2%B0.png?v=1747852107423"
}

const gearImages = {
  "07": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/gear%20-%20menor%20a%200.7%20%C2%B0%20-%20mayor%20a%201100mm.png?v=1748206548336",
  "15": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/gear%20-%200.7%C2%B0%20a%201.5%C2%B0%20900mm.jpeg?v=1748206551936",
  "35": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/gear-1.5%C2%B0%20a%203.5%C2%B0%20-%20300mm.png?v=1748206545170",
  "70": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/gear-3.5%C2%B0%20a%207%C2%B0-135mm.png?v=1748206533125"
}

const gearDesc = {
  "07": "Equipo: Celestron Edge HD 8. Focal: 2032mm"
  "15": "Equipo: "
}

export default function RightPanel({ hemisphereSelected, setHemisphereSelected, fovSelected, setFovSelected }) {
  const {
    loading,
    setLoading,
    topPorFovNorth,
    setTopPorFovNorth,
    topPorFovSouth,
    setTopPorFovSouth,
    listasPorFovNorth,
    setListasPorFovNorth,
    listasPorFovSouth,
    setListasPorFovSouth,
    isModalOpen,
    setIsModalOpen, // Estado del modal
    selectedObject,
    setSelectedObject, // Objeto seleccionado
  } = useContext(Context);
  
  const [hoveredFov, setHoveredFov] = useState(null);
  
  useEffect(() => {
    setIsModalOpen(true);
  }, [selectedObject])
  
  
  return (
    <aside className="rightPanel">
      
      <ToolsBar hemisphereSelected={hemisphereSelected} onHemisphereSelected={setHemisphereSelected} fovSelected={fovSelected} onFovSelected={setFovSelected} setHoveredFov={setHoveredFov} />
      
      {/* Extra info Images */}
      <section className="extraInfoContainer">
        <div className="extraInfo fovInfo">
          <img 
            src={fovImages[hoveredFov || fovSelected]}
            className="extraInfoImage"
            onMouseOver={e => {e.currentTarget.src = zoomFovImages[fovSelected]}}
            onMouseOut={e => {e.currentTarget.src = fovImages[hoveredFov || fovSelected]}}
          />
        </div>
        
        <div className="extraInfo equipmentInfo">
          <img
            src={gearImages[hoveredFov || fovSelected]}
            className="extraInfoImage"
          />
        </div>
      </section>
      
      <section className="objectInfoContainer">
        <Modal
          isOpen={isModalOpen} // Determina si el modal está abierto
          objectData={selectedObject} // Pasa el objeto seleccionado al modal
          onClose={() => setIsModalOpen(false)} // Cierra el modal
        />
      </section>
      
    </aside>
  )
}