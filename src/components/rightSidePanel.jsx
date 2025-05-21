import ToolsBar from './toolsBar.jsx';
import '../styles/rightSidePanelStyle.css';

export default function RightPanel({ hemisphereSelected, setHemisphereSelected, fovSelected, setFovSelected }) {
  return (
    <aside className="rightPanel">
      
      <ToolsBar hemisphereSelected={hemisphereSelected} onHemisphereSelected={setHemisphereSelected} fovSelected={fovSelected} onFovSelected={setFovSelected} />
      
    </aside>
  )
}