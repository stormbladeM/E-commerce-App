import { fetchProducts } from "../../services/apiMart";
import Advert from "../../ui/Advert";
import Header from "../../ui/Header";
import CategoryList from "../Categories/CategoryList";
import MenuItem from "./MenuItem";
import { useLoaderData } from "react-router";

function Menu() {
  const MenuProducts = useLoaderData();

  return (
    <div className="grid grid-cols-3 h-dvh border-0  p-2 gap-2 grid-rows-6">
      <CategoryList />
      <Advert menuproducts={MenuProducts} />
      <MenuItem menuproducts={MenuProducts} />
    </div>
  );
}
export async function loader() {
  const products = await fetchProducts();
  return products;
}
export default Menu;
