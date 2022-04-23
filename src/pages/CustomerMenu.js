import RestaurantMenu from "../components/RestaurantMenu";
import React, { useState, useContext, useEffect } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { FILTER_ITEMS } from "../helpers/constants";
import { isFiltersActive } from "../helpers/utils";
import "./index.css";

const CustomerMenu = () => {
  const { restaurants, getRestaurants } = useContext(RestaurantsContext);
  const [activeFilterList, setActiveFilters] = useState(FILTER_ITEMS);
  const { allRestaurants } = restaurants;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  useEffect(() => {
    const searchRestaurants = () => {
      if (!allRestaurants) {
        return null;
      }

      let results = allRestaurants;

      if (isFiltersActive(activeFilterList)) {
        results = results.filter(
          (restaurant) => activeFilterList[restaurant.priceRange],
        );
      }

      if (searchTerm !== "") {
        results = results.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
        );
      }

      setSearchResults(results);

      if (searchTerm === "" && !isFiltersActive(activeFilterList)) {
        setSearchResults(null);
      }
    };

    searchRestaurants();
  }, [allRestaurants, searchTerm, activeFilterList]);
  return <RestaurantMenu allRestaurants={allRestaurants}></RestaurantMenu>;
};

export default CustomerMenu;
