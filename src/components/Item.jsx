import { Link, NavLink } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useProductContext } from "../contexts/useProductContext";
import styles from "./Item.module.css";

function Items({ item }) {
  const { wishlist, dispatch } = useProductContext();
  const isInWishlist = wishlist.some((w) => w.id === item.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "toggle-wishlist", payload: { product: item } });
  };

  return (
    <NavLink to={`/:product/${item.id}`}>
      <div className={styles.item}>
        <button
          className={styles.wishlistBtn}
          onClick={handleWishlistToggle}
          aria-label="Add to wishlist"
        >
          {isInWishlist ? (
            <FaHeart className={styles.heartFilled} />
          ) : (
            <FaRegHeart className={styles.heartOutline} />
          )}
        </button>
        <div className={styles.imgContainer}>
          <img src={`${item.image}`} alt="" />
        </div>
        <div>
          <p>{item.title.split(" ").slice(0, 2).join(" ")}</p>
          <hr />
          <p>${item.price}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default Items;
