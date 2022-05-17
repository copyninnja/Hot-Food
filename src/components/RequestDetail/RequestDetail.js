import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import Contentcard from "../ContentCard/ContentCard";
import FoodRequest from "../FoodRequest/FoodRequest";
const { Content } = Layout;
const RequestDetail = (props) => {
  return (
    <Layout
      style={{
        padding: "0 24px 24px",
      }}
    >
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Sign up request</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>Detail</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Contentcard contentId={props.ID} />
      </Content>
    </Layout>
  );
};
export default RequestDetail;
