import { useContext } from 'react';
import ToolsBar from './toolsBar';
import Modal from './modal';
import { Context } from "../app.jsx";
import '../styles/rightSidePanelStyle.css';


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
  
  
  return (
    <aside className="rightPanel">
      
      <ToolsBar hemisphereSelected={hemisphereSelected} onHemisphereSelected={setHemisphereSelected} fovSelected={fovSelected} onFovSelected={setFovSelected} />
      
      <Modal
        isOpen={isModalOpen} // Determina si el modal está abierto
        objectData={selectedObject} // Pasa el objeto seleccionado al modal
        onClose={() => setIsModalOpen(false)} // Cierra el modal
      />
      
      {/* Extra info Images */}
      <section className="extraInfoContainer">
        <div className="extraInfo fovInfo">
          <img 
            src="https://preview.redd.it/suisei-archives-a-new-sui-themed-exhibition-starting-in-jp-v0-buh863ijkx0f1.jpeg?auto=webp&s=6f7ac2e0089de61eb0c2812a4297f00f18c10d4f"
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