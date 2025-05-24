import React, { useEffect, useState } from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import "../styles/modal.css";

const Modal = ({ isOpen, objectData, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [closing, setClosing] = useState(false);
  const [playingSound, setPlayingSound] = useState(false);
  const [rotateImage, setRotateImage] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  const [sound] = useState(
    new Audio(
      "https://cdn.glitch.global/0c0b1603-f7b0-4ebf-bfd7-4c26ddf6d810/y2mate_5gbydy1.mp3?v=1747860004222"
    )
  );
  sound.loop = true;

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
    } else {
      sound.pause();
      setPlayingSound(false);
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
          <div className="modal-header">
            <h3>{objectData.object}</h3>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>

          <img
            src={`https://gbarrueto.github.io/infovis-assets/img/${objectData.id}.jpg`}
            alt={objectData.object}
            className={`modal-image ${rotateImage ? "rotate-image" : ""}`}
          />

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
