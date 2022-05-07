import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { PrivateRoute } from "./context/useAuth";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Foods from "./components/Foods/Foods";
import FoodDetails from "./components/FoodDetails/FoodDetails";
import NotFound from "./components/NotFound/NotFound";
import SignUp from "./components/SignUp/SignUp";
import Shipment from "./components/Shipment/Shipment";
import OrderComplete from "./components/OrderComplete/OrderComplete";
import SearchResult from "./components/SearchResult/SearchResult";
import { RestaurantsContext } from "./context/RestaurantsContext";
import RestaurantsPage from "./pages/CustomerMenu";
import RestaurantPage from "./pages/RestaurantSignUpPage";
import { FILTER_ITEMS } from "./helpers/constants";
import { isFiltersActive } from "./helpers/utils";
import RestaurantsContextProvider from "./context/RestaurantsContext";
import { AuthProvider } from "./context/useAuth";
function App() {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [cart, setCart] = useState([]);

  const cartHandler = (currentFood) => {
    const alreadyAdded = cart.find((item) => item.id === currentFood.id);

    if (alreadyAdded) {
      const reamingCarts = cart.filter((item) => cart.id !== currentFood);
      setCart(reamingCarts);
    } else {
      const newCart = [...cart, currentFood];
      setCart(newCart);
    }
  };

  const [deliveryDetails, setDeliveryDetails] = useState({
    toDoor: "Delivery To Door",
    read: null,
    businessName: null,
    address: null,
  });

  const deliveryDetailsHandler = (data) => {
    setDeliveryDetails(data);
  };

  const checkOutItemHandler = (foodID, foodQuantity) => {
    const newCart = cart.map((item) => {
      if (item.id === foodID) {
        item.quantity = foodQuantity;
      }
      return item;
    });

    const filteredCart = newCart.filter((item) => item.quantity > 0);
    setCart(filteredCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <RestaurantsContextProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute path="/Restaurant" restricted="Restaurant">
              <Header cart={cart} />
              <RestaurantPage></RestaurantPage>
            </PrivateRoute>

            <PrivateRoute path="/Admin" restricted="Admin">
              NOW developing{" "}
            </PrivateRoute>

            <Route exact path="/">
              <Header cart={cart} />
              <RestaurantsPage />
            </Route>

            <Route exact path="/restaurants/:restaurantId">
              <Header cart={cart} />
              <Banner />
              <Foods cart={cart} />
            </Route>

            <Route path="/restaurants/:restaurantId/food/:id">
              <Header cart={cart} />
              <FoodDetails cart={cart} cartHandler={cartHandler} />
            </Route>

            <Route path="/search=:searchQuery">
              <Header cart={cart} />
              <Banner />
              <SearchResult />
            </Route>

            <PrivateRoute path="/checkout" restricted="Customer">
              <Header cart={cart} />
              <Shipment
                cart={cart}
                deliveryDetails={deliveryDetails}
                deliveryDetailsHandler={deliveryDetailsHandler}
                checkOutItemHandler={checkOutItemHandler}
                clearCart={clearCart}
              />
            </PrivateRoute>

            <PrivateRoute path="/order-complete" restricted="Customer">
              <Header cart={cart} />
              <OrderComplete deliveryDetails={deliveryDetails} />
            </PrivateRoute>

            <Route path="/signup">
              <SignUp />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </RestaurantsContextProvider>
  );
}

export default App;
