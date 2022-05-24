import React, { useState } from "react";
import "./index.css";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Upload, Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  createNotification,
  uploadDishImg,
  createFood,
  getUserUID,
} from "../api";

import Foods from "../components/Foods/Foods";

const RestaurantPage = () => {
  const [modalState, setModalState] = useState(false);
  const [downLoadUrl, setDownLoadUrl] = useState();
  const auth = useAuth();

  const setModalVisible = () => {
    setModalState(!modalState);
  };
  const dishPhotoUpload = (data) => {
    uploadDishImg(auth.user.uid, data).then((ddurl) => {
      setDownLoadUrl(ddurl);
    });
  };
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    setModalVisible();
    data.restaurantEmail = auth.user.email;
    data.restaurantName = auth.user.displayName;
    data.img = downLoadUrl;
    //alert("saveData:"+JSON.stringify(data));
    createNotification(data);
    createFood(data);
    // data.RestaurantID = auth.user.uid;
    // const a = Object.assign(rawData, data);
    // createRequest(a);
  };
  return (
    <div className="restStatus">
      <Button
        type="dashed"
        shape="round"
        icon={<UploadOutlined />}
        size="large"
        className="dishButton"
        onClick={() => setModalVisible()}
      >
        Create a new dish
      </Button>
      <Modal
        title="create a new dish"
        centered
        visible={modalState}
        onOk={() => setModalVisible()}
        onCancel={() => setModalVisible()}
        footer={[
          <Button key="back" onClick={() => setModalVisible()}>
            Return
          </Button>,
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            className="form-control dishButton"
            ref={register()}
            placeholder="Food Name"
          />
          <input
            name="description"
            className="form-control dishButton"
            ref={register()}
            placeholder="Food Description"
          />
          <input
            name="price"
            className="form-control dishButton"
            ref={register()}
            placeholder="Food Price £"
          />
          <Upload
            action="https://europe-west2-tactile-octagon-298212.cloudfunctions.net/function-2"
            listType="picture"
            className="upload-list-inline"
            onChange={(event) => {
              dishPhotoUpload(event.file);
            }}
          >
            <Button className="dishButton" icon={<UploadOutlined />}>
              Dish photo Upload
            </Button>
          </Upload>
          <div className="restStatus">
            <button className="dishButton signUpButton" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <Foods from="restaurant" />
    </div>
  );
};

export default RestaurantPage;
