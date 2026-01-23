import { useProductContext } from "../contexts/useProductContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

function Home() {
  const { products, allProducts, dispatch, wishlist, cart } = useProductContext();
  const navigate = useNavigate();

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    dispatch({ type: "toggle-wishlist", payload: { product } });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch({
      type: "add-cart",
      payload: {
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        count: 1,
      },
    });
  };

  if (allProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome to Our Store! 🛍️</h1>
        <p className="text-lg opacity-90">
          Discover amazing products at unbeatable prices. Shop now and enjoy free shipping!
        </p>
        <div className="mt-4 flex gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-sm opacity-90">Products</p>
            <p className="text-2xl font-bold">{allProducts.length}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-sm opacity-90">In Cart</p>
            <p className="text-2xl font-bold">{cart.length}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-sm opacity-90">Wishlist</p>
            <p className="text-2xl font-bold">{wishlist.length}</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {products.length} Products Available
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative h-56 bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
              {/* Wishlist Button */}
              <button
                onClick={(e) => handleWishlistToggle(e, product)}
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform z-10"
              >
                {isInWishlist(product.id) ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-400 text-xl hover:text-red-500" />
                )}
              </button>
              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {product.category}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
                {product.title}
              </h3>
              <div className="flex items-center mb-3">
                <span className="text-yellow-500 mr-1">⭐</span>
                <span className="text-sm text-gray-600">
                  {product.rating?.rate || "N/A"} ({product.rating?.count || 0})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-orange-600">
                  ${product.price}
                </span>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <FaShoppingCart className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && allProducts.length > 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg mb-4">No products match your filters</p>
          <button
            onClick={() => dispatch({ type: "reset-filters" })}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
