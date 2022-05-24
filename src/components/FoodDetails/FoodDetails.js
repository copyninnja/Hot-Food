import {
  faCartArrowDown,
  faCheckCircle,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import suggestionFood from "../../fakeData/suggestionFood";
import RecommendFood from "../RecommendFood/RecommendFood";
import "./FoodDetails.css";
import { findFoodItem } from "../../api/FoodItemApi";

const FoodDetails = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.href.indexOf("#reloaded") == -1) {
      window.location.href = window.location.href + "#reloaded";
      window.location.reload();
    }
  }, []);
  let history = useHistory();

  const { restaurantId, id } = useParams();
  //const currentFood = allFoods.find((food) => food.id === id);

  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentFood, setCurrentFood] = useState({});

  useEffect(() => {
    async function getAllFood() {
      const res = await findFoodItem(id);
      res.quantity = 1;
      setCurrentFood(res);
    }
    getAllFood();
  }, []);

  useEffect(() => {
    if (currentFood.quantity) {
      setQuantity(currentFood.quantity);
    }
  }, [currentFood.quantity]);

  const finalCartHandler = (currentFood) => {
    //alert("finalCartHandler");
    props.restHandler(restaurantId);
    currentFood.quantity = quantity;
    console.log(currentFood);
    props.cartHandler(currentFood);
    setIsSuccess(true);
  };

  if (isSuccess) {
    setTimeout(() => setIsSuccess(false), 1500);
  }

  let m = 0;
  let n = 3;

  function goBack() {
    //alert("goBack");
    history.push("/");
    window.scrollTo(0, 9999);
  }

  return (
    <div className="food-details container scrollable">
      <div className="text-center">
        <div onClick={goBack}>
          <button className="btn btn-danger btn-rounded my-3">
            <FontAwesomeIcon icon={faWindowClose} />
            <span> Close </span>
          </button>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-7 pr-md-4">
          <h1>{currentFood.name}</h1>
          <p className="my-5">{currentFood.description}</p>
          <div className="d-flex my-4">
            <h2 className="price">${currentFood.price}</h2>

            <div className="cart-controller ml-3 btn">
              <button
                className="btn"
                onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
              >
                -
              </button>
              {quantity}
              <button className="btn" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="action d-flex align-items-center">
            <button
              className="btn btn-danger btn-rounded mb-2"
              onClick={() => finalCartHandler(currentFood)}
            >
              <FontAwesomeIcon icon={faCartArrowDown} />
              <span> Add</span>
            </button>
            {isSuccess && (
              <p className="ml-3 success-mgs text-success">
                <FontAwesomeIcon icon={faCheckCircle} /> Item added to Cart
              </p>
            )}
          </div>
        </div>

        <div className="col-md-5 order-first order-md-last">
          <img
            className="img-fluid mb-4"
            src={currentFood.img}
            alt="food-image"
          />
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
