import { Link, useNavigate } from "react-router";
// import { useProduct } from "../../context/ContextProvider";
import { useSelector } from "react-redux";
import { getCart } from "./cartSlice";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function Cart() {
  const cart = useSelector(getCart);
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-4 mt-10 mx-auto ">
        <h2 className="text-2xl font-semibold">Your Cart({cart?.length})</h2>
        <Link to="/menu">
          <p className="underline capitalize">continue shopping</p>
        </Link>
      </div>
      {cart?.map((cart) => (
        <div
          className="mt-5  mx-auto rounded-2xl bg-amber-50 h-40 border-b-2 border-amber-200"
          key={cart.id}
        >
          <CartItem cart={cart} />
        </div>
      ))}
      {cart.length > 0 && <CartSummary />}
      <button
        onClick={() => navigate("/order/new")}
        className="border px-4 rounded-2xl float-right mt-5 mr-2 bg-amber-500 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 hover:bg-amber-300 transition-all duration-300 text-md font-semibold text-white py-2"
      >
        Create order
      </button>
    </div>
  );
}

export default Cart;
