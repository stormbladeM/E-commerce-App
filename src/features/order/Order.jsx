import { useSelector } from "react-redux";
import { formatDateTime } from "../../utils/helper";
function Order() {
  const order = useSelector((state) => state.order.currentOrder);
  // const order = {
  //   number: "1001",
  //   date: "June 28, 2021 — 8:19 PM",
  //   product: {
  //     name: "Wave Wallet - Earth",
  //     sku: "11-003-023",
  //     price: 215.0,
  //     quantity: 1,
  //   },
  //   shippingMethod: "Standard Shipping",
  //   total: 215.0,
  //   billing: {
  //     name: "John Smith",
  //     address: "151 O'Connor Street, Ottawa ON K2P 2L8, Canada",
  //     status: "Paid",
  //   },
  //   shipping: {
  //     name: "John Smith",
  //     address: "151 O'Connor Street, Ottawa ON K2P 2L8, Canada",
  //     status: "Unfulfilled",
  //   },
  console.log(order);
  return (
    <div>
      <div>Free Shipping on all orders</div>
      <h1>Account</h1>
      <p>return to account details</p>
      <div>
        <div>
          <h3>Order #{order.id}</h3>
          <p>placed on june 23 2021</p>
          <div className="w-full">
            <table className="min-w-full table-auto border-collapse border-b-2">
              <thead className="text-sm font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-2 px-3 text-left w-1/3">Product</th>
                  <th className="py-2 px-3 text-left hidden sm:table-cell">
                    SKU
                  </th>
                  <th className="py-2 px-3 text-right">Price (CAD)</th>
                  <th className="py-2 px-3 text-right">Quantity</th>
                  <th className="py-2 px-3 text-right font-extrabold text-blue-700">
                    Total (CAD)
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.cart.map((cart) => (
                  <tr
                    className="border-b border-gray-100 transition duration-150 hover:bg-yellow-50/50"
                    key={cart.id}
                  >
                    <td className="py-3 px-3 text-left font-medium text-gray-900">
                      {cart.name}
                    </td>
                    <td className="py-3 px-3 text-left text-gray-700 text-sm hidden sm:table-cell">
                      23-11-2025
                    </td>
                    <td className="py-3 px-3 text-right text-gray-700 font-mono">
                      ${cart.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right text-gray-700">
                      {cart.quantity}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-blue-700">
                      ${(cart.price * cart.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              <strong>Shipping Method:</strong> Express
            </p>
            <p>
              <strong>Order Total:</strong> ${order.TotalCartPrice}
            </p>
            <p>
              <strong>Order Quantity:</strong> {order.TotalCartQuantity}pcs
            </p>

            <hr />

            <h3>💳 Billing Information</h3>
            <p>
              <strong>Payment Status:</strong> pending
            </p>
            <p>
              <strong>Name:</strong> {order.customer}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>

            <hr />

            <h3>🚚 Shipping Information</h3>
            <p>
              <strong>Fulfillment Status:</strong> pending
            </p>
            <p>
              <strong>Name:</strong> Express
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
