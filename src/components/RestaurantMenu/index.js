import RestaurantCard from "../RestaurantCard";
import { NUMBER_OF_FEATURED_ITEMS } from "../../helpers/constants";
import PropTypes from "prop-types";
import React, { Component, useState } from "react";
import "./index.css";
import { Radio } from "antd";
import restaurants from "../../fakeData/restaurants";
const RestaurantMenu = ({ allRestaurants, searchTerm }) => {
  const [filterList, setFilterList] = useState(4);

  function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
    setFilterList(checkedValues);
  }
  console.log(allRestaurants);
  return (
    <>
      <div className="itemsContainer">
        <h2>All Restaurants</h2>
        <Radio.Group
          onChange={(e) => onChange(e.target.value)}
          value={filterList}
        >
          <Radio value={1}>{"<1 km"}</Radio>
          <Radio value={2}>{"<3 km"}</Radio>
          <Radio value={3}>{"<5 km"}</Radio>
          <Radio value={4}>{"<10 km"}</Radio>
        </Radio.Group>
        <div className="itemsInner">
          {allRestaurants &&
            allRestaurants
              .filter((restaurant) => restaurant.price <= filterList)
              .map((item) => (
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
