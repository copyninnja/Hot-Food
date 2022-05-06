import React, { createContext, useState, useCallback } from "react";
import { getRestaurantsRaw } from "../api";

export const RestaurantsContext = createContext();

const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState({ allRestaurants: null });

  const getRestaurants = useCallback(() => {
    return getRestaurantsRaw()
      .then(function (jsonData) {
        console.log(jsonData);
        setRestaurants({
          allRestaurants: jsonData,
        });
      })
      .catch((error) => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error,
        );
      });
  }, []);

  return (
    <RestaurantsContext.Provider value={{ restaurants, getRestaurants }}>
      {props.children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContextProvider;
