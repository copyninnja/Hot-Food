import React, { useState, useEffect } from "react";
import "./index.css";
import { useAuth } from "../context/useAuth";
import { Select } from "antd";
import "antd/dist/antd.css";
import { List, Button, Skeleton } from "antd";
import {
  getCustomerOrderRaw,
  getRestaurantOrderRaw,
  updateOrderDelivering,
  updateOrderDelivered,
  updateOrderCanceled,
} from "../api";
import { dateFormat } from "../helpers/dateFormat";
import OrderComplete from "../components/OrderComplete/OrderComplete";
const OrderPage = () => {
  const auth = useAuth();
  const [listState, setListState] = useState({
    initLoading: true,
    loading: false,
    type: null,
    list: [],
  });
  const [detail, setDetail] = useState({
    show: false,
    tax: 0,
    deliveryFee: 0,
    grandTotal: 0,
    address: null,
    restaurantName: null,
    orderDetail: null,
    customerEmail: null,
    time: null,
    uid: null,
    driver: null,
  });
  const onShowDetail = (data) => {
    console.log(data);
    setDetail({
      show: true,
      tax: data.tax,
      deliveryFee: data.deliveryFee,
      grandTotal: data.grandTotal,
      address: data.address,
      restaurantName: data.restaurantName,
      orderDetail: data.orderDetail,
      status: data.status,
      customerEmail: data.customerEmail,
      time: data.time,
      uid: data.uid,
      driver: data.driver,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (auth.user.type == "Customer") {
      getCustomerOrderRaw(auth.user.email).then((data) => {
        setListState({ initLoading: false, list: data, type: "Customer" });
      });
    } else if (auth.user.type == "Restaurant") {
      getRestaurantOrderRaw(auth.user.displayName).then((data) => {
        setListState({ initLoading: false, list: data, type: "Restaurant" });
      });
    }
  }, []);
  const { initLoading, loading, list, type } = listState;

  const [rawData, setRawData] = useState({});
  const { Option } = Select;
  function handleCategoryChange(value) {
    setRawData(value);
  }
  const assignDelivery = (uid) => {
    updateOrderDelivering({
      driver: rawData,
      uid: uid,
    });
  };
  const onDelivered = (data) => {
    updateOrderDelivered(data.uid);
  };
  const onCancel = (data) => {
    // updateOrderDelivered(data.uid);
    updateOrderCanceled(data.uid);
  };

  const onLoadMore = () => {};

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={() => onLoadMore()}>loading more</Button>
      </div>
    ) : null;
  return (
    <div className=" container my-5">
      <div className="row">
        <div className="col-md-5">
          <h4 className="titile">Past Orders</h4>
          <hr />
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                actions={
                  type == "Customer" && item.status == "delivering"
                    ? [
                        <a
                          key="list-loadmore-edit"
                          onClick={() => onDelivered(item)}
                        >
                          Delivered
                        </a>,
                        <a
                          onClick={() => onShowDetail(item)}
                          key="list-loadmore-more"
                        >
                          More
                        </a>,
                      ]
                    : item.status == "not taken"
                    ? [
                        <a
                          key="list-loadmore-edit"
                          onClick={() => onCancel(item)}
                        >
                          Cancel
                        </a>,
                        <a
                          onClick={() => onShowDetail(item)}
                          key="list-loadmore-more"
                        >
                          More
                        </a>,
                      ]
                    : [
                        <a
                          onClick={() => onShowDetail(item)}
                          key="list-loadmore-more"
                        >
                          More
                        </a>,
                      ]
                }
              >
                <Skeleton title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={
                      type == "Customer"
                        ? item.restaurantName
                        : item.customerEmail
                    }
                    description={
                      "" + dateFormat(new Date(item.time), "default")
                    }
                  />
                  <div>
                    &nbsp; Status: <br />
                    {item.status}
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
        {detail.show ? (
          <div className="offset-md-1 col-md-5">
            <div className="restaurant-info mb-3">
              <h4 className="titile">
                From
                {type == "Customer" ? (
                  <strong> {detail.restaurantName}</strong>
                ) : (
                  <strong> {detail.customerEmail}</strong>
                )}
              </h4>
              {detail.orderDetail.map((item) => (
                <div
                  key={item.id}
                  className="single-checkout-item mb-3 bg-light rounded d-flex align-items-center justify-content-between p-3"
                >
                  <img
                    width="140px"
                    className="moor-images"
                    src={item.img}
                    alt="food-image"
                  />
                  <div className="px-4">
                    <h6>{item.name}</h6>
                    <h4 className="text-danger">${item.price.toFixed(2)}</h4>
                    <p>
                      <small>Delivery description: {item.description}</small>
                    </p>
                  </div>

                  <div className="checkout-item-button ml-3 btn">
                    <button className="btn bg-white rounded">
                      {item.quantity}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {detail.status == "delivering" ? (
              <OrderComplete
                address={detail.address}
                restaurant={detail.restaurantName}
                rider={detail.driver}
              />
            ) : (
              <></>
            )}
            {detail.status == "not taken" && type == "Restaurant" ? (
              <div className="form-group">
                <Select
                  placeholder="Assign Driver"
                  style={{ width: 200 }}
                  onChange={handleCategoryChange}
                  id="1"
                >
                  <Option value="Abdoulaye Sekhar">Abdoulaye Sekhar</Option>
                  <Option value="Lanre Chand">Lanre Chand</Option>
                  <Option value="Popeye Mariamne">Popeye Mariamne</Option>
                  <Option value="Pikachu Murron">Pikachu Murron</Option>
                  <Option value="Florian Gordian">Florian Gordian</Option>
                </Select>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  className="assignButton"
                  onClick={() => assignDelivery(detail.uid)}
                >
                  {" "}
                  Assign order
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default OrderPage;
