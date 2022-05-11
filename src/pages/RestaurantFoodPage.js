import React, { useState } from "react";
import "./index.css";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Upload, Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createNotification, uploadDishImg } from "../api";
import Foods from "../components/Foods/Foods";

const RestaurantPage = () => {
  const [modalState, setModalState] = useState(false);
  const auth = useAuth();

  const setModalVisible = () => {
    setModalState(!modalState);
  };
  const dishPhotoUpload = (data) => {
    uploadDishImg(auth.user.uid, data);
  };
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    setModalVisible();
    data.restaurantID = auth.user.uid;
    createNotification(data);
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
        Create a new dish / Edit menu
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
            name="foodName"
            className="form-control dishButton"
            ref={register()}
            placeholder="Food Name"
          />
          <input
            name="foodDescription"
            className="form-control dishButton"
            ref={register()}
            placeholder="Food Description"
          />
          <input
            name="foodPrice"
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
