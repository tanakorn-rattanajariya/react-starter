import stylesheet from "styles/index.less";
import { api, classes } from "../nredux.config";
import { useNReduxDispatcher,useNReduxMapping } from "../nredux";
import { connect } from "react-redux";
import Head from "next/head";
import { Row, Col, message } from "antd";

import { Navigator } from "components";
function errorMessage(error) {
  message.error(error);
}
function successMessage() {
  message.success("success");
}

function Main(props) {
  const { fullscreen, loadMap, noLayout } = props;
  const { error, success } = props.reducer.component;
  React.useEffect(() => {
    if (error) {
      errorMessage(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (success) {
      successMessage();
    }
  }, [success]);
  return (
    <Navigator fullscreen={fullscreen} noLayout={noLayout}>
      <Head>
        <title>React Starter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="Description" content="Amazon Deepmap" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossOrigin="anonymous"
        />
      </Head>
      <style
        dangerouslySetInnerHTML={{
          __html: stylesheet,
        }}
      />
      <Row gutter={8}>
        <Col xs={{ span: 0 }} sm={{ span: fullscreen ? 0 : 1 }} />
        <Col xs={{ span: 24 }} sm={{ span: fullscreen ? 24 : 22 }}>
          <div style={{ padding: fullscreen ? 0 : 10 }}>
            {React.Children.map(props.children, (child) => {
              return React.cloneElement(child, {
                action: props.action,
                reducer: props.reducer,
              });
            })}
          </div>
        </Col>
        <Col xs={{ span: 0 }} sm={{ span: fullscreen ? 0 : 1 }} />
      </Row>
    </Navigator>
  );
}
export default connect(useNReduxMapping, useNReduxDispatcher)(Main);
