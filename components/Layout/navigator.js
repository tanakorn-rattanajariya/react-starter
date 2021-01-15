import {
  Layout,
  Menu,
  Row,
  Col,
  Typography,
  Avatar,
  Space,
  Divider,
  Button,
} from "antd";
const { SubMenu } = Menu;
const { Title } = Typography;
import Router from "next/router";
import { withRouter } from "next/router";
import { ApiFilled } from "@ant-design/icons";
import * as React from "react";
import getConfig from "next/config";
const { Content, Sider, Header } = Layout;
function WebLayout({ router, fullscreen, t, ...props }) {
  const path = router.pathname;
  const _on_click_menu = (e) => {
    Router.push(e.key);
  };
  React.useEffect(() => {
    if (router.asPath !== "/") {
      Router.push(router.asPath);
    }
  }, []);
  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <Menu
          onClick={_on_click_menu}
          mode="horizontal"
          defaultSelectedKeys={[path]}
        >
          <Menu.Item key="/dashboard">Home</Menu.Item>
        </Menu>
      </Header>
      <Layout
        style={{
          height: "100vh",
          backgroundColor: "rgba(var(--b3f,250,250,250),1)",
        }}
      >
        <Content>
          <Row
            gutter={8}
            style={{
              backgroundColor: "rgba(var(--b3f,250,250,250),1)",
            }}
          >
            <Col xs={{ span: 0 }} sm={{ span: 0 }} />
            <Col
              style={{
                padding: fullscreen ? "0" : "8px 4px",
              }}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
            >
              {props.children}
            </Col>
            <Col xs={{ span: 0 }} sm={{ span: 0 }} />
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
export default withRouter(WebLayout);
