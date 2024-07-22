import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer";

const TileLayerDemo = ({
  setMapView,
}: {
  setMapView?: Dispatch<SetStateAction<__esri.MapView | undefined>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const myMap = new Map({
      basemap: new Basemap({
        baseLayers: [
          new TileLayer({
            url: "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer",
          }),
        ],
      }),
    });
    const view = new MapView({
      container: ref.current!,
      map: myMap,
      center: [120, 31], // 地图中心点
      zoom: 3, // 缩放级别
    });
    setMapView?.(view);
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
};

export default TileLayerDemo;
