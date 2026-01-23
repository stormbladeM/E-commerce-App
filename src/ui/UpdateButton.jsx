import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../features/cart/cartSlice";

function UpdateButton({ cart }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 items-center">
      <button
        className="bg-amber-500 px-3 py-1 text-md font-semibold  rounded-full"
        onClick={() => dispatch(decreaseQuantity(cart.id))}
      >
        -
      </button>
      <p>{cart.quantity}</p>
      <button
        className="bg-amber-500 px-2.5 py-1 text-md font-semibold rounded-full"
        onClick={() => dispatch(increaseQuantity(cart.id))}
      >
        +
      </button>
    </div>
  );
}

export default UpdateButton;
