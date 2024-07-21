import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
const tk = "e3f3bfcc47fa497029d67a236c142af9";
const WebTileLayerDemo = ({
  setMapView,
}: {
  setMapView?: Dispatch<SetStateAction<__esri.MapView | undefined>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    //底图图层
    const wmtsLayerBase = new WebTileLayer({
      urlTemplate: `http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=${tk}`,
      subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
    });
    //标注图层
    const wmtsLayerCav = new WebTileLayer({
      urlTemplate: `http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=${tk}`,
      subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
    });
    const myMap = new Map({
      basemap: new Basemap({
        baseLayers: [wmtsLayerBase],
        referenceLayers: [wmtsLayerCav],
      }),
    });
    const view = new MapView({
      container: ref.current!,
      map: myMap,
      center: [120.55, 31.28], // 地图中心点
      zoom: 3, // 缩放级别
    });
    setMapView?.(view);
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
};

export default WebTileLayerDemo;
