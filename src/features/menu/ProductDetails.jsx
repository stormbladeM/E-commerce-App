import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "../../contexts/useProductContext";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaArrowLeft, FaStar } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch, wishlist, allProducts } = useProductContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get product from context first
    const contextProduct = allProducts.find(p => p.id === parseInt(id));
    
    if (contextProduct) {
      setProduct(contextProduct);
      setLoading(false);
    } else {
      // Fetch from API if not in context
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, allProducts]);

  const isInWishlist = product ? wishlist.some((item) => item.id === product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
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
    // Show success feedback
    alert(`${product.title} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    dispatch({ type: "toggle-wishlist", payload: { product } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Product not found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 max-w-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full mb-4 w-fit">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < Math.round(product.rating.rate)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-orange-600">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <FaShoppingCart /> Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  isInWishlist
                    ? "bg-red-50 text-red-500 border-2 border-red-500 hover:bg-red-100"
                    : "bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {isInWishlist ? (
                  <>
                    <FaHeart /> Remove from Wishlist
                  </>
                ) : (
                  <>
                    <FaRegHeart /> Add to Wishlist
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl mb-2">🚚</div>
          <h3 className="font-semibold text-gray-800 mb-1">Free Shipping</h3>
          <p className="text-sm text-gray-600">On orders over $50</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl mb-2">↩️</div>
          <h3 className="font-semibold text-gray-800 mb-1">Easy Returns</h3>
          <p className="text-sm text-gray-600">30-day return policy</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-semibold text-gray-800 mb-1">Secure Payment</h3>
          <p className="text-sm text-gray-600">100% secure transactions</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
