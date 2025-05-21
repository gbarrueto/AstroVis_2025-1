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
      <section className="extraInfo">
        <div className="fovInfo">
        </div>
        
        <div className="equipmentInfo">
        </div>
      </section>
      
    </aside>
  )
}