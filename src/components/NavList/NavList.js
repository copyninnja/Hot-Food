import React,{useState} from 'react';
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
  const [selectItem, setselectItem] = useState(1)
  //set click event for menu item:
  const onclick = (e) =>{
    //console.log('click',e)
    if(e.key === 'Sign-up Request'){
      //console.log("1")
      setselectItem(1)
    }else if(e.key === 'Done'){
      //console.log("2")
      setselectItem(2)
    }
  }
  return(
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal"   defaultSelectedKeys={['1']} items={items1} key={items1} onClick={onclick} />
    </Header>
    <Layout>
      <Sider width="25%" className="site-layout-background">
        <InfiniteListExample select={selectItem}/>
      </Sider>
      <RequestDetail/>
    </Layout>
  </Layout>)
}

export default NavList;