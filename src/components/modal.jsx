import React, { useEffect, useState } from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import "../styles/modal.css";

const Modal = ({ isOpen, objectData, onClose, objImage }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [closing, setClosing] = useState(false);
  const [playingSound, setPlayingSound] = useState(false);
  
  const sound = new Audio('https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/ceeday-huh-sound-effect.mp3?v=1747859135599')
  sound.loop = true;
  
  // Controla la aparición/desaparición con animación
  useEffect(() => {
    if (isOpen && objectData) {
      setShouldRender(true);
      setClosing(false);
    } else if (shouldRender) {
      // Comienza animación de salida
      setClosing(true);
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setClosing(false);
      }, 300); // Duración de la animación de salida
      return () => clearTimeout(timeout);
    }
  }, [isOpen, objectData]);

  if (!shouldRender || !objectData) return null;

  const backgroundColor = objectData.color;
  const textColor = getContrastColor(backgroundColor);

  const modalStyle = {
    backgroundColor,
    color: textColor,
  };
  
  
  function handleSoundButtonClick() {
    if (!playingSound) {
      sound.play();
      setPlayingSound(true);
    }
    else {
      sound.stop();
      setPlayingSound(false)
    }
  }
  

  return (
    <div className={`modal-panel ${closing ? "closing" : ""}`} style={modalStyle}>
      <h3>{objectData.object}</h3>

      <img
        src={`https://gbarrueto.github.io/infovis-assets/img/${objectData.id}.jpg`}
        alt={objectData.object}
        className="modal-image"
      />
      
      <button
        onClick={handleSoundButtonClick}
        >{ !playingSound ? <IoPlay />
        : <IoPause />
         }
      </button>


      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

// Reutiliza la función para contraste
function getContrastColor(hexColor) {
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#ffffff";
}

export default Modal;
