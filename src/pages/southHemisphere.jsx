// src/pages/southHemisphere.jsx
import React, { useEffect } from "react";
import { useRoute } from "wouter";
import SkyChart from "../components/skyChart";


export default function SouthHemisphere() {
  const [match, params] = useRoute("/S/:fov");
  
  useEffect(() => {
    console.log(`south page fov: ${params ? params.fov : null}`);
  }, [])
  
  return <SkyChart hemisphere="S" />;
}
