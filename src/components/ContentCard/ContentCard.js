import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Descriptions } from 'antd';
import { Image } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
const {TextArea} = Input;
const Contentcard = () => (
  <div>
    <Descriptions
      title="Request Descriptions"
      bordered
      column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Restaurant ID">001</Descriptions.Item>
      <Descriptions.Item label="Restaurant Name">Happy Panda</Descriptions.Item>
      <Descriptions.Item label="E-mail">240178688@gmail.com</Descriptions.Item>
      <Descriptions.Item label="Category">Chinese Food</Descriptions.Item>
      <Descriptions.Item label="Contact Number">07857096367</Descriptions.Item>
      <Descriptions.Item label="Request Time">16:00 20/04/2022</Descriptions.Item>
      <Descriptions.Item label="Request Type">Sign up</Descriptions.Item>
      <Descriptions.Item label="Request Status">Processing</Descriptions.Item>
      <Descriptions.Item label="Address">2 Mayfild Road</Descriptions.Item>
      <Descriptions.Item label="Description">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
      </Descriptions.Item>
      <Descriptions.Item label="Restaurant Photo">
        <Image width={200} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
      </Descriptions.Item>
      <Descriptions.Item label="FBR_LICENSE">
        <Image width={200} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
      </Descriptions.Item>
    </Descriptions>
        <br />
        <br />
    <TextArea rows={4} placeholder="If the request is rejected,please comment the reason" maxLength={6} />
        <br />
        <br />
    <Button type="primary" style={{margin:"10px"}}>Reject</Button>

    <Button type="primary">Approve</Button>
  </div>
);

export default Contentcard;