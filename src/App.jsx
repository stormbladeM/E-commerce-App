import "./App.css";
import AppLayout from "./AppLayout";
import { ProductProvider } from "./contexts/useProductContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductItem from "./pages/ProductItem";
const BASE_URL = "http://localhost:8000/";
function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="/:product/:id" element={<ProductItem />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
