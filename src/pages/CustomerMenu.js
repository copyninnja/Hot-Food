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
        auth.user.status == "Not verified"
          ? history.push("/RestaurantSignUp")
          : history.push("/Restaurant");
      } else if (auth.user.type === "Admin") {
        history.push("/Admin");
      }
    }
  }, [auth]);

  return <RestaurantMenu allRestaurants={allRestaurants}></RestaurantMenu>;
};

export default CustomerMenu;
