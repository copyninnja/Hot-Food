import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../pages/index.css";
import { useAuth } from "../../context/useAuth";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Upload, Button, Modal } from "antd";
import {
  UploadOutlined,
  SendOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  createNotification,
  uploadDishImg,
  createFood,
  getUserUID,
} from "../../api";
import { updateFoodItem, deleteFoodItem } from "../../api/FoodItemApi";

const FoodItem = (props) => {
  const { id, name, description, price, img } = props.food;
  const [modalState, setModalState] = useState(false);
  const [downLoadUrl, setDownLoadUrl] = useState();
  const auth = useAuth();

  const setModalVisible = () => {
    setModalState(!modalState);
  };
  const deleteDish = () => {
    deleteFoodItem(id);
    window.location.reload();
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
    data.img = downLoadUrl;

    updateFoodItem(id, data);
    createNotification(data);
    //createFood(data);
    // data.RestaurantID = auth.user.uid;
    // const a = Object.assign(rawData, data);
    // createRequest(a);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card text-center">
        <img
          height="200"
          width="200"
          src={img}
          alt="FoodItem"
          className="card-img-top"
        />

        <div className="card-body">
          <h5>{name}</h5>
          <p>{description}</p>
          <h4>£{parseFloat(price).toFixed(2)}</h4>
        </div>

        <Button
          type="primary"
          shape="round"
          icon={<SendOutlined />}
          size="middle"
          className="dishButton"
          onClick={() => setModalVisible()}
        >
          update
        </Button>

        <Modal
          title="update this dish"
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
              defaultValue={name}
              placeholder="Food Name"
            />
            <input
              name="description"
              className="form-control dishButton"
              ref={register()}
              defaultValue={description}
              placeholder="Food Description"
            />
            <input
              name="price"
              className="form-control dishButton"
              ref={register()}
              defaultValue={price}
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

        <Button
          type="primary"
          danger="true"
          shape="round"
          icon={<DeleteOutlined />}
          size="middle"
          className="deleteDishButton"
          onClick={() => deleteDish()}
        >
          delete
        </Button>
      </div>
    </div>
  );
  // const { id, foodName, foodDescription, foodPrice, photoUrl} = props.food;
  // alert(JSON.stringify(props.food));
  // const deleteFood = () => {
  //   try{
  //     deleteFoodItem(id);
  //   }catch(error){
  //     alert(error.msg);
  //   }
  //   alert("delete successful");
  // };

  // return (
  //   <div className="col-md-4 mb-4">

  //       <div className="card text-center">
  //         <img height="200" width="200" src={photoUrl} alt="FoodItem" className="card-img-top" />

  //         <div className="card-body">
  //           <h5>{foodName}</h5>
  //           <p>{foodDescription}</p>
  //           <h4>£{foodPrice}</h4>
  //         </div>
  //         <div className="form-group">
  //             <button className="btn btn-danger btn-block" onClick={deleteFood}>
  //               Delete
  //             </button>
  //           </div>
  //           <CreateOrUpdateDishItem food={props.food}>

  //           </CreateOrUpdateDishItem>
  //       </div>

  //   </div>
  // );
};

export default FoodItem;
