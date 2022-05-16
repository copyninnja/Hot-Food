import React, { useState, useEffect, useContext } from "react";
import "./index.css";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import "antd/dist/antd.css";
import { List, Button, Skeleton } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  uploadDiplomaImg,
  createNotification,
  uploadDishImg,
  getCustomerOrderRaw,
  getRestaurantName,
} from "../api";
import Foods from "../components/Foods/Foods";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { dateFormat } from "../helpers/dateFormat";
const OrderPage = () => {
  const auth = useAuth();
  const [listState, setListState] = useState({
    initLoading: true,
    loading: false,
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
    });
  };
  const onLoadMore = () => {};

  useEffect(() => {
    window.scrollTo(0, 0);
    getCustomerOrderRaw(auth.user.email).then((data) => {
      setListState({ initLoading: false, list: data });
    });
  }, []);
  const { initLoading, loading, list } = listState;

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
                actions={[
                  <a key="list-loadmore-edit">Delivered</a>,
                  <a
                    onClick={() => onShowDetail(item)}
                    key="list-loadmore-more"
                  >
                    more
                  </a>,
                ]}
              >
                <Skeleton title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={item.restaurantName}
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
                From <strong> {detail.restaurantName}</strong>
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
                      <small>Delivery free</small>
                    </p>
                  </div>

                  <div className="checkout-item-button ml-3 btn">
                    <button
                      // onClick={() =>
                      //   props.checkOutItemHandler(item.id, item.quantity + 1)
                      // }
                      className="btn font-weight-bolder"
                    >
                      +
                    </button>

                    <button className="btn bg-white rounded">
                      {item.quantity}
                    </button>

                    {item.quantity > 0 ? (
                      <button
                        // onClick={() =>
                        //   props.checkOutItemHandler(item.id, item.quantity - 1)
                        // }
                        className="btn font-weight-bolder"
                      >
                        -
                      </button>
                    ) : (
                      <button className="btn font-weight-bolder">-</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default OrderPage;
