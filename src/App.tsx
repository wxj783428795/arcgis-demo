import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import "./App.css";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("基础概念", "1", <PieChartOutlined />, [
    getItem(<Link to={"/mapView"}>MapView</Link>, "MapView"),
    getItem(<Link to={"/sceneView"}>SceneView</Link>, "SceneView"),
  ]),
  getItem("图层", "2", <DesktopOutlined />, [
    getItem(<Link to={"/tileLayer"}>TileLayer</Link>, "TileLayer"),
    getItem(<Link to={"/webTileLayer"}>WebTileLayer</Link>, "WebTileLayer"),
    getItem("FeatureLayer", "FeatureLayer", "", [
      getItem(
        <Link to={"/featureLayer/server"}>FeatureLayer-Server</Link>,
        "FeatureLayerServer"
      ),
      getItem(
        <Link to={"/featureLayer/client"}>FeatureLayer-Client</Link>,
        "FeatureLayerClient"
      ),
    ]),
    getItem(<Link to={"/graphicsLayer"}>GraphicsLayer</Link>, "GraphicsLayer"),
  ]),
  getItem(<Link to={"/china"}>ChinaDemo</Link>, "china", <FileOutlined />),
  getItem(<Link to={"/industry"}>industry</Link>, "industry", <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              height: "calc(100% - 32px)",
              padding: 12,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
