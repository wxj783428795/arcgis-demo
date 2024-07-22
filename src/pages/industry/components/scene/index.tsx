import SceneView from "@arcgis/core/views/SceneView";
import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import Basemap from "@arcgis/core/Basemap";
import WebTileLayerDemo from "../../../webTileLayer";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
const tk = "e3f3bfcc47fa497029d67a236c142af9";

const Scene = ({
  jzws,
  qys,
}: {
  jzws: __esri.FeatureSet;
  qys: __esri.FeatureSet;
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
    const view = new SceneView({
      map: myMap,
      container: ref.current!,
    });
    view.when(() => {
      const unionGeo = geometryEngine.union(
        jzws.features.map((i) => i.geometry)
      );
      view?.goTo(unionGeo, {});
    });
  }, []);

  return <div ref={ref} style={{ height: "500px", width: "600px" }}></div>;
};

export default Scene;
