import React from 'react';
import 'antd/dist/antd.css';
import './NavList.css';
import InfiniteListExample from '../RequestList/RequestList';
import { Layout, Menu, Breadcrumb } from 'antd';
import RequestDetail from '../RequestDetail/RequestDetail';
import { render } from '@testing-library/react';
const { Header, Sider } = Layout;

const items1 = ['Sign-up Request','Done'].map((key) => ({
  key,
  label: `${key}`,
}));


const NavList= () => {
  return(
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
    </Header>
    <Layout>
      <Sider width="25%" className="site-layout-background">
        <InfiniteListExample/>
      </Sider>
      <RequestDetail/>
    </Layout>
  </Layout>)
}

export default NavList;