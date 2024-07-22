import React, { useEffect, useState } from "react";
import WebTileLayerDemo from "../webTileLayer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import Legend from "@arcgis/core/widgets/Legend";
const CyydDemo = () => {
  const [mapView, setMapView] = useState<__esri.MapView>();
  useEffect(() => {
    if (mapView) {
      const zdLayer = new GeoJSONLayer({
        title: "工业用地",
        id: "zd",
        url: "/industry/zd.geojson",
        outFields: ["*"],
        renderer: getRenderer("zd"),
      });
      const qyLayer = new GeoJSONLayer({
        title: "用地企业",
        id: "qy",
        url: "/industry/qy.geojson",
        outFields: ["*"],
        renderer: getRenderer("qy"),
        visible: false,
      });
      const jzwLayer = new GeoJSONLayer({
        title: "建筑物",
        id: "jzw",
        url: "/industry/jzw.geojson",
      });
      mapView.map.addMany([zdLayer, jzwLayer, qyLayer]);
      const layerList = new LayerList({
        view: mapView,
      });
      mapView.ui.remove("attribution");
      mapView.ui.remove("zoom");
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
  }, [mapView]);

  return <WebTileLayerDemo setMapView={setMapView} />;
};

const getRenderer = (id: string): __esri.Renderer => {
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
      return {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [255, 255, 255, 0.5],
          outline: {
            color: [255, 255, 255, 1],
            width: 1,
          },
        },
      };
    default:
      return {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [255, 255, 255, 0.5],
          outline: {
            color: [255, 255, 255, 1],
            width: 1,
          },
        },
      };
  }
};

export default CyydDemo;
