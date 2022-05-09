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
import { AuthProvider, PrivateRoute } from "./context/useAuth";
import ViewportProvider from "./context/ViewportContext";
import RestaurantsPage from "./pages/CustomerMenu";
import RestaurantSignUpPage from "./pages/RestaurantSignUpPage";
import RestaurantFoodPage from "./pages/RestaurantFoodPage";
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
      <ViewportProvider>
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/Admin">
                <AdminPage />
              </Route>

              <PrivateRoute path="/RestaurantSignUp" restricted="Restaurant">
                <Header cart={cart} />
                <RestaurantSignUpPage></RestaurantSignUpPage>
              </PrivateRoute>

              <PrivateRoute path="/Restaurant" restricted="Restaurant">
                <Header cart={cart} />
                <RestaurantFoodPage></RestaurantFoodPage>
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
                <Foods cart={cart} from="customer" />
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

              <PrivateRoute path="/addAddress" restricted="Customer">
                <Header cart={cart} />
                <AddressItem
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
      </ViewportProvider>
    </RestaurantsContextProvider>
  );
}

export default App;
