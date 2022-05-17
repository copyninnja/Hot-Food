import React, { useState } from "react";
import "antd/dist/antd.css";
import "./NavList.css";
import InfiniteListExample from "../RequestList/RequestList";
import { Layout, Menu } from "antd";
import RequestDetail from "../RequestDetail/RequestDetail";
//import { render } from "@testing-library/react";
import { useAuth } from "../../context/useAuth";
const { Header, Sider } = Layout;
const items1 = ["Sign-up Request", "Done", "Sign Out"].map((key) => ({
  key,
  label: `${key}`,
}));

const NavList = () => {
  const auth = useAuth();

  const [selectItem, setselectItem] = useState(1);
  const [Id, setId] = useState("");
  //set click event for menu item:
  const onclick = (e) => {
    //console.log('click',e)
    if (e.key === "Sign-up Request") {
      //console.log("1")
      setselectItem(1);
    } else if (e.key === "Done") {
      //console.log("2")
      setselectItem(2);
    } else if (e.key === "Sign Out") {
      //console.log("!!!!!!!!!!!!");
      auth.signOut();
      window.history.back();
    }
  };

  const setSelectListItem = (data) => {
    console.log("setSelectListItem", data);
    setId(data);
    console.log("setid", Id);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items1}
          key={items1}
          onClick={onclick}
        />
      </Header>
      <Layout>
        <Sider width="25%" className="site-layout-background">
          <InfiniteListExample
            select={selectItem}
            setSelectListItem={setSelectListItem}
          />
        </Sider>
        {Id ? <RequestDetail ID={Id} /> : <></>}
      </Layout>
    </Layout>
  );
};

export default NavList;
