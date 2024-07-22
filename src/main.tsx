import "@arcgis/core/assets/esri/themes/light/main.css";
import esriConfig from "@arcgis/core/config.js";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import MapViewDemo from "./pages/mapView/index.tsx";
import SceneView from "./pages/sceneView/index.tsx";
import TileLayer from "./pages/tileLayer/index.tsx";
import WebTileLayer from "./pages/webTileLayer/index.tsx";
import FeatureLayerServer from "./pages/featureLayerServer/index.tsx";
import FeatureLayerClient from "./pages/featureLayerClient/index.tsx";
import GraphicsLayer from "./pages/graphicsLayer";
import ChinaDemo from "./pages/china/index.tsx";
import IndustryDemo from "./pages/industry/index.tsx";

esriConfig.assetsPath = "/assets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "mapView",
        element: <MapViewDemo />,
      },
      {
        path: "sceneView",
        element: <SceneView />,
      },
      {
        path: "tileLayer",
        element: <TileLayer />,
      },
      {
        path: "WebTileLayer",
        element: <WebTileLayer />,
      },
      {
        path: "featureLayer/server",
        element: <FeatureLayerServer />,
      },
      {
        path: "featureLayer/client",
        element: <FeatureLayerClient />,
      },
      {
        path: "graphicsLayer",
        element: <GraphicsLayer />,
      },
      {
        path: "china",
        element: <ChinaDemo />,
      },
      {
        path: "industry",
        element: <IndustryDemo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
