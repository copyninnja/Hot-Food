import React, { useState, useEffect } from "react";
import "./index.css";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import "antd/dist/antd.css";
import { Upload, Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  uploadDiplomaImg,
  createNotification,
  uploadDishImg,
  getCustomerOrderRaw,
} from "../api";
import Foods from "../components/Foods/Foods";

const OrderPage = () => {
  const auth = useAuth();
  getCustomerOrderRaw(auth.user.email);
  return <></>;
};
export default OrderPage;
