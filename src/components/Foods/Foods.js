import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import allFoods from "../../fakeData/index";
import breakfast from "../../images/foodicon/breakfast.png";
import burger from "../../images/foodicon/burger.png";
import drink from "../../images/foodicon/cold drinks.png";
import dinner from "../../images/foodicon/dinner.png";
import iceCream from "../../images/foodicon/ice cream.png";
import lunch from "../../images/foodicon/lunch.png";
import pizza from "../../images/foodicon/pizza.png";
import sandwich from "../../images/foodicon/sandwich.png";
import shawarma from "../../images/foodicon/shawarma.png";
import FoodItem from "../FoodItem/FoodItem";
import { getFooditemList } from "../../api/FoodItemApi";
import { useAuth } from "../../context/useAuth";
import { findRestaurantEmail } from "../../api/RestaurantApi";
import "./Foods.css";

const Foods = (props) => {
  const [foods, setFoods] = useState([]);
  // const [ selectedFoodType, setSelectedFoodType ] = useState('lunch');
  const [selectedFastFoodType, setSelectedFastFoodType] = useState("pizza");
  const { restaurantId } = useParams();
  const auth = useAuth();

  // useEffect(() => {
  //   setFoods(allFoods);
  // }, []);

  useEffect(() => {
    if (typeof restaurantId == "undefined") {
      getFooditemList(auth.user.email).then((data) => {
        setFoods(data);
      });
    } else {
      findRestaurantEmail(restaurantId).then((restEmail) => {
        getFooditemList(restEmail).then((menu) => {
          setFoods(menu);
        });
      });
    }
  }, []);

  // const selectedFoods = foods.filter((food) => food.category === selectedFoodType);
  const selectedFastFoods = foods.filter(
    (food) => food.category === selectedFastFoodType,
    // (food) => food.restaurantEmail === auth.user.email,
  );

  return (
    <div className="container">
      <section className="food-area">
        {/* <nav>
					<ul className="nav justify-content-center">
						<li className="nav-item" onClick={() => setSelectedFoodType('breakfast')}>
							<span
								to="breakfast"
								className={selectedFoodType === 'breakfast' ? 'active nav-link' : 'nav-link'}
							>
								<img src={breakfast} alt="foodIcon" width="45px" className="mr-2" />
								Breakfast
							</span>
						</li>
						<li className="nav-item" onClick={() => setSelectedFoodType('lunch')}>
							<span to="lunch" className={selectedFoodType === 'lunch' ? 'active nav-link' : 'nav-link'}>
								<img src={lunch} alt="foodIcon" width="45px" className="mr-2" />
								Lunch
							</span>
						</li>
						<li className="nav-item" onClick={() => setSelectedFoodType('dinner')}>
							<span
								to="dinner"
								className={selectedFoodType === 'dinner' ? 'active nav-link' : 'nav-link'}
							>
								<img src={dinner} alt="foodIcon" width="45px" className="mr-2" />
								Dinner
							</span>
						</li>
					</ul>
				</nav>
				<div className="row my-5">{selectedFoods.map((food) => <FoodItem food={food} key={food.id} />)}</div> */}

        <div className="row my-5">
          {foods.map((food) => (
            <FoodItem food={food} key={food.id} />
          ))}
        </div>
        {props.from == "customer" ? (
          <div className="text-center">
            {props.cart.length ? (
              <Link to="/checkout">
                <button className="btn btn-danger">Check Out Your Food</button>
              </Link>
            ) : (
              <button disabled className="btn btn-secondary">
                Check Out Your Food
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};

export default Foods;
