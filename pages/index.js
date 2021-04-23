import React from "react";
import { Card } from "antd";
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
  React.useEffect(() => {
    action.interact.postTest({ jskdkfds: "dsfsdf" });
  }, []);
  return <></>;
}
function MainComponent(props) {
  return <></>;
}