import { useNavigate } from "react-router-dom";
import { useProductContext } from "../contexts/useProductContext";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import styles from "./WishlistPage.module.css";

function WishlistPage() {
  const { wishlist, dispatch, cart } = useProductContext();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch({ type: "remove-from-wishlist", payload: { id } });
  };

  const handleAddToCart = (product) => {
    dispatch({
      type: "add-cart",
      payload: {
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        count: 1,
      },
    });
  };

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  if (wishlist.length === 0) {
    return (
      <div className={styles.emptyWishlist}>
        <FaHeart className={styles.bigHeart} />
        <h2>Your wishlist is empty</h2>
        <p>Save your favorite items here!</p>
        <button onClick={() => navigate("/")} className={styles.shopButton}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wishlistPage}>
      <div className={styles.wishlistHeader}>
        <h1>
          <FaHeart className={styles.headerHeart} /> My Wishlist
        </h1>
        <p>
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      <div className={styles.wishlistGrid}>
        {wishlist.map((item) => (
          <div key={item.id} className={styles.wishlistItem}>
            <div className={styles.imageContainer}>
              <img src={item.image} alt={item.title} />
            </div>
            <div className={styles.itemInfo}>
              <h3>{item.title}</h3>
              <p className={styles.category}>{item.category}</p>
              <p className={styles.price}>${item.price.toFixed(2)}</p>
              <div className={styles.rating}>
                <span>⭐ {item.rating?.rate || "N/A"}</span>
                <span className={styles.ratingCount}>
                  ({item.rating?.count || 0} reviews)
                </span>
              </div>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => handleAddToCart(item)}
                className={styles.addToCartBtn}
                disabled={isInCart(item.id)}
              >
                <FaShoppingCart />
                {isInCart(item.id) ? "In Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => handleRemove(item.id)}
                className={styles.removeBtn}
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
