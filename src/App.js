import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AddressItem from "./components/AddressItem/AddressItem";
import AdminPage from "./components/AdminPage/AdminPage";
import Banner from "./components/Banner/Banner";
import FoodDetails from "./components/FoodDetails/FoodDetails";
import Foods from "./components/Foods/Foods";
import Header from "./components/Header/Header";
import NotFound from "./components/NotFound/NotFound";
import OrderComplete from "./components/OrderComplete/OrderComplete";
import SearchResult from "./components/SearchResult/SearchResult";
import SignUp from "./components/SignUp/SignUp";
import RestaurantsContextProvider from "./context/RestaurantsContext";
import { AuthProvider, PrivateRoute, useAuth } from "./context/useAuth";
import ViewportProvider from "./context/ViewportContext";
import RestaurantsPage from "./pages/CustomerMenu";
import RestaurantSignUpPage from "./pages/RestaurantSignUpPage";
import RestaurantFoodPage from "./pages/RestaurantFoodPage";
import Shipment from "./components/Shipment/Shipment";
import OrderPage from "./pages/OrderPage";
import AddressPage from "./pages/AddressPage";
import { createOrder, getRestaurantName } from "./api";
import restaurants from "./fakeData/restaurants";
import { useHistory } from "react-router-dom";
function App() {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [cart, setCart] = useState([]);
  const [restWhom, setRestWhom] = useState();
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
  const restHandler = (restID) => {
    console.log(restWhom);
    restWhom ? setCart([]) : setRestWhom(restID);
  };

  const [deliveryDetails, setDeliveryDetails] = useState({
    phone: null,
    address_line_1: null,
    address_line_2: null,
    postcode: null,
    comment: null,
  });
  const deliveryDetailsHandler = (data) => {
    setDeliveryDetails(data);
  };

  const [addressDetails, setAddressDetails] = useState({
    contactName: null,
    phone: null,
    address_line_1: null,
    address_line_2: null,
    postcode: null,
  });
  const addressDetailsHandler = (data) => {
    setAddressDetails(data);
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

  const clearCart = (email, tax, deliveryFee, grandTotal) => {
    setCart([]);
    getRestaurantName(restWhom).then((name) => {
      createOrder(
        cart,
        email,
        tax,
        deliveryFee,
        grandTotal,
        deliveryDetails,
        name,
      );
    });
  };

  return (
    <RestaurantsContextProvider>
      <ViewportProvider>
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/Admin">
                <AdminPage />
              </Route>
              <PrivateRoute exact path="/orders">
                <Header cart={cart} />
                <OrderPage />
              </PrivateRoute>
              <PrivateRoute path="/RestaurantSignUp" restricted="Restaurant">
                <Header cart={cart} />
                <RestaurantSignUpPage></RestaurantSignUpPage>
              </PrivateRoute>

              <PrivateRoute path="/Restaurant" restricted="Restaurant">
                <Header cart={cart} />
                <RestaurantFoodPage></RestaurantFoodPage>
              </PrivateRoute>

              <PrivateRoute path="/Admin" restricted="Admin">
                <AdminPage />
              </PrivateRoute>

              <Route exact path="/">
                <Header cart={cart} />
                <RestaurantsPage />
              </Route>

              <Route exact path="/restaurants/:restaurantId">
                <Header cart={cart} />
                <Banner />
                <Foods cart={cart} from="customer" />
              </Route>

              <Route path="/restaurants/:restaurantId/food/:id">
                <Header cart={cart} />
                <FoodDetails
                  cart={cart}
                  cartHandler={cartHandler}
                  restHandler={restHandler}
                />
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

              <PrivateRoute path="/addAddress" restricted="Customer">
                <Header cart={cart} />
                <AddressItem
                  cart={cart}
                  addressDetails={addressDetails}
                  addressDetailsHandler={addressDetailsHandler}
                  checkOutItemHandler={checkOutItemHandler}
                  clearCart={clearCart}
                />
              </PrivateRoute>

              <PrivateRoute path="/addressManagement" restricted="Customer">
                <Header cart={cart} />
                <AddressPage></AddressPage>
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
      </ViewportProvider>
    </RestaurantsContextProvider>
  );
}

export default App;
