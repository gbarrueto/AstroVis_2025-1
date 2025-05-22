// src/pages/northHemisphere.jsx
import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import SkyChart from "../components/skyChart";


export default function NorthHemisphere() {
  const [match, params] = useRoute("/N/:fov");
  const [fovSelected, setFovSelected] = useState("");
  
  useEffect(() => {
    if (params) {
      setFovSelected(params.fov);
      console.log(`north page fov: ${params.fov}`);
    }
    else {
      console.log(`north page fov: ${null}`);
    }
    
  }, [params])
  
  return <SkyChart hemisphere="N" fov={fovSelected} />;
}
