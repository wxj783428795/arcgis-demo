import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

const MapViewDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const myMap = new Map({
      // basemap: "streets-vector", //底图，string｜BaseMap
      basemap: "satellite",
      // basemap: "topo",
      // layers:[] 图层
    });
    var view = new MapView({
      container: ref.current!,
      map: myMap,
      center: [0, 0], // 地图中心点
      zoom: 3, // 缩放级别
    });
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
};

export default MapViewDemo;
