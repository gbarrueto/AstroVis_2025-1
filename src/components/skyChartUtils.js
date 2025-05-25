// skyChartUtils.js

import j1 from "./j1.json";
import j2 from "./j2.json";
import j3 from "./j3.json";
import j4 from "./j4.json";

export const fovFiles = {
  "< 0.7 deg": j1,
  ">= 0.7 AND < 1.5 deg": j2,
  ">= 1.5 AND < 3.5 deg": j3,
  ">= 3.5 AND < 7 deg": j4,
};

const fovMultipliers = {
  "< 0.7 deg": 1,
  ">= 0.7 AND < 1.5 deg": 3,
  ">= 1.5 AND < 3.5 deg": 6,
  ">= 3.5 AND < 7 deg": 10,
};

export const fovColors = {
  "< 0.7 deg": "#1f78b4",
  ">= 0.7 AND < 1.5 deg": "#33a02c",
  ">= 1.5 AND < 3.5 deg": "#ff7f00",
  ">= 3.5 AND < 7 deg": "#ff6ec7",
};

// DEPRECATED
//export const raToDegrees = (raStr) => {
//  if (!raStr) return 0;
//  const [h, m = 0, s = 0] = raStr.split(" ").map(parseFloat);
//  return 15 * (h + m / 60 + s / 3600);
//};

// export const decToDegrees = (decStr) => {
//  if (!decStr) return 0;
//  const cleaned = decStr.trim();
//  const signFactor = cleaned.startsWith("-") ? -1 : 1;
//  const [d, m = 0, s = 0] = cleaned.replace(/[+-]/, "").split(" ").map(parseFloat);
//  return signFactor * (Math.abs(d) + m / 60 + s / 3600);
//};

export const cargar = async () => {
  const listasNorte = {};
  const listasSur = {};

  for (const [fovLabel, datos] of Object.entries(fovFiles)) {
    const objetosNorte = [];
    const objetosSur = [];

    datos.forEach((obj) => {
      const [raStr, decStr] = obj.coords;
      const theta = parseFloat(raStr);
      const dec = parseFloat(decStr);
      const r = obj.hemisphere === "N" ? 90 - dec : 90 + dec;

      const transformed = {
        object: obj.repr_name,
        theta,
        r,
        frecuencia: obj.frequency,
        fovCategory: fovLabel,
        color: fovColors[fovLabel],
        id: obj.id,
        description: obj.description,
      };

      if (obj.hemisphere === "N") objetosNorte.push(transformed);
      else objetosSur.push(transformed);
    });

    listasNorte[fovLabel] = objetosNorte;
    listasSur[fovLabel] = objetosSur;
  }

  return { norte: listasNorte, sur: listasSur };
};

export const obtenerTopPorFOV = (listasPorFov) => {
  const topPorFov = {};

  for (const [fovKey, objetos] of Object.entries(listasPorFov)) {
    // Ordenar por frecuencia descendente
    const ordenados = objetos.sort((a, b) => b.frecuencia - a.frecuencia);

    // Mantener solo los primeros 5 con nombres únicos
    const vistos = new Set();
    const topUnicos = [];

    for (const obj of ordenados) {
      if (!vistos.has(obj.object)) {
        vistos.add(obj.object);
        topUnicos.push(obj);
      }
      if (topUnicos.length === 5) break;
    }

    topPorFov[fovKey] = topUnicos;
  }

  return topPorFov;
};

// :(
export const procesar = (
  selectedObject,
  hoveredTableObject,
  data,
  topDestacados
) => {
  const topIds = new Set(topDestacados.map((t) => t.id)); // usar id en lugar de nombre

  return {
    type: "scatterpolar",
    mode: "markers+text",
    r: data.map((d) => d.r),
    theta: data.map((d) => d.theta),
    marker: {
      size: data.map((d) => {
        const scaled = Math.pow(d.frecuencia, 1.2) * 100;
        const minSize = 10;
        const multiplier = fovMultipliers[d.fovCategory] || 1;

        return Math.max(minSize, minSize + (scaled - minSize) * multiplier);
      }),

      sizemode: "area",
      color: data.map((d) =>
        d.id === hoveredTableObject?.id
          ? "yellow"
          : d.id === selectedObject?.id
          ? "aqua"
          : d.color
      ),
      opacity: 0.8,
      line: {
        width: 0,
        color: data.map((d) => d.color),
      },
    },
    text: data.map((d) => d.object),
    textfont: {
      color: data.map((d) => (topIds.has(d.id) ? d.color : "rgba(0,0,0,0)")),
      size: 10,
    },
    textposition: "top center",
    hoverinfo: "text",
    customdata: data,
  };
};

export const layout = {
  paper_bgcolor: "#00000000",
  polar: {
    bgcolor: "#1a1a2e",
    radialaxis: {
      visible: false,
      range: [0, 100],
    },
    angularaxis: {
      direction: "clockwise",
      rotation: 90,
      tickvals: [0, 90, 180, 270],
      ticktext: ["0h", "6h", "12h", "18h"],
      tickfont: { color: "yellow" },
      showline: true,
      gridcolor: "#888888",
      gridwidth: 0,
    },
  },
  showlegend: false,
  margin: { l: 25, r: 25, t: 25, b: 25 },
};

export const estrellaPolarTrace = {
  type: "scatterpolar",
  mode: "markers+text",
  r: [0],
  theta: [0],
  marker: {
    color: "#ffffff",
    size: 10,
    line: {
      color: "#ffd700",
      width: 2,
    },
    symbol: "star",
  },
  text: ["Estrella Polar"],
  textposition: "bottom center",
  textfont: {
    size: 12,
    color: "#ffd700",
  },
  hoverinfo: "text",
  selected: {
    marker: {
      opacity: 0.5,
    },
  },
  hoveron: false,
};

export const cruzPolarTrace = {
  type: "scatterpolar",
  mode: "markers+text",
  r: [0],
  theta: [0],
  marker: {
    color: "#ffffff",
    size: 10,
    line: {
      color: "#ffd700",
      width: 2,
    },
    symbol: "star",
  },
  text: ["Cruz del Sur"],
  textposition: "bottom center",
  textfont: {
    size: 12,
    color: "#ffd700",
  },
  hoverinfo: "text",
  hoveron: false,
  selected: {
    marker: {
      opacity: 0.5,
    },
  },
};
