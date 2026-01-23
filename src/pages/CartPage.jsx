import { useProductContext } from "../contexts/useProductContext";
import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";

function CartPage() {
  const { cart, dispatch } = useProductContext();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const handleIncrease = (id) => {
    dispatch({ type: "increaseCount", payload: { id } });
  };

  const handleDecrease = (id) => {
    dispatch({ type: "decreaseCount", payload: { id } });
  };

  const handleRemove = (id) => {
    dispatch({ type: "remove-from-cart", payload: { id } });
  };

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <button onClick={() => navigate("/")} className={styles.shopButton}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartHeader}>
        <h1>Shopping Cart</h1>
        <p>{cart.length} {cart.length === 1 ? "item" : "items"}</p>
      </div>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <h3>{item.title}</h3>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>
              <div className={styles.itemActions}>
                <div className={styles.quantityControls}>
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className={styles.quantityBtn}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.count}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>
                <p className={styles.itemTotal}>
                  ${(item.price * item.count).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax (5%):</span>
            <span>${(totalPrice * 0.05).toFixed(2)}</span>
          </div>
          <hr />
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total:</span>
            <span>${(totalPrice * 1.05).toFixed(2)}</span>
          </div>
          <button 
            onClick={() => navigate("/checkout")}
            className={styles.checkoutBtn}
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => navigate("/")}
            className={styles.continueBtn}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
