import { Table, Tabs } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useMemo } from "react";
import Scene from "../scene";

const ZdPopup = ({
  jzws,
  qys,
}: {
  jzws: __esri.FeatureSet;
  qys: __esri.FeatureSet;
}) => {
  const jzwColumns = useMemo<ColumnsType>(
    () => [
      {
        dataIndex: "YT",
        title: "用途",
      },
      {
        dataIndex: "FLOOR",
        title: "层数",
      },
    ],
    []
  );
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="建筑物" key="jzw">
          <Table
            dataSource={jzws.features.map((i) => i.attributes)}
            columns={jzwColumns}
          ></Table>
        </Tabs.TabPane>
        <Tabs.TabPane tab="地图" key="map">
          <Scene jzws={jzws} qys={qys} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default ZdPopup;
