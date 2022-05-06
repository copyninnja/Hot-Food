import RestaurantMenu from "../components/RestaurantMenu";
import React, { useState, useContext, useEffect } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { FILTER_ITEMS } from "../helpers/constants";
import { isFiltersActive } from "../helpers/utils";
import "./index.css";
import { useAuth } from "../context/useAuth";
import { useHistory } from "react-router-dom/";

const CustomerMenu = () => {
  const { restaurants, getRestaurants } = useContext(RestaurantsContext);
  const [activeFilterList, setActiveFilters] = useState(FILTER_ITEMS);
  const { allRestaurants } = restaurants;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const auth = useAuth();
  const history = useHistory();
  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    if (auth.user) {
      if (auth.user.type === "Restaurant") {
        history.push("/Restaurant");
      } else if (auth.user.type === "Admin") {
        history.push("/Admin");
      }
    }
  }, [auth]);

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
