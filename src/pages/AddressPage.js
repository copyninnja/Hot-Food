import React, { useState, useEffect, useContext } from "react";
import "./index.css";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import "antd/dist/antd.css";
import { List, Button, Skeleton } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  uploadDiplomaImg,
  createNotification,
  uploadDishImg,
  // getAddressOrderRaw,
  getRestaurantName,
} from "../api";
import Foods from "../components/Foods/Foods";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { dateFormat } from "../helpers/dateFormat";
import { getAddressList } from "../api/AddressApi";
const AddressPage = () => {
  const auth = useAuth();
  const [listState, setListState] = useState({
    initLoading: true,
    loading: false,
    list: [],
  });
  const [detail, setDetail] = useState({
    show: false,
    contactNumber: null,
    city: null,
    postcode: null,
    address1: null,
    address2: null,
    contactNumber: null,
  });
  const onShowDetail = (data) => {
    console.log(data);
    setDetail({
      show: true,
      contactNumber: data.phone,
      city: data.city,
      postcode: data.postcode,
      address1: data.address_line_1,
      address2: data.address_line_2,
      contactName: data.contactName,
    });
  };
  const onLoadMore = () => {};

  useEffect(() => {
    window.scrollTo(0, 0);
     getAddressList(auth.user.email).then((data) => {
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
        <Link to="/addAddress" className="nav-link">
          <Button onClick={() => onLoadMore()}>Add New Address</Button>
        </Link>

        <Link to="/" className="nav-link">
          <Button onClick={() => onLoadMore()}>Return</Button>
        </Link>
      </div>
    ) : null;
  return (
    <div className=" container my-5">
      <div className="row">
        <div className="col-md-5">
          <h4 className="titile">Address Book</h4>
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
                  <a
                    onClick={() => onShowDetail(item)}
                    key="list-loadmore-more"
                  >
                    update
                  </a>,
                ]}
              >
                <Skeleton title={false} loading={item.loading} active>
                  <List.Item.Meta title={item.phone} />

                  <List.Item.Meta title={item.postcode} />

                  <List.Item.Meta title={item.address_line_1} />
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
export default AddressPage;
