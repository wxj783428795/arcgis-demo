import SceneView from "@arcgis/core/views/SceneView.js";
import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";

const SceneViewDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const myMap = new Map({
      //   basemap: "streets-vector", //底图，string｜BaseMap
      basemap: "satellite",
      //   basemap: "topo",
      // layers:[] 图层
    });
    const view = new SceneView({
      map: myMap,
      container: ref.current!,
    });
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
};

export default SceneViewDemo;
