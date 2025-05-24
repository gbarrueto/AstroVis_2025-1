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

const handlePointClick = (event) => {
  // Verificar que haya puntos en el evento
  if (!event.points || event.points.length === 0) return;

  const point = event.points[0];

  if (point.curveNumber > 0) return;

  // Obtener el objeto completo desde customdata
  const pointData = point.customdata;
  console.log(pointData)

  if (pointData) {
    setSelectedObject(pointData); // Actualizar objeto seleccionado
    setIsModalOpen(true); // Abrir modal
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
