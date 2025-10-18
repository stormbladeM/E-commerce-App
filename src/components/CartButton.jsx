import { useProductContext } from "../contexts/useProductContext";
import Button from "./Button";

function CartButton({ product, productCount }) {
  const { dispatch } = useProductContext();
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <Button
        width={20}
        color="orange"
        padding={10}
        onClick={() =>
          dispatch({
            type: "decreaseCount",
            payload: { id: product.id },
          })
        }
      >
        -
      </Button>
      <p>{productCount}</p>
      <Button
        width={20}
        color="orange"
        padding={10}
        onClick={() =>
          dispatch({
            type: "increaseCount",
            payload: { id: product.id },
          })
        }
      >
        +
      </Button>
    </div>
  );
}

export default CartButton;
