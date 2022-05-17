import React, { useEffect } from "react";
import MapImg from "../../images/img/map.png";
import Rider from "../../images/img/rider.png";
import RiderHelmet from "../../images/img/helmet.png";

const OrderComplete = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(props);
  const { address_line_1, address_line_2 } = props.address;
  const rider = props.rider;
  const restaurantName = props.restaurant;

  return (
    <div className="container my-3">
      <div className="row">
        <img className="img-fluid" src={MapImg} alt="" />
      </div>
      <div className="row">
        <div className="bg-light p-3 rounded">
          <img className="w-25 ml-5" src={Rider} alt="" />
          <div className="bg-white  rounded p-3 my-3">
            <div>
              <h5>Customer Location</h5>
              <p>
                {address_line_1} {address_line_2}
              </p>
            </div>
            <div>
              <h5>Shop Address</h5>
              <p>{restaurantName}</p>
            </div>
          </div>
          <h1>15 Minutes to arrive ...</h1>
          <p>Estimated Delivery</p>

          <div className="bg-white rounded p-3 d-flex">
            <img className="w-25 mr-2" src={RiderHelmet} alt="" />
            <div>
              <h6>{rider}</h6>
              <p>Your Rider</p>
            </div>
          </div>

          <button className="btn btn-block my-3 btn-danger">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
