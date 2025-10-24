# 🌌 AstroVis 2025

**Visualización interactiva de objetos de espacio profundo más fotografiados por astrofotógrafos amateurs**

> 📍 **Proyecto migrado desde Glitch**

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.0.0-646CFF?logo=vite&logoColor=white)
![Plotly](https://img.shields.io/badge/Plotly-3.0.1-3F4F75?logo=plotly&logoColor=white)

---

## 📖 Descripción

**AstroVis** es una aplicación web interactiva que permite explorar y visualizar los objetos astronómicos de espacio profundo más fotografiados por astrofotógrafos amateurs de todo el mundo. La aplicación utiliza datos reales y presenta información categorizada por hemisferio (Norte/Sur) y campo de visión (FOV).

### ¿Qué objetos son los más populares entre los astrofotógrafos?

Con esta herramienta puedes descubrir qué nebulosas, galaxias y cúmulos estelares capturan más la atención de la comunidad de astrofotografía, filtrados por:
- **Hemisferio**: Norte o Sur
- **Campo de visión (FOV)**: 4 rangos diferentes (0.7°, 1.5°, 3.5°, 7°)

---

## ✨ Características Principales

- **Cartas Celestes Interactivas**: Visualización en tiempo real con Plotly.js
- **Tablas de Ranking**: Los objetos más fotografiados ordenados por popularidad
- **Doble Hemisferio**: Soporte completo para hemisferio Norte y Sur
- **Filtros por FOV**: 4 rangos de campo de visión diferentes
- **Sononificación de imágenes**: Representación sonora de datos astronómicos
- **Información Detallada**: Modal con datos específicos de cada objeto
- **Conexión Externa**: Sistema de iframe para integraciones mediante ProtObject

---

## 🛠️ Tecnologías Utilizadas

### Frontend Framework
- **React 18.2.0** - Biblioteca principal para la UI
- **Vite 4.0.0** - Build tool y dev server ultrarrápido
- **Wouter 2.11.0** - Router minimalista para navegación SPA

### Visualización de Datos
- **Plotly.js 3.0.1** - Gráficos interactivos y cartas celestes
- **React-Plotly.js 2.6.0** - Wrapper de React para Plotly

### UI/UX
- **React Spring 9.7.2** - Animaciones fluidas
- **React Icons 4.12.0** - Iconografía
- **React Helmet Async 1.3.0** - Gestión del SEO y meta tags

### Estructura de Datos
Los datos de objetos astronómicos están organizados en archivos JSON (`j1.json`, `j2.json`, `j3.json`, `j4.json`) correspondientes a diferentes rangos de FOV.

---

## 📁 Estructura del Proyecto

```
astroVis/
├── src/
│   ├── app.jsx                    # Componente principal y Context Provider
│   ├── index.jsx                  # Punto de entrada de React
│   ├── components/
│   │   ├── skyChart.jsx           # Carta celeste con Plotly
│   │   ├── skyChartUtils.js       # Utilidades para procesamiento de datos
│   │   ├── leftSidePanel.jsx      # Panel izquierdo con título y tabla
│   │   ├── rightSidePanel.jsx     # Panel derecho con controles
│   │   ├── fovTable.jsx           # Tabla de objetos más fotografiados
│   │   ├── hemisphereToggler.jsx  # Selector de hemisferio
│   │   ├── toolsBar.jsx           # Barra de herramientas
│   │   ├── modal.jsx              # Modal de información de objetos
│   │   ├── modalInfo.jsx          # Modal de información general
│   │   ├── modalConnect.jsx       # Modal de conexión externa
│   │   ├── IframeManager.jsx      # Gestor de iframes
│   │   ├── router.jsx             # Configuración de rutas
│   │   ├── seo.jsx                # Configuración SEO
│   │   └── j1-4.json              # Datos astronómicos por FOV
│   ├── pages/
│   │   ├── northHemisphere.jsx    # Página hemisferio norte
│   │   └── southHemisphere.jsx    # Página hemisferio sur
│   ├── hooks/
│   │   ├── wiggle.jsx             # Hook para animación wiggle
│   │   └── prefers-reduced-motion.jsx
│   └── styles/                    # Archivos CSS modulares
├── public/
│   ├── config.js
│   └── index.html
├── build/                         # Archivos de producción
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Instalación y Uso

### Prerrequisitos
- **Node.js** 14.x o superior
- **npm** o **yarn**

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/gbarrueto/AstroVis_2025-1.git
cd AstroVis_2025-1
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo con Vite
- `npm run build` - Genera la build de producción
- `npm run serve` - Previsualiza la build de producción

---

## 🎯 Uso de la Aplicación

1. **Selecciona el Hemisferio**: Norte o Sur mediante el toggle en el panel derecho
2. **Elige el Campo de Visión (FOV)**: 4 rangos disponibles
3. **Explora la Carta Celeste**: Interactúa con el gráfico de Plotly
4. **Consulta la Tabla**: Objetos más fotografiados ordenados por popularidad
5. **Hover sobre objetos**: Resalta el objeto tanto en la tabla como en la carta
6. **Click en objetos**: Abre modal con información detallada
7. **Reproduce Sonidos**: Reproduce la sononificación de tu objeto seleccionado dando play.
8. **Conexión Externa (Extra)**: Usa el modal de conexión para conectar servos mediante Arduino y un dispositivo movil.

---

## 🌐 Navegación y Rutas

La aplicación utiliza navegación dinámica basada en parámetros:

```
/:hemisphere/:fov
```

Ejemplos:
- `/N/07` - Hemisferio Norte, FOV < 0.7°
- `/S/35` - Hemisferio Sur, FOV 1.5° - 3.5°

---

## 🎨 Características de Diseño

- **Panel Izquierdo**: Título del proyecto y tabla de objetos
- **Panel Central**: Carta celeste interactiva con Plotly
- **Panel Derecho**: Controles de hemisferio y FOV
- **Modales**: Información detallada y conexión externa
- **Controles de Audio**: Mute/Unmute de música ambiente

---

## 📊 Datos Astronómicos

Los datos incluyen información sobre:
- Nebulosas (planetarias, de emisión, reflexión)
- Galaxias (espirales, elípticas, irregulares)
- Cúmulos estelares (abiertos y globulares)
- Coordenadas celestes (AR, Dec)
- Magnitudes aparentes
- Categorización por FOV

---

## 🔧 Configuración

El proyecto incluye archivos de configuración para:
- **Vite**: `vite.config.js` - Configuración del bundler
- **SEO**: `src/seo.json` - Meta tags y Open Graph
- **Watch**: `watch.json` - Configuración de file watching (legacy de Glitch)

---

## 📜 Licencia

Este proyecto está bajo la licencia especificada en el archivo `LICENSE`.

---

## 👨‍💻 Autores

[@gbarrueto](https://github.com/gbarrueto)
[@panchoclo3](https://github.com/panchoclo3)
[@MystEdu](https://github.com/MystEdu)

---

## 🙏 Agradecimientos

- Datos astronómicos a AstroBin y la comunidad de astrofotografía amateur
- Proyecto originalmente desarrollado y hospedado en **Glitch**
- Migrado a GitHub tras la discontinuación del servicio de hosting gratuito de Glitch

---

## 📝 Notas de Migración

Este proyecto fue originalmente desarrollado en la plataforma **Glitch**, que proporcionaba hosting gratuito para proyectos web. Tras la discontinuación de este servicio, el proyecto fue migrado a GitHub para preservar el código.
