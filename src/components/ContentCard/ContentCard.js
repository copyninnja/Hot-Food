import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Descriptions, message } from "antd";
import { Image } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { Alert } from "antd";
import { Modal } from "antd";
import { Spin } from "antd";
import { getRequestContent, updateRetaurantStatus } from "../../api";
import { updateRequest } from "../../api";
const { TextArea } = Input;

const Contentcard = (props) => {
  const [contentdata, setcontentData] = useState([]);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showButton, setShowButton] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [uid, setUid] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Are you sure you want to approve this request?",
  );

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    //
    const status = "Approved";
    const message = "This request has been approved";
    updateRequest(props.contentId, status, message).then(
      //window.location.reload(),
      console.log("xxx"),
      setRefresh(!refresh),
      setShowProgress(false),
    );
    //updateRetaurantStatus(uid).then(console.log("account is approved"));
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  //request button:
  const rejectRequest = () => {
    console.log("msg", message);
    if (message === "") {
      Modal.warning({
        title: "This is a warning message",
        content: "Plese make sure you have left the reject message...",
      });
    } else {
      const status = "Rejected";
      setShowProgress(!showProgress);
      updateRequest(props.contentId, status, message).then(
        //window.location.reload(),
        console.log("xxx"),
        setRefresh(!refresh),
        setShowProgress(false),
        //setShowButton(!showButton),
      );
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    //console.log(e.target.value);
  };

  useEffect(() => {
    getRequestContent(props.contentId).then((res) => {
      console.log("res", res);
      setcontentData(res);
      setShowButton(res[0].status);
      console.log(res[0].uid);
      setUid(res[0].uid);
    });
    console.log("xxx");
  }, [props.contentId, refresh]);

  return (
    <div>
      {contentdata.length > 0 ? (
        contentdata.map((item) => {
          return (
            <div key={item.time}>
              <Descriptions
                title="Request Descriptions"
                bordered
                column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label="Restaurant Name">
                  {item.RestaurantName}
                </Descriptions.Item>
                <Descriptions.Item label="E-mail">
                  {item.RestaurantEmail}
                </Descriptions.Item>
                <Descriptions.Item label="Category">
                  {item.category}
                </Descriptions.Item>
                <Descriptions.Item label="Price">
                  {item.price}
                </Descriptions.Item>
                <Descriptions.Item label="Request Time">
                  {item.time}
                </Descriptions.Item>
                <Descriptions.Item label="Request Type">
                  Sign up
                </Descriptions.Item>
                <Descriptions.Item label="Request Status">
                  {item.status}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {item.place}
                </Descriptions.Item>
                <Descriptions.Item label="FBR_LICENSE">
                  <Image width={200} src={item.imgUrl} />
                </Descriptions.Item>
              </Descriptions>
              <br />
              <br />
              {showButton === "Not verified" ? (
                <div>
                  <TextArea
                    rows={4}
                    placeholder="If the request is rejected,please comment the reason"
                    maxLength={30}
                    value={message}
                    onChange={handleMessageChange}
                  />
                  <br />
                  <br />
                  <Button
                    type="primary"
                    style={{ margin: "10px" }}
                    onClick={rejectRequest}
                  >
                    Reject
                  </Button>
                  <Button type="primary" onClick={showModal}>
                    Approve
                  </Button>
                  <Modal
                    title="Approve request"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                  >
                    <p>{modalText}</p>
                  </Modal>
                </div>
              ) : (
                <div></div>
              )}
              {showProgress ? (
                <div className="example">
                  <Spin />
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Contentcard;
