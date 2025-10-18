import { useParams } from "react-router";
import Button from "./Button";
import styles from "./ProductInfo.module.css";
import { useProductContext } from "../contexts/useProductContext";
import { Fragment } from "react";
import CartButton from "./CartButton";
function ProductInformation() {
  const { products, dispatch, cart } = useProductContext();
  const { id: currentId } = useParams();

  function handleClick(product) {
    const { id, image, title, price } = product;
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      dispatch({
        type: "increaseCount",
        payload: { id },
      });
    } else {
      dispatch({
        type: "add-cart",
        payload: { id, image, title, price, count: 1 },
      });
    }
  }

  const cartItem = cart.find((item) => item.id === Number(currentId));
  const productCount = cartItem ? cartItem.count : 0;
  return (
    <div className={styles.container}>
      {products?.map((product) =>
        product.id === Number(currentId) ? (
          <Fragment key={product.id}>
            <div className={styles.imageContainer}>
              <div>
                <img src={`${product.image}`} alt="image here" />
              </div>
              <h3>share this product</h3>
            </div>
            <div className={styles.textContainer}>
              <div>
                <span className={styles.btn}>
                  <Button onClick={handleClick}>Official store</Button>
                  <Button onClick={handleClick}>Wishlist</Button>
                </span>
                <h4>{product.title}</h4>
                <p>Brand</p>
              </div>
              <hr />
              <div>
                <p>${product.price}</p>
                <p>.rating</p>
                {productCount === 0 ? (
                  <Button
                    width={100}
                    padding={10}
                    onClick={() => handleClick(product)}
                  >
                    Add to cart
                  </Button>
                ) : (
                  <CartButton product={product} productCount={productCount} />
                )}
              </div>
              <hr />
              <div>
                <h4>Promotions</h4>
                <p>oder number</p>
                <p>enjoy</p>
              </div>
            </div>
          </Fragment>
        ) : (
          ""
        )
      )}
    </div>
  );
}

export default ProductInformation;
