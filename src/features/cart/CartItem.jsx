import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import UpdateButton from "../../ui/UpdateButton";
import { deleteItem } from "./cartSlice";

function CartItem({ cart }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-full px-5 flex items-start justify-between">
        <div className="flex gap-2 pt-1">
          <div className="bg-stone-100 w-40 border border-amber-200 h-30 flex items-center justify-center ">
            <img src={cart.image} alt="" className="object-cover h-full " />
          </div>
          <p className="w-[60%] text-start text-md font-medium">{cart.name}</p>
        </div>
        <span>
          <p className="text-md font-medium ">
            price: ${cart.price.toFixed(1)}
          </p>
          <p className="text-md font-medium ">
            Totalprice:{cart.totalPrice.toFixed(1)}
          </p>
          <p className="text-right text-red-500">-59%</p>
        </span>
      </div>
      <div className="flex justify-between items-center px-4">
        <Button onClick={() => dispatch(deleteItem(cart.id))}>🗑️ Remove</Button>
        <UpdateButton cart={cart} />
      </div>
    </>
  );
}

export default CartItem;
