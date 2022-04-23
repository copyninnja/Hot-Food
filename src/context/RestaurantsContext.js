import React, { createContext, useState, useCallback } from "react";

export const RestaurantsContext = createContext();

const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState({ allRestaurants: null });

  const getRestaurants = useCallback(() => {
    return fetch("/data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        setRestaurants({
          allRestaurants: jsonData.restaurants,
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
