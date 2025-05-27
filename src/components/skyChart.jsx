// SkyChart.jsx
import React, { useEffect, useContext } from "react";
import Plot from "react-plotly.js";
import Modal from "./modal";
import {
  cargar,
  obtenerTopPorFOV,
  procesar,
  layout,
  estrellaPolarTrace,
  cruzPolarTrace,
  getFocusBoxShape,
} from "./skyChartUtils";
import { Context } from "../app.jsx";

const fovListEntries = {
  "07": "< 0.7 deg",
  15: ">= 0.7 AND < 1.5 deg",
  35: ">= 1.5 AND < 3.5 deg",
  70: ">= 3.5 AND < 7 deg",
};

const SkyChart = ({ hemisphere, fov }) => {
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
    setIsModalOpen,
    selectedObject,
    setSelectedObject,
    objectsByHemisphereFov,
    setObjectsByHemisphereFov,
    hoveredTableObject,
  } = useContext(Context);

  useEffect(() => {
    const graficar = async () => {
      try {
        const { norte, sur } = await cargar();
        setTopPorFovNorth(obtenerTopPorFOV(norte));
        setTopPorFovSouth(obtenerTopPorFOV(sur));
        setListasPorFovNorth(norte);
        setListasPorFovSouth(sur);
      } catch (err) {
        console.error("Error al graficar:", err);
      } finally {
        setLoading(false);
      }
    };

    graficar();
  }, [
    setLoading,
    setTopPorFovNorth,
    setTopPorFovSouth,
    setListasPorFovNorth,
    setListasPorFovSouth,
  ]);

  const handlePointClick = (event) => {
    if (!event.points || event.points.length === 0) return;

    const point = event.points[0];
    if (point.curveNumber > 0) return;

    const pointData = point.customdata;

    if (pointData) {
      setSelectedObject(pointData);
      setIsModalOpen(true);
    }
  };

  const renderChart = (listas, top, includePolar = true) => {
    const flatList = Object.values(listas).flat();
    const flatTop = Object.values(top).flat();

    const data = [
      procesar(selectedObject, hoveredTableObject, flatList, flatTop),
    ];

    if (includePolar) {
      if (hemisphere === "N") data.push(estrellaPolarTrace);
      if (hemisphere === "S") data.push(...cruzPolarTrace);
    }

    const focusShape = getFocusBoxShape(hoveredTableObject);
    const layoutWithFocus = {
      ...layout,
      shapes: focusShape ? [focusShape] : [],
    };

    return (
      <Plot
        data={data}
        layout={layoutWithFocus}
        onClick={(e) => handlePointClick(e, listas)}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    );
  };

  return (
    <div className="wrapper">
      <div className="skyChart">
        {loading || !fov ? (
          <p>Loading...</p>
        ) : hemisphere === "N" ? (
          renderChart(listasPorFovNorth[fovListEntries[fov]], topPorFovNorth)
        ) : (
          renderChart(listasPorFovSouth[fovListEntries[fov]], topPorFovSouth)
        )}
      </div>
    </div>
  );
};

export default SkyChart;
