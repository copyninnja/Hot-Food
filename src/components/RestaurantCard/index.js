import { Link } from "react-router-dom";
import { DEFAULT_PLACEHOLDER_IMAGE } from "../../helpers/constants";
import Highlight from "../../helpers/Highlight";
import PropTypes from "prop-types";
import React, { Component } from "react";
import "./index.css";
const RestaurantCard = ({ item, highlight, discount }) => {
  return (
    <div className="item">
      <div className="itemHeader">
        <Link to={`restaurants/${item.id}/`}>
          <b>
            <Highlight text={item.name} highlight={highlight} />
          </b>
        </Link>
        {/* {formatPriceRange(item.priceRange)} */}
      </div>
      <Link to={`restaurants/${item.id}/`} className="itemImgWrapper">
        <img
          src={item.imageSmallUrl || DEFAULT_PLACEHOLDER_IMAGE}
          alt={`${item.name}`}
          height={200}
          className="itemImg"
        />
      </Link>
      <Link to={`restaurants/${item.id}/`} className="itemInfo">
        <p>
          <Highlight text={item.description} highlight={highlight} />
        </p>
      </Link>
    </div>
  );
};

RestaurantCard.propTypes = {
  item: PropTypes.object,
  highlight: PropTypes.string,
  discount: PropTypes.number,
};

export default RestaurantCard;
