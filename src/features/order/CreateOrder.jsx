import { Form, redirect, useActionData } from "react-router";
import { createOrder } from "../../services/apiMart";
import { formatDateTime } from "../../utils/helper";
// import { useProduct } from "../../context/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getCart,
  getTotalCartQuantity,
  getTotalPrice,
} from "../cart/cartSlice";
import store from "../../store";
import { addOrder } from "./orderSlice";

function CreateOrder() {
  const cart = useSelector(getCart);
  const TotalCartQuantity = useSelector(getTotalCartQuantity);
  const TotalCartPrice = useSelector(getTotalPrice);

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const formErrors = useActionData();
  return (
    <div>
      <Form method="POST">
        <div className="w-full box-sizing  ">
          <h2 className="text-center py-5 text-lg underline font-medium">
            {" "}
            Enter Your Details
          </h2>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="Name" className="sm:basis-40 px-1">
              Name:
            </label>
            <div className="grow">
              <input
                type="text"
                name="name"
                className="focus:ring-opacity-50 w-full rounded-full border border-yellow-400 bg-stone-200 px-4 py-2 placeholder:text-stone-400 focus:ring focus:ring-yellow-400 focus:outline-none md:px-6 md:py-3"
              />
            </div>
          </div>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="Address" className="sm:basis-40 px-1">
              Billing-Address:
            </label>
            <div className="grow">
              <input
                type="text"
                name="Address"
                required
                className="focus:ring-opacity-50 w-full rounded-full border border-yellow-400 bg-stone-200 px-4 py-2 placeholder:text-stone-400 focus:ring focus:ring-yellow-400 focus:outline-none md:px-6 md:py-3"
              />
            </div>
          </div>
          <div className="grow">
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <input
              type="hidden"
              name="total"
              value={JSON.stringify({
                price: TotalCartPrice,
                quantity: TotalCartQuantity,
              })}
            />
          </div>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="PhoneNumber" className="sm:basis-40 px-1">
              PhoneNumber:
            </label>
            <div className="grow">
              <input
                type="text"
                name="phone"
                className="focus:ring-opacity-50 w-full rounded-full border border-yellow-400 bg-stone-200 px-4 py-2 placeholder:text-stone-400 focus:ring focus:ring-yellow-400 focus:outline-none md:px-6 md:py-3"
              />
            </div>
          </div>
          <span className="px-1 flex justify-center md:justify-start">
            <button className="bg-amber-400 px-2.5 py-2 rounded-2xl font-medium text-lg w-[50%] md:w-30">
              PlaceOrder
            </button>
          </span>
        </div>
      </Form>
    </div>
  );
}
const date = formatDateTime();
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const cart = JSON.parse(data.cart);
  const { price: TotalCartPrice, quantity: TotalCartQuantity } = JSON.parse(
    data.total
  );
  const order = {
    customer: data.name,
    phone: data.phone,
    address: data.Address,
    cart,
    TotalCartPrice,
    TotalCartQuantity,
    orderedAt: new Date().toISOString(),
  };
  const newOrder = await createOrder(order);
  store.dispatch(addOrder(newOrder));
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
