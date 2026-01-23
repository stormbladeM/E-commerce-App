import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import Applayout from "./ui/Applayout";
import Home from "./ui/Home";
import Order from "./features/order/Order";
import Cart from "./features/cart/Cart";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import CreateOrder, {
  action as createAction,
} from "./features/order/CreateOrder";
import Error from "./ui/Error";
import ProductDetails, {
  loader as productLoader,
} from "./features/menu/ProductDetails";
import { ProductProvider } from "./context/ContextProvider";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/order/:orderId", element: <Order /> },
      { path: "/menu", element: <Menu />, loader: menuLoader },
      { path: "/cart/", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder />, action: createAction },
      {
        path: "/product/:productId",
        element: <ProductDetails />,
        loader: productLoader,
      },
    ],
  },
]);
function App() {
  return (
    // <ProductProvider>
    // </ProductProvider>
    <RouterProvider router={router} />
  );
}

export default App;
