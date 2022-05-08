import React, { useEffect } from "react";
import "./AddressItem.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const AddressItem = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { postcode, road, flat, contactName, contactNumber, description } = props.deliveryDetails;

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => props.deliveryDetailsHandler(data);

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
                name="road"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={road}
                placeholder="Address Line 1"
              />
              {errors.road && (
                <span className="error">Address Line 1 is required</span>
              )}
            </div>

            <div className="form-group">
              <input
                name="flat"
                className="form-control"
                ref={register({ required: false })}
                defaultValue={flat}
                placeholder="Address Line 2"
              />
              {errors.flat && (
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
                name="contactNumber"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={contactNumber}
                placeholder="Contact Number"
              />
              {errors.contactNumber && (
                <span className="error">Contact Number is required</span>
              )}
            </div>

            

            <div className="form-group">
              <textarea
                name="Description"
                ref={register({ required: true })}
                defaultValue={description}
                placeholder="Description"
                className="form-control"
                cols="30"
                rows="2"
              ></textarea>
              {errors.address && (
                <span className="error">Password is required</span>
              )}
            </div>

            <div className="form-group">
              <button className="btn btn-danger btn-block" type="submit">
                Save
              </button>
              
              
            </div>

            <div className="form-group">
            <Link to="/">
              <button className="btn btn-danger btn-block">
                Cancle
              </button>
              </Link>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default AddressItem;
