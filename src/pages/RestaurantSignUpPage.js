import React, { useState, useEffect } from "react";
import "./index.css";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import "antd/dist/antd.css";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadImg, createRequest } from "../api";
const RestaurantPage = () => {
  const auth = useAuth();
  const [status, setStatus] = useState(null);
  const [rawData, setRawData] = useState({});

  const { register, handleSubmit, watch, errors } = useForm();
  useEffect(() => {
    if (auth.user) {
      setStatus(auth.user.status);
    }
  }, [auth]);
  const onSubmit = (data) => {
    data.RestaurantID = auth.user.uid;
    const a = Object.assign(rawData, data);
    createRequest(a);
  };
  const imageUpload = (data) => {
    uploadImg(auth.user.uid, data);
  };
  const { Option } = Select;
  function handleCategoryChange(value) {
    const data = { ...rawData };
    data.category = value;
    setRawData(data);
  }
  function handlePriceChange(value) {
    const data = { ...rawData };
    data.price = value;
    setRawData(data);
  }

  return (
    <div className="sign-up">
      <div id="restStatus">
        <p>restaurant status: {status}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="py-3">
        <div className="form-group">
          <input
            name="Restaurant Name"
            className="form-control"
            ref={register({ required: true })}
            placeholder="Restaurant Name"
          />
          {errors.name && (
            <span className="error">Restaurant Name is required</span>
          )}
        </div>
        <div className="form-group">
          <input
            name="description"
            className="form-control"
            placeholder="Description"
            ref={register()}
          />
        </div>
        <div className="form-group">
          <input
            name="place"
            className="form-control"
            ref={register()}
            placeholder="Address"
          />
        </div>
        <div className="form-group">
          <Select
            defaultValue="Category"
            style={{ width: 200 }}
            onChange={handleCategoryChange}
            id="1"
          >
            <Option value="Italian">Italian</Option>
            <Option value="Burgers">Burgers</Option>
            <Option value="Deli">Deli</Option>
            <Option value="Brunch">Brunch</Option>
            <Option value="Mexican">Mexican</Option>
          </Select>
          <Select
            defaultValue="Price"
            style={{ width: 200 }}
            onChange={handlePriceChange}
            id="2"
          >
            <Option value="1">1-10</Option>
            <Option value="2">10-20</Option>
            <Option value="3">30-40</Option>
            <Option value="4">{">"}40</Option>
          </Select>
        </div>
        <div className="form-group">
          <Upload
            action="https://europe-west2-tactile-octagon-298212.cloudfunctions.net/function-2"
            listType="picture"
            className="upload-list-inline"
            onChange={(event) => {
              imageUpload(event.file);
            }}
          >
            <Button icon={<UploadOutlined />}>FBR_LICENSE</Button>
          </Upload>
        </div>
        <div className="form-group">
          <Upload
            action="https://europe-west2-tactile-octagon-298212.cloudfunctions.net/function-2"
            listType="picture"
            className="upload-list-inline"
            onChange={(event) => {
              imageUpload(event.file);
            }}
          >
            <Button icon={<UploadOutlined />}>Restaurant photo</Button>
          </Upload>
        </div>
        <div className="form-group">
          <button className="btn btn-danger btn-block" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantPage;
