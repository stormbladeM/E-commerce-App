import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/useProductContext";
import styles from "./QuickLinks.module.css";
import { FaUser, FaQuestionCircle, FaShoppingCart, FaHeart } from "react-icons/fa";

function QuickLinks() {
  const { cart, wishlist } = useProductContext();

  return (
    <div className={styles.QuickLinks}>
      <ul>
        <li>
          <FaUser /> Account
        </li>
        <li>
          <FaQuestionCircle /> Help
        </li>
        <li>
          <Link to="/wishlist" className={styles.link}>
            <FaHeart />
            <span>Wishlist</span>
            {wishlist.length > 0 && (
              <span className={styles.badge}>{wishlist.length}</span>
            )}
          </Link>
        </li>
        <li>
          <Link to="/cart" className={styles.link}>
            <FaShoppingCart />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className={styles.badge}>{cart.length}</span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default QuickLinks;
