import { useState, useContext, useEffect } from "react";
import { Link } from "wouter";
import "../styles/toolsBarStyle.css";
import { BsFillQuestionCircleFill, BsPlugFill } from "react-icons/bs";
import { Context } from "../app.jsx";

const fovColors = {
  "07": "#1f78b4",
  15: "#33a02c",
  35: "#ff7f00",
  70: "#ff6ec7",
};

export default function ToolsBar({
  hemisphereSelected,
  onHemisphereSelected,
  fovSelected,
  onFovSelected,
  setHoveredFov,
}) {
  const {
    displayModalInfo,
    setDisplayModalInfo,
    displayModalConnect,
    setDisplayModalConnect,
  } = useContext(Context);

  const [infoAnimation, setInfoAnimation] = useState("");
  const [connectAnimation, setConnectAnimation] = useState("");

  useEffect(() => {
    const infoTimeout = setTimeout(() => {
      setInfoAnimation("noAnimation");
    }, 10000);

    return () => clearTimeout(infoTimeout);
  }, []);

  useEffect(() => {
    const connectTimeout = setTimeout(() => {
      setConnectAnimation("noAnimation");
    }, 10000);

    return () => clearTimeout(connectTimeout);
  }, []);

  function handleMouseEnter(fov) {
    setHoveredFov?.(fov);
  }

  function handleMouseLeave() {
    setHoveredFov?.(null);
  }

  function onMoreInfoClick() {
    setInfoAnimation("noAnimation");
    setDisplayModalInfo("showModalInfo");
  }

  function onClickConnect() {
    setConnectAnimation("noAnimation");
    setDisplayModalConnect("showModalConnect");
  }

  return (
    <section className="toolsBarContainer">
      {/* Botón de información */}
      <div className={`moreInfoButtonContainer ${infoAnimation}`}>
        <BsFillQuestionCircleFill onClick={onMoreInfoClick} />
      </div>

      {/* Botón de conectar */}
      <div className={`connectButtonContainer ${connectAnimation}`}>
        <BsPlugFill onClick={onClickConnect} />
      </div>

      <section className="hemisphereSelectorContainer">
        <Link
          to={`/N/${fovSelected || "07"}`}
          className={`hemisphereSelector ${
            hemisphereSelected === "N" ? "activeSelector" : ""
          }`}
          onClick={() => onHemisphereSelected("N")}
        >
          Hemisferio Norte
        </Link>
        <Link
          to={`/S/${fovSelected || "07"}`}
          className={`hemisphereSelector ${
            hemisphereSelected === "S" ? "activeSelector" : ""
          }`}
          onClick={() => onHemisphereSelected("S")}
        >
          Hemisferio Sur
        </Link>
      </section>

      <section className="fovSelectorContainer">
        {["07", "15", "35", "70"].map((fov) => (
          <Link
            key={fov}
            to={`/${hemisphereSelected}/${fov}`}
            className={`fovSelector ${
              fovSelected === fov ? "activeFovSelector" : ""
            }`}
            onClick={() => onFovSelected(fov)}
            onMouseEnter={() => handleMouseEnter(fov)}
            onMouseLeave={handleMouseLeave}
            style={
              fovSelected === fov ? { backgroundColor: fovColors[fov] } : {}
            }
          >
            {fov === "07"
              ? "0.7°"
              : fov === "15"
              ? "1.5°"
              : fov === "35"
              ? "3.5°"
              : "7°"}
          </Link>
        ))}
      </section>
    </section>
  );
}
