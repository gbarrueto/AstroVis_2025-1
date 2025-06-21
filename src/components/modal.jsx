import React, { useEffect, useState, useContext } from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import "../styles/modal.css";
import { Context } from "../app.jsx";

const Modal = ({ isOpen, objectData, onClose, iframeRef }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [closing, setClosing] = useState(false);
  const [playingSound, setPlayingSound] = useState(false);
  const [rotateImage, setRotateImage] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState(null);

  const { ambientSound, ambientShouldSound } = useContext(Context);

  useEffect(() => {
    if (isOpen && objectData) {
      setShouldRender(true);
      setClosing(false);
      setLoadingImage(true);
      setProgress(0);
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
    if (sound) {
      sound.pause();
      setSound(null);
      setPlayingSound(false);
      if (ambientSound) ambientSound.volume = ambientShouldSound ? 0.1 : 0;
    }

    if (objectData) {
      const newSound = new Audio(
        `https://gbarrueto.github.io/infovis-assets/snd/${objectData.id}.wav`
      );
      newSound.loop = false;
      newSound.onended = () => {
        setPlayingSound(false);
        if (ambientSound) ambientSound.volume = ambientShouldSound ? 0.1 : 0;
      };
      setSound(newSound);
    }
  }, [objectData?.id]);

  useEffect(() => {
    let interval;
    if (playingSound && sound) {
      interval = setInterval(() => {
        const current = sound.currentTime;
        const duration = sound.duration || 1;
        const percent = (current / duration) * 100;
        setProgress(percent);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [playingSound, sound]);

  useEffect(() => {
    if (sound) {
      sound.onended = () => {
        setPlayingSound(false);
        setProgress(0);
        if (ambientSound) ambientSound.volume = ambientShouldSound ? 0.1 : 0;
      };
    }
  }, [sound]);

  function handleSoundButtonClick() {
    if (!playingSound && sound) {
      sound
        .play()
        .then(() => {
          if (ambientSound) ambientSound.volume = 0;
          setPlayingSound(true);
        })
        .catch((err) => {
          console.error("Error playing sound:", err);
        });
    } else if (sound) {
      sound.pause();
      setPlayingSound(false);
      if (ambientSound) ambientSound.volume = ambientShouldSound ? 0.1 : 0;
    }
  }

  // ✅ NUEVA FUNCIÓN para enviar valor al iframe
  function sendRandomToHardware() {
    if (!iframeRef?.current) {
      console.warn("Iframe no disponible.");
      return;
    }

    const randomValue = Math.floor(Math.random() * 3001) - 1500;

    iframeRef.current.contentWindow.postMessage(
      { type: "knob-move", value: randomValue },
      "*"
    );

    console.log(`Enviado al iframe: ${randomValue}`);
  }

  if (!shouldRender || !objectData) return null;

  const backgroundColor = objectData.color;
  const textColor = getContrastColor(backgroundColor);

  const modalStyle = {
    backgroundColor,
    color: textColor,
  };

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
          <div className="modal-header-container">
            <h3>{objectData.object}</h3>
            <button className="close-button" onClick={onClose}>×</button>
          </div>

          <div className="modal-image-container">
            <img
              src={`https://gbarrueto.github.io/infovis-assets/img/${objectData.id}.jpg`}
              alt={objectData.object}
              className={`modal-image ${rotateImage ? "rotate-image" : ""}`}
            />
            <div
              className="vertical-progress-line"
              style={{ left: `${progress}%` }}
            ></div>
          </div>

          <p className="modal-description">
            {objectData.description || "Descripción no disponible."}
          </p>

          <button onClick={handleSoundButtonClick}>
            {!playingSound ? <IoPlay /> : <IoPause />}
          </button>

          {/* ✅ Botón para enviar a la perilla */}
          <button onClick={sendRandomToHardware}>Mover</button>
        </>
      )}

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
