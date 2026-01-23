import { useState } from "react";
import { useProductContext } from "../contexts/useProductContext";
import styles from "./Sidebar.module.css";
import { FaFilter } from "react-icons/fa";

function Siderbar() {
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
    dispatch({
      type: "set-filter",
      payload: {
        priceRange: { min: Number(priceMin), max: Number(priceMax) },
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
    setPriceMin(0);
    setPriceMax(1000);
    dispatch({ type: "reset-filters" });
  };

  return (
    <div className={styles.Sidebar}>
      <div className={styles.filterHeader}>
        <FaFilter />
        <h3>Filters</h3>
      </div>

      {/* Sort By */}
      <div className={styles.filterSection}>
        <h4>Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className={styles.sortSelect}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {/* Categories */}
      <div className={styles.filterSection}>
        <h4>Categories</h4>
        <ul className={styles.categoryList}>
          {categories.map((category) => (
            <li
              key={category}
              className={
                filters.category === category ? styles.activeCategory : ""
              }
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className={styles.filterSection}>
        <h4>Price Range</h4>
        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className={styles.priceInput}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className={styles.priceInput}
          />
        </div>
        <button onClick={handlePriceFilter} className={styles.applyBtn}>
          Apply
        </button>
      </div>

      {/* Reset Filters */}
      <button onClick={handleResetFilters} className={styles.resetBtn}>
        Reset All Filters
      </button>
    </div>
  );
}

export default Siderbar;
