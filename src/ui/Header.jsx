import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/useProductContext";
import { FaShoppingCart, FaHeart, FaStore } from "react-icons/fa";

function Header() {
  const { cart, wishlist } = useProductContext();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <FaStore className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ShopMart</h1>
              <p className="text-xs text-gray-500">Your favorite store</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              to="/wishlist"
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <FaHeart className="text-xl text-gray-600 group-hover:text-red-500 transition-colors" />
              <span className="hidden md:inline text-gray-700 font-medium">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <FaShoppingCart className="text-xl" />
              <span className="hidden md:inline font-medium">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
