import { Link } from "react-router-dom";
// import { DEFAULT_PLACEHOLDER_IMAGE } from "../helpers/constants";
import Highlight from "../../helpers/Highlight";
import cardStyles from "./index.scss";
import PropTypes from "prop-types";

const RestaurantCard = ({ item, highlight, discount }) => {
  return (
    <div className={cardStyles.item}>
      <div className={cardStyles.itemHeader}>
        <Link to={`restaurants/${item.id}`}>
          <b>
            <Highlight text={item.name} highlight={highlight} />
          </b>
        </Link>
        {/* {formatPriceRange(item.priceRange)} */}
      </div>
      <Link to={`restaurants/${item.id}`} className={cardStyles.itemImgWrapper}>
        {discount && (
          <span className={cardStyles.itemDiscount}>-{discount}%</span>
        )}
        <img
          src={item.imageSmallUrl || DEFAULT_PLACEHOLDER_IMAGE}
          alt={`${item.name}`}
          height={200}
          className={cardStyles.itemImg}
        />
      </Link>
      <Link to={`restaurants/${item.id}`} className={cardStyles.itemInfo}>
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
