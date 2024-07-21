import Basemap from "@arcgis/core/Basemap";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import Map from "@arcgis/core/Map";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D.js";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D.js";
import SceneView from "@arcgis/core/views/SceneView";
import { useEffect, useRef } from "react";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import LabelClass from "@arcgis/core/layers/support/LabelClass.js";
import LabelSymbol3D from "@arcgis/core/symbols/LabelSymbol3D.js";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer.js";

const tk = "e3f3bfcc47fa497029d67a236c142af9";

const ChinaDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const layerRef = useRef<__esri.GeoJSONLayer>(null);
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
    const geojsonlayer = addDistrictLayer("100000", view);
    layerRef.current = geojsonlayer;
    //@ts-ignore
    window.myMap = myMap;
    view.on("click", function (event) {
      console.log("event", event);
      layerRef.current
        ?.queryFeatures({
          geometry: event.mapPoint,
          outFields: ["*"],
        })
        .then((result) => {
          if (result.features.length) {
            myMap.remove(layerRef.current!);
            const geojsonlayer = addDistrictLayer(
              result.features[0].attributes.adcode,
              view
            );
            layerRef.current = geojsonlayer;
          }
        });
    });
  }, []);
  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
};

const fitExtent = (layer: __esri.GeoJSONLayer, view: __esri.SceneView) => {
  layer.queryExtent().then((res) => {
    view.goTo(res.extent, {
      easing: "in-out-cubic",
    });
  });
};

const addDistrictLayer = (
  adcode: string,
  view: __esri.SceneView
): __esri.GeoJSONLayer => {
  let geojsonlayer = new GeoJSONLayer({
    url: `/geojson/${adcode}.json`,
    id: adcode,
    renderer: new SimpleRenderer({
      symbol: new PolygonSymbol3D({
        symbolLayers: [
          {
            type: "extrude", // autocasts as new ExtrudeSymbol3DLayer()
            size: 100000, // 100,000 meters in height
            material: { color: [255, 50, 50, 0.8] },
            edges: new SolidEdges3D({
              color: [50, 50, 50, 0.5],
            }),
          },
        ],
      }),
    }),
    labelsVisible: true,
    labelingInfo: [
      new LabelClass({
        labelExpressionInfo: {
          expression: "$feature.name",
        },
        symbol: new LabelSymbol3D({
          symbolLayers: [
            new TextSymbol3DLayer({
              material: { color: [0, 0, 0] },
              size: 12, // Defined in points
            }),
          ],
        }),
      }),
    ],
  });
  view.map.add(geojsonlayer);
  fitExtent(geojsonlayer, view);
  changeRenderer(geojsonlayer);
  return geojsonlayer;
};

const changeRenderer = async (layer: __esri.GeoJSONLayer) => {
  const res = await layer.queryFeatures();
  const renderer = new UniqueValueRenderer({
    defaultSymbol: new PolygonSymbol3D({
      symbolLayers: [
        {
          type: "extrude", // autocasts as new ExtrudeSymbol3DLayer()
          size: 10000, // 100,000 meters in height
          material: { color: [255, 50, 50, 0.8] },
          edges: new SolidEdges3D({
            color: [50, 50, 50, 0.5],
          }),
        },
      ],
    }),
    field: "childrenNum",
    uniqueValueInfos: res.features.map((i) => {
      return {
        field: "childrenNum",
        value: i.attributes.childrenNum,
        symbol: new PolygonSymbol3D({
          symbolLayers: [
            {
              type: "extrude", // autocasts as new ExtrudeSymbol3DLayer()
              size: 10000 + 10000 * i.attributes.childrenNum, // 100,000 meters in height
              material: {
                color: [255, 50, 50, 0.2 + 0.05 * i.attributes.childrenNum],
              },
              edges: new SolidEdges3D({
                color: [50, 50, 50, 0.5],
              }),
            },
          ],
        }),
      };
    }),
  });
  layer.renderer = renderer;
};
export default ChinaDemo;
