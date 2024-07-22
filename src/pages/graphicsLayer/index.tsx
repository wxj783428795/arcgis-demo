import React, { useEffect, useState } from "react";
import WebTileLayerDemo from "../webTileLayer";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

const GraphicsLayerDemo = () => {
  const [mapView, setMapView] = useState<__esri.MapView>();
  useEffect(() => {
    if (mapView) {
      let features = [
        new Graphic({
          geometry: new Point({
            x: 120.55,
            y: 31.18,
          }),
          attributes: {
            Name: "小李",
            Sex: "男",
          },
          popupTemplate: {
            title: "{Name}",
            content: "性别：{Sex}",
          },
        }),
        new Graphic({
          geometry: new Polyline({
            paths: [
              [
                [120.55, 31.28],
                [120.45, 31.18],
                [120.49, 31.32],
              ],
            ],
          }),
          attributes: {
            Name: "线",
            Note: " 随便什么线",
          },
          popupTemplate: {
            title: "{Name}",
            content: "{Note}",
          },
        }),
        new Graphic({
          geometry: new Polygon({
            rings: [
              [
                [120.55, 31.28],
                [120.65, 31.28],
                [120.65, 31.38],
                [120.55, 31.38],
              ],
            ],
          }),
          attributes: {
            Name: "面",
            Note: "正方形",
            Note2: "哈哈哈",
          },
          popupTemplate: {
            title: "{Name}",
            content: "{Note},{Note2}",
          },
        }),
      ];
      let layer = new GraphicsLayer({
        graphics: features,
        opacity: 0.3,
      });
      mapView.map.add(layer);
      mapView.when(() => {
        mapView.goTo(
          {
            center: [120.55, 31.28],
            zoom: 12,
          },
          {
            easing: "ease-in-out",
          }
        );
      });
    }
  }, [mapView]);
  return <WebTileLayerDemo setMapView={(v) => setMapView(v)} />;
};

export default GraphicsLayerDemo;
