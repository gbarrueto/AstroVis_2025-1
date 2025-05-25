// src/pages/southHemisphere.jsx
import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import SkyChart from "../components/skyChart";


export default function SouthHemisphere() {
  const [match, params] = useRoute("/S/:fov");
  const [fovSelected, setFovSelected] = useState("");
  
  useEffect(() => {
    if (params) {
      setFovSelected(params.fov);
    }
    
  }, [params])
  
  return <SkyChart hemisphere="S" fov={fovSelected} />;
}
