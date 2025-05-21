import ToolsBar from './toolsBar.jsx';
import '../styles/rightSidePanelStyle.css';

export default function RightPanel({ hemisphereSelected, fovSelected }) {
  return (
    <aside className="rightPanel">
      
      <ToolsBar hemisphereSelected={hemisphereSelected} fovSelected={fovSelected} />
      
    </aside>
  )
}