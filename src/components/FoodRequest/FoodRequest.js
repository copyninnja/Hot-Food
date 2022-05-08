import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Descriptions } from 'antd';
import { Image } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
const {TextArea} = Input;
const foodList =[{foodId:'001',foodName:'noodle'},{foodId:'002',foodName:'sushi'}];
const FoodRequest = () => (
  <div>
    <Descriptions
      title="Request Descriptions"
      bordered
      column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Restaurant ID">001</Descriptions.Item>
      <Descriptions.Item label="Restaurant Name">Happy Panda</Descriptions.Item>
      <Descriptions.Item label="Cusisine Type">Chinese Food</Descriptions.Item>
      <Descriptions.Item label="Request Time">16:00 20/04/2022</Descriptions.Item>
      <Descriptions.Item label="Request Type">Product Change</Descriptions.Item>
      <Descriptions.Item label="Request Status">Processing</Descriptions.Item>
    </Descriptions>
        <br />
        <br />
      {
        foodList.map((food)=>{
            return(  
            <Descriptions
            bordered
            column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
               <Descriptions.Item label="Food ID">001</Descriptions.Item>
               <Descriptions.Item label="Food Name">foodname</Descriptions.Item>
               <Descriptions.Item label="Food Price">£3.0</Descriptions.Item>
               <Descriptions.Item label="category">Meal</Descriptions.Item>
               <Descriptions.Item label="description">description</Descriptions.Item>
               <Descriptions.Item label="Food Photo">
                    <Image width={200} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
               </Descriptions.Item>
              </Descriptions>
            )
        }) 
    }
    <br />
    <br />
    <TextArea rows={4} placeholder="If the request is rejected,please comment the reason" maxLength={6} />
        <br />
        <br />
    <Button type="primary" style={{margin:"10px"}}>Reject</Button>

    <Button type="primary">Approve</Button>
  </div>
);

export default FoodRequest;