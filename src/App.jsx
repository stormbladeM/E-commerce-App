import { ProductProvider } from "./contexts/useProductContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./ui/Applayout";

import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
<<<<<<< HEAD
import ProductDetails from "./features/menu/ProductDetails";
=======

>>>>>>> a81894eb26f61ae63358ad6268d308eafd15b31c
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
<<<<<<< HEAD
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Applayout />} />
          <Route path="/:product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </BrowserRouter>
=======
      <RouterProvider router={router} />
>>>>>>> a81894eb26f61ae63358ad6268d308eafd15b31c
    </ProductProvider>
  );
}

export default App;
