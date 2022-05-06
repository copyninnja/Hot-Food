import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import { useAuth } from "../context/useAuth";

const RestaurantPage = () => {
  const auth = useAuth();
  const [status, setStatus] = useState(null);
  useEffect(() => {
    if (auth.user) {
      if (auth.user.type === "Restaurant") {
        console.log(auth.user.status);
        setStatus(auth.user.status);
      } else if (auth.user.type === "Admin") {
      }
    }
  }, [auth]);
  return (
    <div className="itemsContainer ">
      <div id="restStatus">
        <div>restaurant status: {status}</div>
      </div>
    </div>
  );
};

export default RestaurantPage;
