import React, { useEffect, useState, useContext } from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import "../styles/modal.css";
import { Context } from '../app.jsx';

const Modal = ({ isOpen, objectData, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [closing, setClosing] = useState(false);
  const [playingSound, setPlayingSound] = useState(false);
  const [rotateImage, setRotateImage] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  const [sound, setSound] = useState(null);
  
  const {
    ambientSound
  } = useContext(Context);

  useEffect(() => {
    if (isOpen && objectData) {
      setShouldRender(true);
      setClosing(false);
      setLoadingImage(true);
    } else if (shouldRender) {
      setClosing(true);
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setClosing(false);
        setRotateImage(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, objectData]);
  
  useEffect(() => {
    console.log(`https://gbarrueto.github.io/infovis-assets/snd/${objectData?.id}.wav`);
    console.log(`objectData: ${objectData}. id: ${objectData?.id}`)
    if (objectData) {
      console.log('New sound')
      const newSound = new Audio(
        `https://gbarrueto.github.io/infovis-assets/snd/${objectData.id}.wav`
      );
      console.log(newSound)
      newSound.loop = false;
      newSound.onended = () => {
        setPlayingSound(false); 
        if (ambientSound) {
          ambientSound.volume = 0.1;
        }
      };
      setSound(newSound);
    }
    
    return () => {
      console.log('Unmounting modal')
      sound.pause();
      setSound(null);
    }
  }, [objectData?.id]);
  
  /* 
  useEffect(() => {
    if (sound.ended) {
      setPlayingSound(false);
      sound.currentTime = 0;
    }
  }, [sound?.ended])
  */

  if (!shouldRender || !objectData) return null;

  const backgroundColor = objectData.color;
  const textColor = getContrastColor(backgroundColor);

  const modalStyle = {
    backgroundColor,
    color: textColor,
  };

  function handleSoundButtonClick() {
    console.log(`PlayingSound? ${playingSound}. sound? ${sound}`)
    if (!playingSound) {
      if (sound) {
        sound
          .play()
          .then(() => {
            ambientSound.volume = 0;
            setPlayingSound(true);
          })
          .catch((err) => {
            console.error("Error playing sound:", err);
          });
      }
    } else {
      sound.pause();
      setPlayingSound(false);
      ambientSound.volume = 0.1;
    }
  }

  return (
    <div
      className={`modal-panel ${closing ? "closing" : ""} ${
        rotateImage ? "rotated-modal" : ""
      }`}
      style={modalStyle}
    >
      {loadingImage ? (
        <p className="loading-text">Cargando..</p>
      ) : (
        <>
          <button className="close-button" onClick={onClose}>
              ×
            </button>
          <div className="modal-header">
            <h3>{objectData.object}</h3>
          </div>

          <div className="modal-image-container">
            <img
              src={`https://gbarrueto.github.io/infovis-assets/img/${objectData.id}.jpg`}
              alt={objectData.object}
              className={`modal-image ${rotateImage ? "rotate-image" : ""}`}
            />
          </div>

          <p className="modal-description">
            {objectData.description || "Descripción no disponible."}
          </p>

          <button onClick={handleSoundButtonClick}>
            {!playingSound ? <IoPlay /> : <IoPause />}
          </button>
        </>
      )}

      {/* Imagen se carga incluso cuando loading, pero invisible al usuario */}
      <img
        src={`https://gbarrueto.github.io/infovis-assets/img/${objectData.id}.jpg`}
        alt=""
        style={{ display: "none" }}
        onLoad={(e) => {
          const img = e.target;
          setLoadingImage(false);
          setRotateImage(img.naturalHeight > img.naturalWidth);
        }}
      />
    </div>
  );
};

function getContrastColor(hexColor) {
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#ffffff";
}

export default Modal;
