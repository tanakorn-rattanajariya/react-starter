import React from "react";
import { Card } from "antd";
import stylesheet from "../styles/index.less";
import Main from "./Main";
export default function Home() {
  return (
    <Main>
      <Card title="wow">Test</Card>
      <ComponentDidMount />
      <MainComponent />
    </Main>
  );
}

function ComponentDidMount(props){
  const { action } = props;
  return <></>;
}
function MainComponent(props) {
  return <></>;
}