import RestaurantMenu from "../components/RestaurantMenu";
import React, { useState, useContext, useEffect } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { FILTER_ITEMS } from "../helpers/constants";
import "./index.css";
import { useAuth } from "../context/useAuth";
import { useHistory } from "react-router-dom/";
import { getNotification, updateNotifiRead } from "../api";
import { Modal } from "antd";
import { dateFormat } from "../helpers/dateFormat";

const CustomerMenu = () => {
  const { restaurants, getRestaurants } = useContext(RestaurantsContext);
  const { allRestaurants } = restaurants;
  const [notiData, setNotiData] = useState({
    restName: "",
    img: "",
    description: "",
    price: "",
    time: "",
  });

  const [visible, setVisible] = useState(false);

  const auth = useAuth();
  const history = useHistory();
  const handleOk = () => {
    setVisible(false);
    updateNotifiRead(notiData.uid);
  };
  useEffect(() => {
    if (auth.user) {
      if (auth.user.type === "Restaurant") {
        auth.user.status == "Not verified"
          ? history.push("/RestaurantSignUp")
          : history.push("/Restaurant");
      } else if (auth.user.type === "Admin") {
        history.push("/Admin");
      } else {
        getNotification().then((data) => {
          if (data.length > 0) {
            setNotiData(data[0]);
            setVisible(true);
          }
        });
      }
    }
  }, [auth]);

  return (
    <div>
      <Modal
        title="Food recommendation"
        visible={visible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <div className="signup-container ">
          <h5>
            From ordered restaurant:<strong>{notiData.restaurantName}</strong>
          </h5>
          <img
            width="140px"
            className="moor-images"
            src={notiData.img}
            alt="food-image"
          />
          <p>
            Food name: <strong>{notiData.name}</strong>
          </p>
          <p>
            Food price: <strong>{notiData.price}</strong>
          </p>
          <p>
            released in: <strong>{dateFormat(notiData.time)}</strong>
          </p>
        </div>
      </Modal>
      <RestaurantMenu allRestaurants={allRestaurants}></RestaurantMenu>
    </div>
  );
};

export default CustomerMenu;
