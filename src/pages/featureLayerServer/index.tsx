import React, { useEffect, useState } from "react";
import TileLayerDemo from "../tileLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const FeatureLayerDemo = () => {
  const [mapView, setMapView] = useState<__esri.MapView>();
  useEffect(() => {
    if (mapView) {
      const featureLayer = new FeatureLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/NapervilleShelters/FeatureServer/0",
        popupTemplate: {
          content: "{facname}",
          title: "popup",
        },
      });
      mapView.map.add(featureLayer);
      mapView.when(() => {
        mapView.goTo(
          {
            center: [-88.2243299999999, 41.726920000000064],
            zoom: 12,
          },
          {
            easing: "ease-in-out",
          }
        );
      });
    }
    // return () => {
    //   mapView?.destroy();
    // };
  }, [mapView]);

  return <TileLayerDemo setMapView={setMapView} />;
};

export default FeatureLayerDemo;
