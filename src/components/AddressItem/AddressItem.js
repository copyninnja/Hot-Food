import React, { useEffect } from "react";
import "./AddressItem.css";
import { createAddress, getAddressRaw } from "../../api";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/useAuth";
import { Link } from "react-router-dom";

const AddressItem = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const auth = useAuth();
  const { contactName, phone, address_line_1, address_line_2, postcode } =
    props.addressDetails;

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    //alert(JSON.stringify(data));
    console.log(data);
    props.addressDetailsHandler(data);
    data.customerEmail = auth.user.email;
    data.time = Date.now();
    console.log(data);
    createAddress(data);
  };

  const subTotal = props.cart.reduce((acc, crr) => {
    return acc + crr.price * crr.quantity;
  }, 0);

  const totalQuantity = props.cart.reduce((acc, crr) => {
    return acc + crr.quantity;
  }, 0);

  const tax = (subTotal / 100) * 5;
  const deliveryFee = totalQuantity && 2;
  const grandTotal = subTotal + tax + deliveryFee;

  return (
    <div className="addressitem container my-5">
      <div className="row">
        <div className="col-md-5">
          <h4>Add Delivery Address</h4>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)} className="py-5">
            <div className="form-group">
              <input
                name="postcode"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={postcode}
                placeholder="Postcode"
              />
              {errors.postcode && (
                <span className="error">Postcode is required</span>
              )}
            </div>

            <div className="form-group">
              <input
                name="address_line_1"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={address_line_1}
                placeholder="Address Line 1"
              />
              {errors.address_line_1 && (
                <span className="error">Address Line 1 is required</span>
              )}
            </div>

            <div className="form-group">
              <input
                name="address_line_2"
                className="form-control"
                ref={register({ required: false })}
                defaultValue={address_line_2}
                placeholder="Address Line 2"
              />
              {errors.address_line_2 && (
                <span className="error">Flat, Suite or Floor is required</span>
              )}
            </div>

            <div className="form-group">
              <input
                name="contactName"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={contactName}
                placeholder="Contact Name"
              />
              {errors.contactName && (
                <span className="error">Contact Name is required</span>
              )}
            </div>

            <div className="form-group">
              <input
                name="phone"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={phone}
                placeholder="Contact Number"
              />
              {errors.phone && (
                <span className="error">Contact Number is required</span>
              )}
            </div>

            <div className="form-group">
              <button className="btn btn-danger btn-block" type="submit">
                Save
              </button>
            </div>

            <div className="form-group">
              <Link to="/">
                <button className="btn btn-danger btn-block">Cancle</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressItem;
