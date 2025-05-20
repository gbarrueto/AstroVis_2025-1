// src/pages/northHemisphere.jsx
import React, { useEffect } from "react";
import { useRoute } from "wouter";
import SkyChart from "../components/skyChart";


export default function NorthHemisphere() {
  const [match, params] = useRoute("/N/:fov");
  
  useEffect(() => {
    console.log(`north page fov: ${params ? params.fov : null}`);
  }, [])
  
  return <SkyChart hemisphere="N" />;
}
