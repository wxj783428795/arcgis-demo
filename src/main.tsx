import "@arcgis/core/assets/esri/themes/dark/main.css";
import esriConfig from "@arcgis/core/config.js";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import MapViewDemo from "./pages/mapView/index.tsx";
import SceneView from "./pages/sceneView/index.tsx";
esriConfig.assetsPath = "./assets";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
