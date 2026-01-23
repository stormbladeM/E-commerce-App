import { ProductProvider } from "./contexts/useProductContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Applayout from "./ui/Applayout";
import ProductItem from "./ui/ProductItem";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
const BASE_URL = "http://localhost:8000/";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Applayout />} />
          <Route path="/:product/:id" element={<ProductItem />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
