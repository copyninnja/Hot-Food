import React from "react";
import "antd/dist/antd.css";
import "./NavList.css";
import InfiniteListExample from "../RequestList/RequestList";
import { Layout, Menu, Breadcrumb } from "antd";
import RequestDetail from "../RequestDetail/RequestDetail";
import { render } from "@testing-library/react";
import { auto } from "@popperjs/core";
const { Header, Sider } = Layout;

const items1 = [
  "All",
  "Sign-up Request",
  "Product Change Request",
  "Profile Change Request",
  "Done",
].map((key) => ({
  key,
  label: `${key}`,
}));

const MobileNav = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" items={items1} />
      </Header>
      <Layout>
        <Sider width="100%" className="site-layout-background">
          <InfiniteListExample />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default MobileNav;
