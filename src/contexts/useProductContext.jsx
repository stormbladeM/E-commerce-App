import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
const BASE_URL = "https://fakestoreapi.com/products";
const ProductContext = createContext();

// Load wishlist from localStorage
const loadWishlist = () => {
  try {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Load orders from localStorage
const loadOrders = () => {
  try {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  cart: [],
  count: 1,
  products: [],
  step: 0,
  wishlist: loadWishlist(),
  orders: loadOrders(),
  filters: {
    category: "all",
    priceRange: { min: 20, max: 1000 },
    sortBy: "default",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "setStep":
      return { ...state, step: action.payload };
    case "get-Product":
      return {
        ...state,
        products: action.payload,
      };
    case "add-cart": {
      const { id, image, title, price, count } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, count: item.count + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { id, image, title, price, count }],
        };
      }
    }

    case "increaseCount":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        ),
      };
    case "decreaseCount":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, count: item.count - 1 }
              : item
          )
          .filter((item) => item.count > 0),
      };

    case "remove-from-cart":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case "clear-cart":
      return {
        ...state,
        cart: [],
      };

    case "create-order": {
      const newOrders = [...state.orders, action.payload];
      localStorage.setItem("orders", JSON.stringify(newOrders));
      return {
        ...state,
        orders: newOrders,
      };
    }

    case "toggle-wishlist": {
      const { product } = action.payload;
      const isInWishlist = state.wishlist.some((item) => item.id === product.id);
      const newWishlist = isInWishlist
        ? state.wishlist.filter((item) => item.id !== product.id)
        : [...state.wishlist, product];
      
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      
      return {
        ...state,
        wishlist: newWishlist,
      };
    }

    case "remove-from-wishlist": {
      const newWishlist = state.wishlist.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      return {
        ...state,
        wishlist: newWishlist,
      };
    }

    case "set-filter":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case "reset-filters":
      return {
        ...state,
        filters: initialState.filters,
      };

    default:
      return state;
  }
}

function ProductProvider({ children }) {
  const [{ cart, count, clicked, products, step, filters, wishlist, orders }, dispatch] =
    useReducer(reducer, initialState);

  const [query, setQuery] = useState("");

  useEffect(function () {
    async function fetchProducts() {
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      dispatch({ type: "get-Product", payload: data });
    }
    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }
      // Price filter
      if (
        product.price < filters.priceRange.min ||
        product.price > filters.priceRange.max
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sorting
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        allProducts: products,
        dispatch,
        cart,
        clicked,
        count,
        step,
        filters,
        wishlist,
        orders,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}
export { useProductContext, ProductProvider };
