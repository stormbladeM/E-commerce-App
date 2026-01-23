import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { FaCheckCircle, FaPrint, FaDownload, FaHome } from "react-icons/fa";
import { useProductContext } from "../contexts/useProductContext";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useProductContext();
  const receiptRef = useRef();
  const order = location.state?.order;

  if (!order) {
    navigate("/");
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const receiptContent = receiptRef.current.innerHTML;
    const blob = new Blob([`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - Order #${order.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
          .section { margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          .total { font-size: 1.2em; font-weight: bold; }
        </style>
      </head>
      <body>
        ${receiptContent}
      </body>
      </html>
    `], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${order.id}.html`;
    a.click();
  };

  const handleContinueShopping = () => {
    // Clear cart after successful order
    dispatch({ type: "clear-cart" });
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Success Message */}
      <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 mb-8 text-center">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
        <p className="text-sm text-gray-500 mt-2">Order ID: #{order.id}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          <FaPrint /> Print Receipt
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition"
        >
          <FaDownload /> Download Receipt
        </button>
        <button
          onClick={handleContinueShopping}
          className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          <FaHome /> Continue Shopping
        </button>
      </div>

      {/* Receipt */}
      <div ref={receiptRef} className="bg-white rounded-xl shadow-lg p-8 print:shadow-none">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-800">ShopMart</h2>
          <p className="text-gray-600">Your favorite online store</p>
          <p className="text-sm text-gray-500 mt-2">Receipt / Invoice</p>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold text-gray-700 mb-2">Order Information</h3>
            <p className="text-sm text-gray-600">Order ID: #{order.id}</p>
            <p className="text-sm text-gray-600">Date: {order.date}</p>
            <p className="text-sm text-gray-600">Payment: {order.customer.paymentMethod.toUpperCase()}</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-2">Customer Information</h3>
            <p className="text-sm text-gray-600">Name: {order.customer.name}</p>
            <p className="text-sm text-gray-600">Phone: {order.customer.phone}</p>
            {order.customer.email && (
              <p className="text-sm text-gray-600">Email: {order.customer.email}</p>
            )}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-700 mb-2">Delivery Address</h3>
          <p className="text-sm text-gray-600">{order.customer.address}</p>
          <p className="text-sm text-gray-600">{order.customer.city}</p>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-700 mb-4">Order Items</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3">Item</th>
                <th className="text-center p-3">Qty</th>
                <th className="text-right p-3">Price</th>
                <th className="text-right p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-contain"
                      />
                      <span className="text-sm">{item.title}</span>
                    </div>
                  </td>
                  <td className="text-center p-3">{item.count}</td>
                  <td className="text-right p-3">${item.price.toFixed(2)}</td>
                  <td className="text-right p-3 font-semibold">
                    ${(item.price * item.count).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="border-t-2 border-gray-800 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tax (5%):</span>
            <span className="font-semibold">${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-semibold">
              {order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-800 pt-4 border-t">
            <span>TOTAL:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t">
          <p className="text-sm text-gray-600">Thank you for shopping with us!</p>
          <p className="text-xs text-gray-500 mt-2">For any queries, contact us at support@shopmart.com</p>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
