import RestaurantCard from "../RestaurantCard";
import itemsStyles from "./index.scss";
import { NUMBER_OF_FEATURED_ITEMS } from "../../helpers/constants";
import PropTypes from "prop-types";

const RestaurantMenu = ({ allRestaurants, searchTerm }) => {
  const showFeaturedRestaurants = (featuredItem) =>
    allRestaurants.map((item, index) => {
      return (
        item.id === featuredItem.restaurantId &&
        index < NUMBER_OF_FEATURED_ITEMS && (
          <RestaurantCard
            key={item.id}
            item={item}
            highlight={searchTerm}
            discount={featuredItem.discount}
          />
        )
      );
    });
  eturn(
    <>
      <div className={itemsStyles.itemsContainer}>
        <h2>Featured</h2>
        <div className={itemsStyles.itemsInner}>
          {!isLoading &&
            featuredRestaurants &&
            allRestaurants &&
            featuredRestaurants.map((featuredItem) =>
              showFeaturedRestaurants(featuredItem),
            )}
        </div>
      </div>
      <div className={itemsStyles.itemsContainer}>
        <h2>All Restaurants</h2>
        <div className={itemsStyles.itemsInner}>
          {!isLoading &&
            allRestaurants &&
            allRestaurants.map((item) => (
              <RestaurantCard
                key={item.id}
                item={item}
                highlight={searchTerm}
              />
            ))}
        </div>
      </div>
    </>,
  );
};

HomePageItems.propTypes = {
  isLoading: PropTypes.bool,
  featuredRestaurants: PropTypes.array,
  allRestaurants: PropTypes.array,
  searchTerm: PropTypes.string,
};

export default RestaurantMenu;
