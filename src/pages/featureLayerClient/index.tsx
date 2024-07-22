import React, { useEffect, useState } from "react";
import WebTileLayerDemo from "../webTileLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import * as ReactDOM from "react-dom/client";
import { Button } from "antd";
const FeatureLayerDemo = () => {
  const [mapView, setMapView] = useState<__esri.MapView>();
  useEffect(() => {
    if (mapView) {
      let features = [
        new Graphic({
          geometry: new Point({
            x: 120.55,
            y: 31.28,
          }),
          attributes: {
            ObjectID: 1,
            Name: "小李",
            Sex: "男",
          },
        }),
        new Graphic({
          geometry: new Point({
            x: 120.554,
            y: 31.25,
          }),
          attributes: {
            ObjectID: 2,
            Name: "小王",
            Sex: "女",
          },
        }),
      ];
      let layer = new FeatureLayer({
        source: features,
        objectIdField: "ObjectID",
        outFields: ["*"],
        fields: [
          {
            name: "ObjectID",
            alias: "ObjectID",
            type: "oid",
          },
          {
            name: "Name",
            alias: "Name",
            type: "string",
          },
          {
            name: "Sex",
            alias: "Sex",
            type: "string",
          },
        ],
        popupTemplate: {
          actions: [],
          title: "{Name}",
          // content: "性别：{Sex}",
          content: (ele: any) => {
            const div = document.createElement("div");
            ReactDOM.createRoot(div).render(
              <div>
                <Button type="primary">{ele.graphic.attributes.Sex}</Button>
              </div>
            );
            return div;
          },
        },
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

  return <WebTileLayerDemo setMapView={setMapView} />;
};

export default FeatureLayerDemo;
