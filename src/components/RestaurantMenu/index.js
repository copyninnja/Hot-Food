import RestaurantCard from "../RestaurantCard";
import { NUMBER_OF_FEATURED_ITEMS } from "../../helpers/constants";
import PropTypes from "prop-types";
import React, { Component } from "react";
import "./index.css";
const RestaurantMenu = ({ allRestaurants, searchTerm }) => {
  return (
    <>
      <div className="itemsContainer">
        <h2>All Restaurants</h2>
        <div className="itemsInner">
          {allRestaurants &&
            allRestaurants.map((item) => (
              <RestaurantCard
                key={item.id}
                item={item}
                highlight={searchTerm}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
