import stylesheet from "styles/index.less";
import { api } from "../nredux.config";
import { connect } from "react-redux";
import Head from "next/head";
import { Row, Col, message } from "antd";
import { Navigator } from "components";
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    reducer: {
      component: state.component,
      interact: state.interact,
    },
  };
};
import actions from "../redux/actions";
const mapDispatchToProps = (dispatch) => ({
  action: {
    interact: (api, doc, item) =>
      dispatch(actions.interact.call(api, doc, item)),
    ...(api || []).reduce(
      (a, b) => ({
        ...a,
        [b]: createDispatcher({ dispatch, service: `${b}_request` }),
      }),
      {}
    ),
  },
});
function createDispatcher({ dispatch, service }) {
  return {
    get: (doc, item, id, props) =>
      dispatch(actions[service]("GET", doc, item, id, props)),
    list: (doc, item, id, props) =>
      dispatch(actions[service]("LIST", doc, item, id, props)),
    post: (doc, item, id, props) =>
      dispatch(actions[service]("POST", doc, item, id, props)),
    put: (doc, item, id, props) =>
      dispatch(actions[service]("PUT", doc, item, id, props)),
    delete: (doc, item, id, props) =>
      dispatch(actions[service]("DEL", doc, item, id, props)),
    clear: (doc, item, id, props) =>
      dispatch(actions[service]("CLEAR", doc, item, id, props)),
  };
}
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
  console.log(props.action.example.list());
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
                t: props.t,
              });
            })}
          </div>
        </Col>
        <Col xs={{ span: 0 }} sm={{ span: fullscreen ? 0 : 1 }} />
      </Row>
    </Navigator>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
