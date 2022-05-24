import React, { createContext, useState, useCallback, useEffect } from "react";
import { getRestaurantsRaw } from "../api";
export const RestaurantsContext = createContext();

const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState({ allRestaurants: null });
  useEffect(() => {
    getRestaurants();
  }, []);
  const getRestaurants = useCallback(() => {
    return getRestaurantsRaw()
      .then(function (jsonData) {
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
    <RestaurantsContext.Provider value={{ restaurants }}>
      {props.children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContextProvider;
