import { useSelector } from "react-redux";
import { getTotalCartQuantity, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helper";

function CartSummary() {
  const TotalCartQuantity = useSelector(getTotalCartQuantity);
  const TotalCartPrice = useSelector(getTotalPrice);

  return (
    <div className="w-full px-3 bg-stone-300 divide-y-1 divide-stone-400">
      <p className="text-xl font-medium">
        <i>TotalCartQuantity</i>: {TotalCartQuantity} pieces
      </p>
      <p className="text-xl font-medium">
        <i>TotalCartPrice</i>: {formatCurrency(TotalCartPrice)}
      </p>
    </div>
  );
}

export default CartSummary;
