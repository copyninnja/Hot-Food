import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "../../images/logo2.png";
import "./SignUp.css";
import { useAuth } from "../../context/useAuth";

const SignUp = () => {
  const [returningUser, setReturningUser] = useState(true);
  const { register, handleSubmit, watch, errors } = useForm();
  const auth = useAuth();
  const [radioValue, setRadioValue] = useState("Customer");
  const onSubmit = (data) => {
    console.log(data);
    if (returningUser) {
      if (data.email && data.password) {
        auth.signIn(data.email, data.password, data.type);
      }
    } else {
      if (
        data.name &&
        data.email &&
        data.password &&
        data.confirm_password &&
        data.type
      ) {
        auth.signUp(data.email, data.confirm_password, data.name, data.type);
      }
    }
  };
  const handleChange = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <div className="sign-up">
      <div className="signup-container">
        <div className="logo text-center py-4">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        {returningUser ? (
          <form onSubmit={handleSubmit(onSubmit)} className="py-3">
            <h1 className="lead text-center py-3">Welcome back!</h1>
            {auth.user != null && (
              <p className="text-danger">* {auth.user.error}</p>
            )}

            <div className="form-group">
              <input
                name="email"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Email"
              />
              {errors.email && <span className="error">Email is required</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Password"
              />
              {errors.password && (
                <span className="error">Password is required</span>
              )}
            </div>
            <div className="form-group">
              <ul className="radios">
                <li>
                  <label>Customer</label>
                  <input
                    className="radioItem"
                    type="radio"
                    name="type"
                    id="type1"
                    value="Customer"
                    ref={register({ required: true })}
                    checked={radioValue === "Customer"}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>Restaurant</label>
                  <input
                    className="radioItem"
                    type="radio"
                    name="type"
                    id="type2"
                    value="Restaurant"
                    ref={register({ required: true })}
                    checked={radioValue === "Restaurant"}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>Admin</label>
                  <input
                    className="radioItem"
                    type="radio"
                    name="type"
                    id="type3"
                    value="Admin"
                    ref={register({ required: true })}
                    checked={radioValue === "Admin"}
                    onChange={handleChange}
                  />
                </li>
              </ul>
            </div>
            <div className="form-group">
              {/* <Link to={"/" + radioValue}> */}
              <button className="btn btn-danger btn-block" type="submit">
                Sign In
              </button>
              {/* </Link> */}
            </div>

            <div className="text-center my-0">
              <label> or </label>
            </div>

            {/* <Link to={"/" + radioValue}> */}
            <button
              className="btn btn-success  btn-block"
              onClick={auth.signInWithGoogle}
            >
              Sign in with Google
            </button>
            {/* </Link> */}

            <div className="option text-center my-3">
              <label onClick={() => setReturningUser(false)}>
                Create a new Account
              </label>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="py-5">
            {auth.user != null && (
              <p className="text-danger">* {auth.user.error}</p>
            )}
            <div className="form-group">
              <input
                name="name"
                className="form-control"
                ref={register({ required: "Name is required" })}
                placeholder="Name"
              />
              <span className="error">
                {errors.name && errors.name.message}
              </span>
            </div>

            <div className="form-group">
              <input
                name="email"
                className="form-control"
                ref={register({
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
              />
              <span className="error">
                {errors.email && errors.email.message}
              </span>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                ref={register({
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
                    message:
                      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
                  },
                })}
                placeholder="Password"
              />
              <span className="error">
                {errors.password && errors.password.message}
              </span>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirm_password"
                className="form-control"
                ref={register({
                  validate: (value) => value === watch("password"),
                })}
                placeholder="Confirm Password"
              />
              {errors.confirm_password && (
                <span className="error">Passwords don't match.</span>
              )}
            </div>
            <div className="form-group">
              <ul className="radios">
                <li>
                  <label>Customer</label>
                  <input
                    className="radioItem"
                    type="radio"
                    name="type"
                    id="type1"
                    value="Customer"
                    ref={register({ required: true })}
                    checked={radioValue === "Customer"}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>Restaurant</label>
                  <input
                    className="radioItem"
                    type="radio"
                    name="type"
                    id="type2"
                    value="Restaurant"
                    ref={register({ required: true })}
                    checked={radioValue === "Restaurant"}
                    onChange={handleChange}
                  />
                </li>
              </ul>
            </div>

            <div className="form-group">
              {/* <Link to={"/" + radioValue}> */}
              <button className="btn btn-danger btn-block" type="submit">
                Sign Up
              </button>
              {/* </Link> */}
            </div>

            <div className="option text-center my-3">
              <label onClick={() => setReturningUser(true)}>
                Already Have an Account
              </label>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
