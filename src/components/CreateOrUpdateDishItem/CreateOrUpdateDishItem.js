import React, { useState, useEffect } from "react";
import "../../index.css";
import { useAuth } from "../../context/useAuth";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Upload, Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createNotification, uploadDishImg, createFood } from "../../api";
import { updateFoodItem } from "../../api/FoodItemApi";

import Foods from "../Foods/Foods";

const CreateOrUpdateDishItem = (props) => {
  const [modalState, setModalState] = useState(false);
  const [downLoadUrl, setDownLoadUrl] = useState();
  const [modityType, setModityType] = useState();
  const [buttonDisplay, setButtonDisplay] = useState();
  const auth = useAuth();
  const { id, foodName, foodDescription, foodPrice, photoUrl } = props.food;
  useEffect(() => {
    if (id != null) {
      setButtonDisplay("update a foodItem");
      setModityType("update");
    } else {
      setButtonDisplay("create a foodItem");
      setModityType("create");
    }
  }, []);

  const setModalVisible = () => {
    setModalState(!modalState);
  };

  const dishPhotoUpload = async (data) => {
    const ddurl = await uploadDishImg(auth.user.uid, data);

    setTimeout(function () {
      setDownLoadUrl(ddurl);
    }, 500);
  };
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    setModalVisible();
    data.restaurantID = auth.user.uid;
    data.photoUrl = downLoadUrl;
    //alert(JSON.stringify(data));

    createNotification(data);

    if (modityType === "update") {
      //alert(JSON.stringify(data));
      updateFoodItem(id, data);
    }
    if (modityType === "create") {
      createFood(data);
    }
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
        {buttonDisplay}
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
            defaultValue={foodName}
            ref={register()}
            placeholder="Food Name"
          />
          <input
            name="foodDescription"
            defaultValue={foodDescription}
            className="form-control dishButton"
            ref={register()}
            placeholder="Food Description"
          />
          <input
            name="foodPrice"
            className="form-control dishButton"
            defaultValue={foodPrice}
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
    </div>
  );
};

export default CreateOrUpdateDishItem;
