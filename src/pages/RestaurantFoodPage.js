import React, { useState, useEffect } from "react";
import "./index.css";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import "antd/dist/antd.css";
import { Upload, Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadDiplomaImg, createRequest, uploadRestaurantImg } from "../api";
import Foods from "../components/Foods/Foods";

const RestaurantPage = () => {
  const [modalState, setModalState] = useState(false);
  const setModalVisible = () => {
    setModalState(!modalState);
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
        title="Vertically centered modal dialog"
        centered
        visible={modalState}
        onOk={() => setModalVisible()}
        onCancel={() => setModalVisible()}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>

      <Foods from="restaurant" />
    </div>
  );
};

export default RestaurantPage;
