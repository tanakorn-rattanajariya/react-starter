import React from "react";
import { Card } from "antd";
import stylesheet from "../styles/index.less";
export default function Home() {
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: stylesheet,
        }}
      />
      <Card title="wow">Test</Card>
    </div>
  );
}
