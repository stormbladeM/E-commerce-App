import { Link } from "react-router";
import SearchOrder from "../features/order/SearchOrder";
import { useNavigation } from "react-router";

function Header() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="flex items-center justify-between p-4 bg-yellow-300 h-[10%]">
      <Link to={"/menu"}>
        {" "}
        <h1 className="text-lg font-bold text-amber-950">Mini-Mart🛍️</h1>
      </Link>
      <SearchOrder />
      <h3 className="text-md font-medium text-amber-950">
        Your one-stop shop!
      </h3>
      <Link to="/cart">
        <p>Cart</p>
      </Link>
    </div>
  );
}

export default Header;
