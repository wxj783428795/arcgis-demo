import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
import WMTSLayer from "@arcgis/core/layers/WMTSLayer";
const tk = 'a3e540b069a7576e2130a915a69b1d37'
const WebTileLayerDemo = () => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const wmtsLayer = new WMTSLayer({
            url:`http://t0.tianditu.gov.cn/vec_c/wmts?tk=${tk}`
        })
      const myMap = new Map({
        basemap: new Basemap({
          baseLayers: [
            wmtsLayer
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
}

export default WebTileLayerDemo