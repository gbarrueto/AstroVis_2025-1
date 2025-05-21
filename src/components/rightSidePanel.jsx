import { useContext, useState } from 'react';
import ToolsBar from './toolsBar';
import Modal from './modal';
import { Context } from "../app.jsx";
import '../styles/rightSidePanelStyle.css';


const fovImages = {
  "07": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/Selected-07.png?v=1747819677785",
  "15": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/Selected-15.png?v=1747819827997",
  "35": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/Selected-35.png?v=1747819840105",
  "70": "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/Selected-70.png?v=1747819844227",
};


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
  
  
  return (
    <aside className="rightPanel">
      
      <ToolsBar hemisphereSelected={hemisphereSelected} onHemisphereSelected={setHemisphereSelected} fovSelected={fovSelected} onFovSelected={setFovSelected} setHoveredFov={setHoveredFov} />
      
      <Modal
        isOpen={isModalOpen} // Determina si el modal está abierto
        objectData={selectedObject} // Pasa el objeto seleccionado al modal
        onClose={() => setIsModalOpen(false)} // Cierra el modal
      />
      
      {/* Extra info Images */}
      <section className="extraInfoContainer">
        <div className="extraInfo fovInfo">
          <img 
            src={fovImages[fovSelected]}
            className="extraInfoImage"
          />
        </div>
        
        <div className="extraInfo equipmentInfo">
          <img
            src="https://pbs.twimg.com/media/GrUDO75WQAAC5TB?format=jpg&name=large"
            className="extraInfoImage"
          />
        </div>
      </section>
      
    </aside>
  )
}