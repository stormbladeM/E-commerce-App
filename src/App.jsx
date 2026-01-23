import { ProductProvider } from "./contexts/useProductContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./ui/Applayout";
import ProductItem from "./ui/ProductItem";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";

const BASE_URL = "http://localhost:8000/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        index: true,
        element: <div>Home Content Here</div>, // You can replace this with your home component
      },
      {
        path: ":product/:id",
        element: <ProductItem />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  );
}

export default App;
