import { useState } from "react";
import { useProductContext } from "../contexts/useProductContext";
import { FaFilter } from "react-icons/fa";

function Sidebar() {
  const { filters, dispatch, allProducts } = useProductContext();
  const [priceMin, setPriceMin] = useState(filters.priceRange.min);
  const [priceMax, setPriceMax] = useState(filters.priceRange.max);

  // Get unique categories from products
  const categories = [
    "all",
    ...new Set(allProducts?.map((product) => product.category) || []),
  ];

  const handleCategoryChange = (category) => {
    dispatch({
      type: "set-filter",
      payload: { category },
    });
  };

  const handlePriceFilter = () => {
    const minPrice = Math.max(20, Number(priceMin)); // Ensure minimum is at least 20
    const maxPrice = Number(priceMax);
    
    if (minPrice > maxPrice) {
      alert("Minimum price cannot be greater than maximum price");
      return;
    }
    
    dispatch({
      type: "set-filter",
      payload: {
        priceRange: { min: minPrice, max: maxPrice },
      },
    });
  };

  const handleSortChange = (e) => {
    dispatch({
      type: "set-filter",
      payload: { sortBy: e.target.value },
    });
  };

  const handleResetFilters = () => {
    setPriceMin(20);
    setPriceMax(1000);
    dispatch({ type: "reset-filters" });
  };

  return (
    <div className="bg-white rounded-xl shadow-md sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-gray-100">
          <FaFilter className="text-orange-500" />
          <h3 className="text-xl font-bold text-gray-800">Filters</h3>
        </div>

        {/* Sort By */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Sort By</h4>
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition text-sm"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left p-3 rounded-lg transition-all text-sm ${
                  filters.category === category
                    ? "bg-orange-500 text-white font-semibold shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              min="20"
              className="w-20 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
            />
            <span className="text-gray-500 font-bold text-sm">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              min="20"
              className="w-20 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          <button
            onClick={handlePriceFilter}
            className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm"
          >
            Apply
          </button>
        </div>

        {/* Reset Filters */}
        <button
          onClick={handleResetFilters}
          className="w-full border-2 border-red-500 text-red-500 p-3 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-colors text-sm"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
