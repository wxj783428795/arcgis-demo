import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer";

const TileLayerDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const myMap = new Map({
      basemap: new Basemap({
        baseLayers: [
          new TileLayer({
            url: "https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer",
          }),
        ],
      }),
    });
    const view = new MapView({
      container: ref.current!,
      map: myMap,
      center: [0, 0], // 地图中心点
      zoom: 3, // 缩放级别
    });
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
};

export default TileLayerDemo;
