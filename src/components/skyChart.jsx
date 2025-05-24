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
  cruzPolarTrace
} from "./skyChartUtils";
import { Context } from "../app.jsx";

const fovListEntries = {
  "07": "< 0.7 deg",
  15: ">= 0.7 AND < 1.5 deg",
  35: ">= 1.5 AND < 3.5 deg",
  70: ">= 3.5 AND < 7 deg",
};

const SkyChart = ({ hemisphere, fov }) => {
  // Acceder al contexto de los estados globales y del Modal
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
    objectsByHemisphereFov,
    setObjectsByHemisphereFov,
  } = useContext(Context);

  // Efecto para cargar los datos al montar el componente
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

  // Manejador del clic en los puntos del gráfico para mostrar el modal

  const handlePointClick = (event, dataList) => {
    const point = event.points[0];

    if (point.curveNumber > 0) {
      return;
    }

    const pointIndex = point.pointIndex;

    const allObjects = Object.values(dataList).flat();
    const pointData = allObjects[pointIndex];

    if (pointData) {
      setSelectedObject(pointData); // Establecer el objeto seleccionado
      setIsModalOpen(true); // Abrir el modal
    }
  };

  // Función para renderizar el gráfico dependiendo del hemisferio
  const renderChart = (listas, top, includePolar = true) => {
    const data = [
      procesar(Object.values(listas).flat(), Object.values(top).flat()),
    ];
    if (includePolar) {
      if (hemisphere === "N") data.push(estrellaPolarTrace);
      if (hemisphere === "S") data.push(cruzPolarTrace);
    }
    return (
      <Plot
        data={data}
        layout={layout}
        onClick={(e) => handlePointClick(e, listas)} // Control de clic en los puntos
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
          renderChart(
            listasPorFovNorth[fovListEntries[fov]],
            topPorFovNorth,
            true
          ) // Gráfico del hemisferio norte
        ) : (
          renderChart(listasPorFovSouth[fovListEntries[fov]], topPorFovSouth) // Gráfico del hemisferio sur
        )}
      </div>
      {/* Modal que se controla desde DataContext */}
    </div>
  );
};

export default SkyChart;
