import React, { useEffect, useRef, useState } from "react";
import WebTileLayerDemo from "../webTileLayer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import Legend from "@arcgis/core/widgets/Legend";
import * as ReactDOM from "react-dom/client";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import ZdPopup from "./components/zdPopup";
import './index.css';
const CyydDemo = () => {
  const [mapView, setMapView] = useState<__esri.MapView>();
  const highLights = useRef<__esri.Handle[]>(null);
  useEffect(() => {
    if (mapView) {
      const zdLayer = new GeoJSONLayer({
        title: "工业用地",
        id: "zd",
        url: "/industry/zd.geojson",
        outFields: ["*"],
        renderer: getRenderer("zd"),
        popupTemplate: {
          content: async (ele: any) => {
            //清除高亮
            highLights.current?.forEach((i) => i.remove());
            const div = document.createElement("div");
            const [jzws, qys] = await Promise.all([
              jzwLayer.queryFeatures({
                outFields: ["*"],
                geometry: ele.graphic.geometry,
                returnGeometry: true,
              }),
              qyLayer.queryFeatures({
                // where :"SZQZ = '凤凰镇'",
                outFields: ["*"],
                geometry: ele.graphic.geometry,
                returnGeometry: true,
              }),
            ]);
            const hl1 = highLight(mapView, "jzw", jzws.features);
            const hl2 = highLight(mapView, "qy", qys.features);
            //@ts-ignore
            highLights.current = [hl1, hl2];

            ReactDOM.createRoot(div).render(<ZdPopup jzws={jzws} qys={qys} />);
            return div;
          },
        },
      });
      const qyLayer = new GeoJSONLayer({
        title: "用地企业",
        id: "qy",
        url: "/industry/qy.geojson",
        outFields: ["*"],
        renderer: getRenderer("qy"),
        // featureReduction: {
        //   type: "cluster",
        // },
        visible: false,
      });
      const jzwLayer = new GeoJSONLayer({
        title: "建筑物",
        id: "jzw",
        url: "/industry/jzw.geojson",
        renderer: getRenderer("jzw"),
      });
      mapView.map.addMany([zdLayer, jzwLayer, qyLayer]);
      mapView.ui.remove("attribution");
      mapView.ui.remove("zoom");
      const layerList = new LayerList({
        view: mapView,
      });
      mapView.ui.add(layerList, {
        position: "top-left",
      });
      const legend = new Legend({
        view: mapView,
      });
      mapView.ui.add(legend, {
        position: "bottom-left",
      });
      mapView.when(() => {
        mapView.popup.actions?.removeAll();
        mapView.goTo(
          {
            center: [120.62, 31.85],
            zoom: 11,
          },
          {
            easing: "ease-in-out",
          }
        );
      });
    }
    reactiveUtils.watch(
      () => mapView?.popup.visible,
      (visible) => {
        if (!visible) {
          highLights.current?.forEach((i) => i.remove());
        }
      }
    );
  }, [mapView]);

  return <WebTileLayerDemo setMapView={setMapView} />;
};

const getRenderer = (id: string): __esri.Renderer | undefined => {
  switch (id) {
    case "zd":
      return new UniqueValueRenderer({
        field: "ZDYDQK",
        uniqueValueInfos: [
          {
            value: "自用",
            symbol: new SimpleFillSymbol({
              color: [255, 0, 0, 0.3],
              outline: {
                color: [255, 255, 255, 0.3],
                width: 0.5,
              },
            }),
          },
          {
            value: "部分出租",
            symbol: new SimpleFillSymbol({
              color: [0, 255, 0, 0.3],
              outline: {
                color: [255, 255, 255, 1],
                width: 0.5,
              },
            }),
          },
          {
            value: "全部出租",
            symbol: new SimpleFillSymbol({
              color: [0, 0, 255, 0.3],
              outline: {
                color: [255, 255, 255, 0.3],
                width: 0.5,
              },
            }),
          },
        ],
        defaultSymbol: new SimpleFillSymbol({
          color: [122, 122, 122, 0.4],
          outline: {
            color: [255, 255, 255, 1],
            width: 1,
          },
        }),
      });
    case "qy":
      // return new HeatmapRenderer({
      //     field: "OBJECTID",
      //     colorStops: [
      //       { ratio: 0, color: "rgba(255, 255, 255, 0)" },
      //       { ratio: 0.2, color: "rgba(255, 255, 255, 1)" },
      //       { ratio: 0.5, color: "rgba(255, 140, 0, 1)" },
      //       { ratio: 0.8, color: "rgba(255, 140, 0, 1)" },
      //       { ratio: 1, color: "rgba(255, 0, 0, 1)" }
      //     ],
      //     minDensity: 0,
      //     maxDensity: 500,
      //     radius: 8
      // })
      return new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          color: [120, 210, 147, 0.8],
          size: "8px", // pixels
          outline: {
            width: 0.2, // points
          },
        }),
      });
    case "jzw":
      return new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          color: [222, 210, 12, 0.65],
          outline: {
            color: [255, 255, 255, 1],
            width: 0,
          },
        }),
      });
  }
};

const highLight = (
  mapView: __esri.MapView,
  id: string,
  features: __esri.Graphic[]
) => {
  return (
    mapView.layerViews.find((i) => i.layer.id === id) as __esri.GeoJSONLayerView
  ).highlight(features);
};

export default CyydDemo;
